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
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function MemberSignup() {
  // ---------- 상태 선언 ----------
  // 입력 필드 값 상태
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postCode, setPostCode] = useState("");

  // 생년월일 구성용 연도/월/일
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const navigate = useNavigate();

  // 유효성 검사 상태
  const [errors, setErrors] = useState({});
  const [valids, setValids] = useState({});

  // 유효성 검사 함수

  // 이메일
  const validateEmail = (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  // 연락처
  const validatePhone = (value) => /^01[016789]-?\d{3,4}-?\d{4}$/.test(value);
  // 비밀번호
  const validatePassword = (value) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~]).{8,}$/.test(value);

  // 아이디 중복 확인
  const handleCheckMemberId = () => {
    if (!memberId) return;

    axios
      .get(`/api/member/check-id?memberId=${memberId}`)
      .then((res) => {
        if (res.data.exists) {
          // 이미 존재
          setErrors((prev) => ({
            ...prev,
            memberId: "이미 존재하는 아이디입니다.",
          }));
          setValids((prev) => ({ ...prev, memberId: null }));
        } else {
          // 사용 가능
          setErrors((prev) => ({ ...prev, memberId: null }));
          setValids((prev) => ({
            ...prev,
            memberId: "사용 가능한 아이디입니다.",
          }));
        }
      })
      .catch(() => {
        setErrors((prev) => ({ ...prev, memberId: "중복 확인 중 오류 발생" }));
      });
  };

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

  // 회원가입 버튼 클릭
  function handleSaveButtonClick() {
    const newErrors = {};

    // 각 항목 유효성 체크
    if (!memberId) newErrors.memberId = "아이디를 입력하세요.";
    if (!validatePassword(password))
      newErrors.password =
        "비밀번호는 8자 이상, 숫자/특수문자를 포함해야 합니다.";
    if (password !== password2)
      newErrors.password2 = "비밀번호가 일치하지 않습니다.";
    if (!validateEmail(email))
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    if (!validatePhone(phone))
      newErrors.phone = "휴대폰 번호 형식이 올바르지 않습니다.";
    if (!birthDate) newErrors.birthDate = "생년월일을 선택해주세요.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // 회원가입 요청
    axios
      .post("/api/member/signup", {
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
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("회원가입 실패");
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

  // 화면 렌더링
  return (
    <Row className="d-flex justify-content-center">
      <Col md="auto">
        <h3 className="mb-4 text-center">회원 가입</h3>
        {/* 아이디 / 중복확인 */}
        <div>
          <FormGroup className="mb-3" controlId="memberId">
            <FormLabel>아이디</FormLabel>
            <div className="d-flex gap-2">
              <FormControl
                autoComplete="off"
                style={{ width: "300px" }}
                value={memberId}
                onChange={(e) => {
                  setMemberId(e.target.value);
                  setErrors((prev) => ({ ...prev, memberId: null }));
                  setValids((prev) => ({ ...prev, memberId: null }));
                }}
              />
              <Button variant="outline-secondary" onClick={handleCheckMemberId}>
                중복 확인
              </Button>
            </div>
            {errors.memberId && (
              <FormText className="text-danger">{errors.memberId}</FormText>
            )}
            {valids.memberId && (
              <FormText className="text-success">{valids.memberId}</FormText>
            )}
          </FormGroup>
        </div>
        {/* 비밀번호 */}
        <Form>
          <div>
            <FormGroup className="mb-3" controlId="password1">
              <FormLabel>비밀번호</FormLabel>
              <FormControl
                autoComplete="off"
                type="password"
                value={password}
                style={{ width: "400px" }}
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
              />
              {errors.password && (
                <FormText className="text-danger">{errors.password}</FormText>
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
                style={{ width: "400px" }}
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
              />
              {errors.password2 && (
                <FormText className="text-danger">{errors.password2}</FormText>
              )}
            </FormGroup>
          </div>
        </Form>
        {/* 이름 */}
        <div>
          <FormGroup className="mb-3" controlId="name">
            <FormLabel>이름</FormLabel>
            <FormControl
              style={{ width: "400px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
        </div>
        {/* 연락처 */}
        <div>
          <FormGroup className="mb-3" controlId="phone">
            <FormLabel>연락처</FormLabel>
            <FormControl
              style={{ width: "400px" }}
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                setPhone(value);
                if (value.trim() === "") {
                  setErrors((prev) => ({ ...prev, phone: null }));
                } else if (!validatePhone(value)) {
                  setErrors((prev) => ({
                    ...prev,
                    phone: "번호 형식이 올바르지 않습니다.",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, phone: null }));
                }
              }}
            />
            {errors.phone && (
              <FormText className="text-danger">{errors.phone}</FormText>
            )}
          </FormGroup>
        </div>
        {/* 생년월일 */}
        <div>
          <FormGroup className="mb-3" controlId="birthDate">
            <FormLabel>생년월일</FormLabel>
            <div className="d-flex" style={{ gap: "10px" }}>
              <Form.Select
                style={{ width: "130px" }}
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

              <Form.Select
                style={{ width: "100px" }}
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

              <Form.Select
                style={{ width: "100px" }}
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
                    <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                      {i + 1}
                    </option>
                  ),
                )}
              </Form.Select>
            </div>
            {errors.birthDate && (
              <FormText className="text-danger">{errors.birthDate}</FormText>
            )}
          </FormGroup>
        </div>

        {/* 이메일 */}
        <div>
          <FormGroup className="mb-3" controlId="email">
            <FormLabel>이메일</FormLabel>
            <FormControl
              autoComplete="off"
              type="email"
              style={{ width: "400px" }}
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
            />
            {errors.email && (
              <FormText className="text-danger">{errors.email}</FormText>
            )}
          </FormGroup>
        </div>
        {/* 우편번호 */}
        <div>
          <FormGroup controlId="postCode">
            <FormLabel>주소</FormLabel>
            <div className="d-flex" style={{ gap: "10px" }}>
              <FormControl
                placeholder="우편번호"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                style={{ width: "150px" }}
                readOnly
              />
              {/* 주소 검색 버튼 */}
              <Button variant="outline-dark" onClick={handleSearchButtonClick}>
                검색
              </Button>
            </div>
          </FormGroup>
          {/* 주소 검색 */}
          <FormGroup controlId="addrees">
            <FormLabel></FormLabel>
            <div className="d-flex mb-3" style={{ gap: "10px" }}>
              <FormControl
                placeholder="도로명 주소 / 지번"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: "400px" }}
                readOnly
              />
            </div>
          </FormGroup>
          {/* 상세주소 */}
          <FormGroup className="mb-3" controlId="addressDetail">
            <div className="mb-3">
              <FormControl
                placeholder="상세주소"
                style={{ width: "400px" }}
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
              />
            </div>
          </FormGroup>
        </div>
        {/* 회원가입 버튼 */}
        <div className=" d-flex justify-content-center mb-4">
          <Button onClick={handleSaveButtonClick}>회원 가입</Button>
        </div>
      </Col>
    </Row>
  );
}
