import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export function MemberLogin() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // step2. Use the context (토큰 인증 context 호출)
  const { login } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  function handleLogInButtonClick() {
    axios
      .post(`/api/member/login`, {
        memberId: memberId,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        login(token);

        toast.success("로그인 되었습니다.", { position: "top-center" });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("always");
      });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    handleLogInButtonClick();
  }

  return (
    <Row className="d-flex justify-content-center">
      <Col md="auto">
        <h3 className="d-flex justify-content-center mb-4">Login</h3>
        {/* 아이디 */}
        <Form onSubmit={handleFormSubmit}>
          <div>
            <FormGroup className="mb-3" controlId="memberId">
              <FormLabel>아이디</FormLabel>
              <div style={{ position: "relative" }}>
                <FormControl
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  style={{ paddingRight: "36px" }}
                />
                {/* ❌ 아이디 초기화 버튼 */}
                {memberId && (
                  <span
                    onClick={() => setMemberId("")}
                    style={{
                      position: "absolute",
                      top: "45%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "black",
                      fontSize: "18px",
                    }}
                  >
                    <FaTimes />
                  </span>
                )}
              </div>
            </FormGroup>
          </div>
          {/* 패스워드 */}
          <FormGroup className="mb-3" controlId="password">
            <FormLabel>비밀번호</FormLabel>
            <div style={{ position: "relative" }}>
              <FormControl
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: "60px" }}
              />
              {/* 👁 비밀번호 보기 토글 */}
              {password && (
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    top: "45%",
                    right: "36px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              )}
              {/* ❌ 비밀번호 초기화 (입력값 있을 때만) */}
              {password && (
                <span
                  onClick={() => setPassword("")}
                  style={{
                    position: "absolute",
                    top: "45%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "black",
                    fontSize: "18px",
                  }}
                >
                  <FaTimes />
                </span>
              )}
            </div>
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Button type="submit" className="w-100 mb-4">
              로그인
            </Button>
          </div>
        </Form>
        <div className="text-center">
          <Link to="/" className="mx-2 text-decoration-none text-secondary">
            아이디찾기
          </Link>
          <span>|</span>
          <Link
            to="/member/find_password/email_auth"
            className="mx-2 text-decoration-none text-secondary"
          >
            비밀번호찾기
          </Link>
          <span>|</span>
          <Link
            to="/signup"
            className="mx-2 text-decoration-none text-secondary"
          >
            회원가입
          </Link>
        </div>
      </Col>
    </Row>
  );
}
