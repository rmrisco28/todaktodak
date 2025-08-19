import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export function MemberModify() {
  const [member, setMember] = useState(null);
  const [params] = useSearchParams();

  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  // 새 비밀번호 입력값 상태
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  // 생년월일 관련 상태(드랍다운 분리)
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const [errors, setErrors] = useState({});

  //비밀번호
  const validatePassword = (value) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~]).{8,}$/.test(value);
  // 연락처
  const validatePhone = (value) => /^01[016789]-?\d{3,4}-?\d{4}$/.test(value);

  useEffect(() => {
    axios
      .get(`/api/member?seq=${params.get("seq")}`)
      .then((res) => {
        console.log("success");
        setMember(res.data);

        // 서버에서 받은 birthDate 분리
        if (res.data.birthDate) {
          const [y, m, d] = res.data.birthDate.split("-");
          setBirthYear(y);
          setBirthMonth(m);
          setBirthDay(d);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("always");
      });
  }, [params]);

  if (!member) {
    return <Spinner />;
  }

  // 수정 버튼 클릭
  function handleModifyButtonClick() {
    const newErrors = {};

    // 비밀번호 유효성 검사
    if (newPassword.trim() && !validatePassword(newPassword)) {
      newErrors.newPassword =
        "비밀번호는 8자 이상, 숫자/특수문자를 포함해야합니다.";
    }
    // 비밀번호 일치 확인 검사
    if (newPassword !== newPassword2) {
      newErrors.newPassword2 = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // 기존 회원 정보 복사
    const modifiedMember = { ...member };

    // 비밀번호가 입력된 경우에만 수정
    if (newPassword.trim() !== "") {
      modifiedMember.password = newPassword;
    }

    // 생년월일이 모두 입력된 경우에만 수정
    if (birthYear && birthMonth && birthDay) {
      modifiedMember.birthDate = `${birthYear}-${birthMonth}-${birthDay}`;
    }

    axios
      .put(`/api/member/${params.get("seq")}/modify`, modifiedMember)
      .then((res) => {
        console.log("success");
        setMember(res.data);
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type, position: "top-center" });
        }
        const page = params.get("page") || 1; // 추가
        navigate(`/member?seq=${params.get("seq")}&page=${page}`); // 상세 페이지 이동
      })
      .catch((err) => {
        console.log(err);
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .finally(() => {
        console.log("always");
      });
  }

  // 월별 일수 계산 함수
  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate(); // month는 1부터 시작
  }

  // 다음 주소 검색 API 연동
  const handleSearchButtonClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 주소 조합 처리
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
          if (data.bname !== "") extraAddress += data.bname;
          if (data.buildingName !== "")
            extraAddress +=
              (extraAddress !== "" ? ", " : "") + data.buildingName;
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setMember((prev) => ({
          ...prev,
          postCode: data.zonecode,
          addr: fullAddress,
        }));
      },
    }).open();
  };

  return (
    <Row className="justify-content-center">
      <Col xs={10} md={8} lg={6}>
        <h3 className="mb-4 text-center">회원 정보 수정</h3>
        <section className="bg-gray-100 px-3 px-sm-5 py-4 rounded-4 mb-3">
          {/* 고객 번호 */}
          <div>
            <FormGroup as={Row} controlId="memberNo" className="mb-4">
              <FormLabel column sm={3}>
                고객 번호
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.memberNo}
                  disabled
                />
              </Col>
            </FormGroup>
          </div>
          {/* 아이디 */}
          <div>
            <FormGroup as={Row} controlId="memberId" className="mb-4">
              <FormLabel column sm={3}>
                아이디
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  disabled
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.memberId}
                  onChange={(e) =>
                    setMember({ ...member, memberId: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
          </div>
          {/* 새 비밀번호 입력*/}
          <Form>
            <div>
              <FormGroup as={Row} controlId="password" className="mb-4">
                <FormLabel column sm={3}>
                  비밀번호
                </FormLabel>
                <Col sm={7}>
                  <FormControl
                    autoComplete="off"
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewPassword(value);
                      if (value.trim() === "") {
                        setErrors((prev) => ({ ...prev, newPassword: null }));
                      } else if (!validatePassword(e.target.value)) {
                        setErrors((prev) => ({
                          ...prev,
                          newPassword:
                            "비밀번호는 8자 이상, 숫자/특수문자를 포함해야 합니다.",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, newPassword: null }));
                      }
                    }}
                  />
                  {errors.newPassword && (
                    <FormText className="text-danger">
                      {errors.newPassword}
                    </FormText>
                  )}
                </Col>
              </FormGroup>
            </div>
            {/* 새 비밀번호 확인*/}
            <div>
              <FormGroup as={Row} controlId="password2" className="mb-4">
                <FormLabel column sm={3}>
                  비밀번호 확인
                </FormLabel>
                <Col sm={7}>
                  <FormControl
                    autoComplete="off"
                    type="password"
                    value={newPassword2}
                    onChange={(e) => {
                      setNewPassword2(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        newPassword2:
                          e.target.value !== newPassword
                            ? "비밀번호가 일치하지 않습니다."
                            : null,
                      }));
                    }}
                  />
                  {errors.newPassword2 && (
                    <FormText className="text-danger">
                      {errors.newPassword2}
                    </FormText>
                  )}
                </Col>
              </FormGroup>
            </div>
          </Form>
          {/* 이름 */}
          <div>
            <FormGroup as={Row} controlId="name" className="mb-4">
              <FormLabel column sm={3}>
                이름
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  value={member.name}
                  onChange={(e) =>
                    setMember({ ...member, name: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
          </div>
          {/* 이메일 */}
          <div>
            <FormGroup as={Row} controlId="email" className="mb-4">
              <FormLabel column sm={3}>
                이메일
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  disabled
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.email}
                  onChange={(e) =>
                    setMember({ ...member, email: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
          </div>
          {/* 생년월일 */}
          <div>
            <FormGroup as={Row} controlId="birthDate" className="mb-4">
              <FormLabel column sm={3}>
                생년월일
              </FormLabel>
              <Col sm={7} className="d-flex" style={{ gap: "10px" }}>
                {/* 년도 */}
                <Form.Select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  style={{ width: "120px", height: "40px" }}
                >
                  <option value="">년도</option>
                  {Array.from({ length: 100 }, (_, i) => {
                    const y = new Date().getFullYear() - i;
                    return (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    );
                  })}
                </Form.Select>
                {/* 월 */}
                <Form.Select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  style={{ width: "90px", height: "40px" }}
                >
                  <option value="">월</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {i + 1}
                    </option>
                  ))}
                </Form.Select>
                {/* 일*/}
                <Form.Select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  style={{ width: "90px", height: "40px" }}
                >
                  <option value="">일</option>
                  {Array.from(
                    { length: getDaysInMonth(birthYear, birthMonth) || 31 },
                    (_, i) => (
                      <option
                        key={i + 1}
                        value={String(i + 1).padStart(2, "0")}
                      >
                        {i + 1}
                      </option>
                    ),
                  )}
                </Form.Select>
              </Col>
            </FormGroup>
          </div>
          {/* 연락처 */}
          <div>
            <FormGroup as={Row} controlId="phone" className="mb-4">
              <FormLabel column sm={3}>
                연락처
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  value={member.phone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 추출

                    // 하이픈 자동 삽입
                    if (value.length < 4) {
                      // 010
                    } else if (value.length < 8) {
                      value = value.replace(/(\d{3})(\d{1,4})/, "$1-$2");
                    } else {
                      value = value.replace(
                        /(\d{3})(\d{4})(\d{1,4})/,
                        "$1-$2-$3",
                      );
                    }

                    // 상태 업데이트
                    setMember({ ...member, phone: value });
                    if (!validatePhone(value)) {
                      setErrors((prev) => ({
                        ...prev,
                        phone: "연락처 형식이 올바르지 않습니다.",
                      }));
                    } else {
                      setErrors((prev) => ({ ...prev, phone: null }));
                    }
                  }}
                />
                {errors.phone && (
                  <FormText className="text-danger">{errors.phone}</FormText>
                )}
              </Col>
            </FormGroup>
          </div>
          {/* 우편번호 */}
          <div>
            <FormGroup as={Row} controlId="postCode" className="mb-3">
              <FormLabel column sm={3}>
                우편번호
              </FormLabel>
              <Col xs={5} sm={5} md={5} lg={4}>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <FormControl
                    style={{ textAlign: "center" }}
                    value={member.postCode}
                    readOnly={true}
                    placeholder="우편번호"
                  />
                  {/* 검색버튼 */}
                  <Button
                    className="mb-0"
                    variant="outline-dark"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={handleSearchButtonClick}
                  >
                    검색
                  </Button>
                </div>
              </Col>
            </FormGroup>
          </div>
          {/* 주소 */}
          <div>
            <FormGroup as={Row} controlId="address" className="mb-2">
              <FormLabel column sm={3}>
                주소
              </FormLabel>
              <Col sm={7}>
                <FormControl value={member.addr} readOnly={true} />
              </Col>
            </FormGroup>
          </div>
          {/* 상세 주소 */}
          <div>
            <FormGroup as={Row} controlId="addressDetail" className="mb-4">
              <FormLabel column sm={3}></FormLabel>
              <Col sm={7}>
                <FormControl
                  value={member.addrDetail || ""}
                  onChange={(e) =>
                    setMember({ ...member, addrDetail: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
          </div>
          {/* 사용여부 */}
          <div>
            <FormGroup as={Row} controlId="useYn" className="mb-3">
              <FormLabel column sm={3}>
                사용여부
              </FormLabel>
              <Col sm={7}>
                <FormCheck
                  type="checkbox"
                  id="useYn"
                  label={member.useYn ? "사용중" : "미사용"}
                  checked={member.useYn}
                  onChange={(e) =>
                    setMember({ ...member, useYn: e.target.checked })
                  }
                />
              </Col>
            </FormGroup>
          </div>
          {/* 삭제여부 */}
          <div>
            <FormGroup as={Row} controlId="delYn">
              <FormLabel column sm={3}>
                삭제여부
              </FormLabel>
              <Col sm={7}>
                <FormCheck
                  type="checkbox"
                  id="useYn"
                  label={"삭제"}
                  checked={member.delYn}
                  onChange={(e) =>
                    setMember({ ...member, delYn: e.target.checked })
                  }
                />
              </Col>
            </FormGroup>
          </div>
        </section>
        {/* 취소 수정 버튼*/}
        <div className="d-flex gap-3 justify-content-end">
          <Button variant="outline-primary" onClick={() => setModalShow(true)}>
            수정
          </Button>
          <Button variant="outline-dark" onClick={() => navigate(-1)}>
            취소
          </Button>
        </div>
      </Col>

      {/*  수정 확인 모달*/}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>회원 정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>이대로 수정하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleModifyButtonClick}>
            수정
          </Button>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
