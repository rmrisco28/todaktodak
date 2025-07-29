import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function MemberSignup() {
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

  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const navigate = useNavigate();

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

  function handleSaveButtonClick() {
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
        navigate("/login");
      })
      .catch((err) => {
        console.log("err");
      })
      .finally(() => {});
  }

  function updateBirthDate(y, m, d) {
    if (y && m && d) {
      setBirthDate(`${y}-${m}-${d}`); // YYYY-MM-DD 형식
    }
  }

  return (
    <Row className="d-flex justify-content-center">
      <Col md="auto">
        <h3 className="mb-4 text-center">회원 가입</h3>
        {/* 아이디 */}
        <div>
          <FormGroup className="mb-3" controlId="memberId">
            <FormLabel>아이디</FormLabel>
            <FormControl
              style={{ width: "400px" }}
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
          </FormGroup>
        </div>
        {/* 비밀번호 */}
        <div>
          <FormGroup className="mb-3" controlId="password1">
            <FormLabel>비밀번호</FormLabel>
            <FormControl
              type="password"
              value={password}
              style={{ width: "400px" }}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        {/* 비밀번호 확인 */}
        <div>
          <FormGroup className="mb-3" controlId="password2">
            <FormLabel>비밀번호 확인</FormLabel>
            <FormControl
              type="password"
              style={{ width: "400px" }}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </FormGroup>
        </div>
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
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormGroup>
        </div>
        {/* 생년월일 */}
        <div>
          <FormGroup className="mb-3" controlId="birthDate">
            <FormLabel>생년월일</FormLabel>
            <div className="d-flex" style={{ gap: "10px" }}>
              <FormControl
                as="select"
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
              </FormControl>

              <FormControl
                as="select"
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
              </FormControl>

              <FormControl
                as="select"
                style={{ width: "100px" }}
                value={birthDay}
                onChange={(e) => {
                  setBirthDay(e.target.value);
                  updateBirthDate(birthYear, birthMonth, e.target.value);
                }}
              >
                <option value="">일</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {i + 1}
                  </option>
                ))}
              </FormControl>
            </div>
          </FormGroup>
        </div>
        {/* 이메일 */}
        <div>
          <FormGroup className="mb-3" controlId="email">
            <FormLabel>이메일</FormLabel>
            <FormControl
              type="email"
              style={{ width: "400px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
