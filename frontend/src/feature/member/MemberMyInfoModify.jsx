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
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export function MemberMyInfoModify() {
  const [member, setMember] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

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

  // 비밀번호
  const validatePassword = (value) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~]).{8,}$/.test(value);
  // 연락처
  const validatePhone = (value) => /^01[016789]-?\d{3,4}-?\d{4}$/.test(value);

  useEffect(() => {
    axios
      .get(`/api/member/myinfo`)
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

    //유효성 검사 체크
    const newErrors = {};

    if (!member.name.trim()) newErrors.name = "이름을 입력해주세요.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // 유효성 실패 시 요청 막기
    }

    axios
      .put(`/api/member/myinfo/modify`, modifiedMember)
      .then((res) => {
        console.log("성공");
        setMember(res.data);
        toast.success("변경이 완료되었습니다.", { position: "top-center" });

        navigate(`/member/myinfo`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
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

  if (!member) {
    return <Spinner />;
  }

  // 비밀번호 변경 버튼 클릭
  function handleChangePasswordButtonClick() {
    const newErrors = {};

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

    // 현재 비밀번호 = 새 비밀번호 인지 확인
    if (currentPassword === newPassword) {
      newErrors.newPassword =
        "새 비밀번호는 현재 비밀번호와 다르게 입력해주세요.";
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
        toast("현재 비밀번호가 일치하지않습니다.", { type: "error" });
      })
      .finally(() => {
        setCurrentPassword("");
        setNewPassword("");
        setNewPassword2("");
        setPasswordModalShow(false);
      });
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={5} className="p-3" style={{ width: "700px" }}>
        <h3 className="mb-4 text-center">내 정보 변경</h3>
        <section className="bg-gray-100 px-3 px-sm-5 py-4 rounded-4 mb-3">
          {/* 아이디 */}
          <FormGroup
            as={Row}
            controlId="memberId"
            className="mb-4 align-items-center"
          >
            <FormLabel column xs={12} sm={3}>
              아이디
            </FormLabel>
            <Col xs={12} sm={7}>
              <FormControl
                style={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
                value={member.memberId}
                onChange={(e) =>
                  setMember({ ...member, memberId: e.target.value })
                }
                disabled
              />
            </Col>
          </FormGroup>

          {/* 비밀번호 변경 버튼 */}
          <FormGroup
            as={Row}
            controlId="password"
            className="mb-4 align-items-center"
          >
            <FormLabel column xs={12} sm={3}>
              비밀번호
            </FormLabel>
            <Col xs={12} sm={7} className="d-flex">
              <Button
                className="mb-2 mb-sm-0 w-100 w-sm-auto"
                onClick={() => setPasswordModalShow(true)}
              >
                비밀번호 변경
              </Button>
            </Col>
          </FormGroup>

          {/* 이름 */}
          <FormGroup
            as={Row}
            controlId="name"
            className="mb-4 align-items-center"
          >
            <FormLabel column xs={12} sm={3}>
              이름
            </FormLabel>
            <Col xs={12} sm={7}>
              <FormControl
                placeholder="이름"
                value={member.name}
                onChange={(e) => {
                  setMember({ ...member, name: e.target.value });
                  setErrors((prev) => ({ ...prev, name: null }));
                }}
                className={errors.name ? "is-invalid" : ""}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </Col>
          </FormGroup>

          {/* 이메일 */}
          <FormGroup
            as={Row}
            controlId="email"
            className="mb-4 align-items-center"
          >
            <FormLabel column xs={12} sm={3}>
              이메일
            </FormLabel>
            <Col xs={12} sm={7}>
              <FormControl
                style={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
                value={member.email}
                disabled
                type="email"
              />
            </Col>
          </FormGroup>

          {/* 생년월일 */}
          <FormGroup
            as={Row}
            controlId="birthDate"
            className="mb-4 align-items-center"
          >
            <FormLabel column xs={12} sm={3}>
              생년월일
            </FormLabel>
            <Col xs={12} sm={7}>
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
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

                {/* 일 */}
                <Form.Select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  style={{ width: "90px", height: "40px" }}
                >
                  <option value="">일</option>
                  {Array.from(
                    { length: getDaysInMonth(birthYear, birthMonth || 1) },
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
              </div>
            </Col>
          </FormGroup>

          {/* 연락처 */}
          <FormGroup
            as={Row}
            controlId="phone"
            className="mb-4 align-items-center"
          >
            <FormLabel column xs={12} sm={3}>
              연락처
            </FormLabel>
            <Col xs={12} sm={7}>
              <FormControl
                placeholder="ex)010-1234-5678"
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
                  if (value.trim() === "") {
                    setErrors((prev) => ({ ...prev, phone: null }));
                  } else if (!validatePhone(value)) {
                    setErrors((prev) => ({
                      ...prev,
                      phone: "핸드폰 번호 형식이 올바르지 않습니다.",
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

          {/* 우편번호 + 검색 */}
          <FormGroup
            as={Row}
            controlId="postCode"
            className="mb-4 align-items-center"
          >
            <FormLabel column xs={12} sm={3}>
              우편번호
            </FormLabel>
            <Col xs={12} sm={5}>
              <div className="d-flex gap-2">
                <FormControl
                  value={member.postCode}
                  readOnly
                  placeholder="우편번호"
                />
                <Button
                  className="w-100 mb-0"
                  variant="outline-dark"
                  onClick={handleSearchButtonClick}
                >
                  검색
                </Button>
              </div>
            </Col>
          </FormGroup>

          {/* 주소 */}
          <FormGroup
            as={Row}
            controlId="address"
            className="mb-2 align-items-center"
          >
            <FormLabel column xs={12} sm={3}>
              주소
            </FormLabel>
            <Col xs={12} sm={7}>
              <FormControl
                placeholder="도로명 주소 / 지번"
                value={member.addr}
                readOnly
              />
            </Col>
          </FormGroup>

          {/* 상세 주소 */}
          <FormGroup
            as={Row}
            controlId="addressDetail"
            className="mb-4 align-items-center"
          >
            <FormLabel column xs={12} sm={3}></FormLabel>
            <Col xs={12} sm={7}>
              <FormControl
                placeholder="상세 주소"
                value={member.addrDetail}
                onChange={(e) =>
                  setMember({ ...member, addrDetail: e.target.value })
                }
              />
            </Col>
          </FormGroup>
        </section>

        {/* 취소, 변경 버튼 */}
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="outline-primary" onClick={() => setModalShow(true)}>
            변경
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => navigate("/member/myinfo")}
          >
            취소
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
                style={{ width: "100%" }}
                onChange={(e) => {
                  const value = e.target.value;
                  setCurrentPassword(value);
                  if (value.trim() !== "") {
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
                style={{ width: "100%" }}
                onChange={(e) => {
                  const value = e.target.value;
                  setNewPassword(value);
                  if (value.trim() === "") {
                    setErrors((prev) => ({ ...prev, newPassword: null }));
                  } else if (value === currentPassword) {
                    setErrors((prev) => ({
                      ...prev,
                      newPassword:
                        "새 비밀번호는 현재 비밀번호와 다르게 입력해주세요.",
                    }));
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
                style={{ width: "100%" }}
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
            className="d-flex justify-content-end mt-3"
            style={{ width: "100%" }}
          >
            <Button
              className="me-3"
              variant="outline-primary"
              onClick={handleChangePasswordButtonClick}
            >
              변경
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => setPasswordModalShow(false)}
            >
              취소
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
          <Button variant="outline-primary" onClick={handleModifyButtonClick}>
            변경
          </Button>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
