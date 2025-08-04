import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export function MemberMyInfoModify() {
  const [member, setMember] = useState(null);
  const { memberId } = useParams();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [passwordModalShow, setPasswordModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  // 생년월일 관련 상태(드랍다운 분리)
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  // 비밀번호 변경 유효성 검사 상태
  const [errors, setErrors] = useState({});

  // 유효성 검사 함수
  const validatePassword = (value) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~]).{8,}$/.test(value);

  useEffect(() => {
    axios
      .get(`/api/member/myinfo/${memberId}`)
      .then((res) => {
        console.log("성공");
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
        console.log("항상 실행");
      });
  }, []);

  if (!member) {
    return <Spinner />;
  }

  // 변경 버튼 클릭
  function handleModifyButtonClick() {
    // 기존 회원 정보 복사
    const modifiedMember = { ...member };

    // 생년월일이 모두 입력된 경우에만 변경
    if (birthYear && birthMonth && birthDay) {
      modifiedMember.birthDate = `${birthYear}-${birthMonth}-${birthDay}`;
    }

    axios
      .put(`/api/member/myinfo/modify/${memberId}`, modifiedMember)
      .then((res) => {
        console.log("성공");
        setMember(res.data);
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate(`/member/myinfo/${memberId}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
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

  if (!member) {
    return <Spinner />;
  }

  // 비밀번호 변경 버튼 클릭
  function handleChangePasswordButtonClick() {
    const newErrors = {};
    setHasSubmitted(true);

    // 현재 비밀번호 입력 유무
    if (!currentPassword.trim()) {
      newErrors.currentPassword = "현재 비밀번호를 입력해주세요.";
    }
    // 새 비밀번호 입력 유무
    if (!newPassword.trim()) {
      newErrors.newPassword = "새 비밀번호를 입력해주세요.";
    }
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

    // 비밀번호 변경 요청
    axios
      .put(`/api/member/myinfo/modify/changePassword`, {
        memberId: member.memberId,
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
      .then((res) => {
        console.log(res);
        toast("비밀번호가 변경되었습니다.", { type: "success" });
      })
      .catch((err) => {
        console.log(err);
        toast("비밀번호 변경에 실패하였습니다.", { type: "error" });
      })
      .finally(() => {
        setCurrentPassword("");
        setNewPassword("");
        setNewPassword2("");
        setPasswordModalShow(false);
        setHasSubmitted(false);
      });
  }

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <h3 className="mb-4">회원 정보 변경</h3>
        {/* 아이디 */}
        <div>
          <FormGroup as={Row} controlId="memberId" className="mb-4">
            <FormLabel column lg={3}>
              아이디
            </FormLabel>
            <Col lg={7}>
              <FormControl value={member.memberId} disabled />
            </Col>
          </FormGroup>
        </div>
        {/* 비밀번호 / 비밀번호 변경 */}
        <div>
          <FormGroup as={Row} controlId="password" className="mb-4">
            <FormLabel column lg={3}>
              비밀번호
            </FormLabel>
            <Col lg={7} className="text-center">
              <Button onClick={() => setPasswordModalShow(true)}>
                비밀번호 변경
              </Button>
            </Col>
          </FormGroup>
        </div>
        {/* 이름 */}
        <div>
          <FormGroup as={Row} controlId="name" className="mb-4">
            <FormLabel column sm={3}>
              이름
            </FormLabel>
            <Col sm={7}>
              <FormControl
                value={member.name}
                onChange={(e) => setMember({ ...member, name: e.target.value })}
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
            <Col sm={9} className="d-flex" style={{ gap: "10px" }}>
              {/* 년도 */}
              <FormControl
                as="select"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                style={{ width: "100px" }}
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
              </FormControl>
              {/* 월 */}
              <FormControl
                as="select"
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                style={{ width: "70px" }}
              >
                <option value="">월</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </FormControl>
              {/* 일*/}
              <FormControl
                as="select"
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                style={{ width: "70px" }}
              >
                <option value="">일</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </FormControl>
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
                onChange={(e) =>
                  setMember({ ...member, phone: e.target.value })
                }
              />
            </Col>
          </FormGroup>
        </div>
        {/* 우편번호 */}
        <div>
          <FormGroup as={Row} controlId="postCode" className="mb-4">
            <FormLabel column sm={3}>
              우편번호
            </FormLabel>
            <Col sm={7}>
              <div className="d-flex" style={{ gap: "10px" }}>
                <FormControl
                  value={member.postCode}
                  readOnly
                  placeholder="우편번호"
                />
                {/* 검색버튼 */}
                <Button
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
            <Col md={9}>
              <FormControl value={member.addr} readOnly />
            </Col>
          </FormGroup>
        </div>
        {/* 상세 주소 */}
        <div>
          <FormGroup as={Row} controlId="addressDetail" className="mb-4">
            <FormLabel column sm={3}></FormLabel>
            <Col sm={9}>
              <FormControl
                value={member.addrDetail}
                onChange={(e) =>
                  setMember({ ...member, addrDetail: e.target.value })
                }
              />
            </Col>
          </FormGroup>
        </div>
        {/* 취소, 변경 버튼*/}
        <div>
          <Button
            className="me-2"
            variant="outline-dark"
            onClick={() => navigate(-1)}
          >
            취소
          </Button>
          <Button variant="outline-primary" onClick={() => setModalShow(true)}>
            변경
          </Button>
        </div>
      </Col>
      {/*  비밀번호 변경 모달 */}
      <Modal
        show={passwordModalShow}
        onHide={() => setPasswordModalShow(false)}
        onShow={() => {
          setErrors({});
          setCurrentPassword("");
          setNewPassword("");
          setNewPassword2("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup>
              <FormLabel>현재 비밀번호</FormLabel>
              <FormControl
                autoComplete="off"
                type="password"
                value={currentPassword}
                style={{ width: "300px" }}
                onChange={(e) => {
                  const value = e.target.value;
                  setCurrentPassword(value);
                  if (hasSubmitted && value.trim() !== "") {
                    setErrors((prev) => ({ ...prev, currentPassword: null }));
                  }
                }}
              />
              {errors.currentPassword && (
                <FormText className="text-danger">
                  {errors.currentPassword}
                </FormText>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel className="mt-2">새 비밀번호</FormLabel>
              <FormControl
                autoComplete="off"
                type="password"
                value={newPassword}
                style={{ width: "300px" }}
                onChange={(e) => {
                  const value = e.target.value;
                  setNewPassword(value);
                  if (value.trim() === "") {
                    setErrors((prev) => ({ ...prev, newPassword: null }));
                  } else if (!validatePassword(value)) {
                    setErrors((prev) => ({
                      ...prev,
                      newPassword:
                        "비밀번호는 8자 이상, 숫자/특수문자를 포함해야합니다.",
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
            </FormGroup>
            <FormGroup>
              <FormLabel className="mt-2">새 비밀번호 확인</FormLabel>
              <FormControl
                autoComplete="off"
                type="password"
                value={newPassword2}
                style={{ width: "300px" }}
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
            </FormGroup>
          </Form>
          <div
            className="d-flex justify-content-start mt-3"
            style={{ width: "300px" }}
          >
            <Button
              className="me-3"
              variant="outline-danger"
              onClick={() => setPasswordModalShow(false)}
            >
              취소
            </Button>
            <Button
              variant="outline-primary"
              onClick={handleChangePasswordButtonClick}
            >
              변경
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      {/*  변경 확인 모달*/}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>회원 정보 변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>이대로 변경하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
          <Button variant="outline-primary" onClick={handleModifyButtonClick}>
            변경
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
