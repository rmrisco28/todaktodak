import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function MemberAdd() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postCode, setPostCode] = useState("");

  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const navigate = useNavigate();

  // 유효성 검사 상태
  const [errors, setErrors] = useState({});

  // 유효성 검사 함수

  // 이메일
  const validateEmail = (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  // 비밀번호
  const validatePassword = (value) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~]).{8,}$/.test(value);

  // 주소 검색 버튼 클릭
  const handleSearchButtonClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address;
        let extraAddress = "";

        // 도로명 주소일 경우 상세주소 조합
        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress +=
              (extraAddress !== "" ? ", " : "") + data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setAddress(fullAddress); // 주소저장
        setPostCode(data.zonecode); // 우편번호 저장
      },
    }).open();
  };

  // 회원등록 버튼 클릭
  function handleSaveButtonClick() {
    const newErrors = {};

    // 각 항목 유효성 체크
    if (!memberId) newErrors.memberId = "아이디를 입력해주세요.";
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }
    if (password !== password2)
      newErrors.password2 = "비밀번호가 일치하지 않습니다.";
    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    axios
      .post("/api/member/add", {
        memberId: memberId,
        password: password,
        name: name,
        phone: phone,
        birthDate: birthDate,
        email: email,
        addr: address,
        addrDetail: addressDetail,
        postCode: postCode,
      })
      .then((res) => {
        console.log(res.data);
        alert("회원 등록이 완료되었습니다.");
        navigate("/member/list");
      })
      .catch((err) => {
        console.log(err);
        alert("회원 등록에 실패하였습니다.");
      })
      .finally(() => {});
  }

  // 월별 일수 계산 함수
  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate(); // month는 1부터 시작
  }

  // 생년월일 조합
  function updateBirthDate(y, m, d) {
    if (y && m && d) {
      setBirthDate(`${y}-${m}-${d}`); // YYYY-MM-DD 형식
    }
  }

  return (
    <Row className="d-flex justify-content-center">
      <Col md="auto">
        <h3 className="mb-4 text-center">회원 등록</h3>
        <section className="bg-gray-100 px-3 px-sm-5 py-4 rounded mb-3">
          {/* 아이디 */}
          <div>
            <FormGroup className="mb-3" controlId="memberId">
              <FormLabel>아이디</FormLabel>
              <FormControl
                placeholder="아이디"
                autoComplete="off"
                value={memberId}
                onChange={(e) => {
                  setMemberId(e.target.value);
                  setErrors((prev) => ({ ...prev, memberId: null }));
                }}
                className={errors.memberId ? "is-invalid" : ""}
                aria-describedby="memberIdFeedback"
              />
              {errors.memberId && (
                <div
                  id="memberIdFeedback"
                  className={
                    errors.memberId ? "text-danger mt-1" : "text-success mt-1"
                  }
                  style={{ fontSize: "0.875em" }}
                >
                  {errors.memberId}
                </div>
              )}
            </FormGroup>
          </div>
          {/* 비밀번호 */}
          <Form>
            <div>
              <FormGroup className="mb-3" controlId="password1">
                <FormLabel>비밀번호</FormLabel>
                <FormControl
                  placeholder="비밀번호"
                  autoComplete="off"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    if (value.trim() === "") {
                      setErrors((prev) => ({ ...prev, password: null }));
                    } else if (!validatePassword(e.target.value)) {
                      setErrors((prev) => ({
                        ...prev,
                        password:
                          "비밀번호는 8자 이상, 숫자/특수문자를 포함해야 합니다.",
                      }));
                    } else {
                      setErrors((prev) => ({ ...prev, password: null }));
                    }
                  }}
                  className={errors.password ? "is-invalid" : ""}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </FormGroup>
            </div>
            {/* 비밀번호 확인 */}
            <div>
              <FormGroup className="mb-3" controlId="password2">
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl
                  autoComplete="off"
                  type="password"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      password2:
                        e.target.value !== password
                          ? "비밀번호가 일치하지 않습니다."
                          : null,
                    }));
                  }}
                  className={errors.password2 ? "is-invalid" : ""}
                />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
              </FormGroup>
            </div>
          </Form>
          {/* 이름 */}
          <div>
            <FormGroup controlId="name">
              <FormLabel>이름</FormLabel>
              <FormControl
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </div>
          {/* 연락처 */}
          <div>
            <FormGroup className="mb-3 mt-3" controlId="phone">
              <FormLabel>연락처</FormLabel>
              <FormControl
                placeholder="010-1234-5678"
                value={phone}
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
                  setPhone(value);
                }}
              />
            </FormGroup>
          </div>
          {/* 생년월일 */}
          <div>
            <FormGroup className="mb-3" controlId="birthDate">
              <FormLabel>생년월일</FormLabel>
              <div className="d-flex" style={{ gap: "10px" }}>
                {/* 년도 */}
                <Form.Select
                  style={{ width: "140px" }}
                  value={birthYear}
                  onChange={(e) => {
                    setBirthYear(e.target.value);
                    updateBirthDate(e.target.value, birthMonth, birthDay);
                  }}
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
                  style={{ width: "120px" }}
                  value={birthMonth}
                  onChange={(e) => {
                    setBirthMonth(e.target.value);
                    updateBirthDate(birthYear, e.target.value, birthDay);
                  }}
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
                  style={{ width: "120px" }}
                  value={birthDay}
                  onChange={(e) => {
                    setBirthDay(e.target.value);
                    updateBirthDate(birthYear, birthMonth, e.target.value);
                  }}
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
              </div>
            </FormGroup>
          </div>

          {/* 이메일 */}
          <div>
            <FormGroup className="mb-3" controlId="email">
              <FormLabel>이메일</FormLabel>
              <FormControl
                placeholder="example@example.com"
                autoComplete="off"
                type="email"
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  if (value.trim() === "") {
                    setErrors((prev) => ({ ...prev, email: null }));
                  } else if (!validateEmail(value)) {
                    setErrors((prev) => ({
                      ...prev,
                      email: "이메일 형식이 올바르지 않습니다.",
                    }));
                  } else {
                    setErrors((prev) => ({ ...prev, email: null }));
                  }
                }}
                className={errors.email ? "is-invalid" : ""}
              />
              {errors.email && (
                <FormText className="text-danger">{errors.email}</FormText>
              )}
            </FormGroup>
          </div>

          {/* 우편번호 */}
          <div>
            <FormGroup controlId="postCode" className="mb-3">
              <FormLabel>주소</FormLabel>
              <Row className="g-2 align-items-center">
                <Col xs={8} sm={3}>
                  <FormControl
                    placeholder="우편번호"
                    value={postCode}
                    onChange={(e) => setPostCode(e.target.value)}
                    readOnly
                  />
                </Col>
                <Col xs={4} sm={3}>
                  <Button
                    variant="outline-dark"
                    className="w-100 mb-0"
                    onClick={handleSearchButtonClick}
                  >
                    검색
                  </Button>
                </Col>
              </Row>
            </FormGroup>
            {/* 주소 */}
            <FormGroup>
              <div className="d-flex mb-3" style={{ gap: "10px" }}>
                <FormControl
                  placeholder="도로명 주소 / 지번"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  readOnly
                />
              </div>
            </FormGroup>
            {/* 상세주소 */}
            <FormGroup className="mb-3" controlId="addressDetail">
              <div className="mb-3">
                <FormControl
                  placeholder="상세주소"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                />
              </div>
            </FormGroup>
          </div>
        </section>
        {/* 회원등록 버튼 */}
        <div className="mb-4 d-flex justify-content-end gap-2">
          <Button variant="outline-primary" onClick={handleSaveButtonClick}>
            등록
          </Button>
          <Button onClick={() => navigate(-1)} variant="outline-dark">
            취소
          </Button>
        </div>
      </Col>
    </Row>
  );
}
