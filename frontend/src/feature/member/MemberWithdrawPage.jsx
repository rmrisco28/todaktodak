import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaRegTimesCircle } from "react-icons/fa";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";

export function MemberWithdrawPage() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);

  const { logout } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/member/myinfo")
      .then((res) => {
        setMemberId(res.data.memberId);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  // 회원탈퇴 버튼
  function handleDeleteButtonClick() {
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    axios
      .put(`/api/member/withdraw`, { password: password })
      .then((res) => {
        console.log("ok");
        const message = res.data.message;
        toast(message.text, { type: message.type, position: "top-center" });
        logout();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type, position: "top-center" });
        }
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }

  if (!memberId) {
    return <Spinner />;
  }

  return (
    <div>
      <h2
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "10vh" }}
      >
        회원 탈퇴
      </h2>
      <h6 className="text-center">
        계정 삭제 전 본인 확인을 위해 비밀번호를 다시 입력해주세요.
      </h6>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Col xs={12} sm="auto" style={{ width: "400px" }}>
          <section className="bg-gray-100 px-5 py-5 rounded-3 mb-3">
            <h3 className="mb-4 text-center">비밀번호 확인</h3>
            {/* 아이디 */}
            <Form>
              <div>
                <FormGroup as={Row} className="mb-3" controlId="memberId">
                  <FormLabel column sm={3}>
                    아이디
                  </FormLabel>
                  <Col>
                    <div style={{ position: "relative" }}>
                      <FormControl
                        placeholder="아이디"
                        value={memberId}
                        onChange={(e) => {
                          setMemberId(e.target.value);
                        }}
                        style={{
                          width: "100%",
                          border: "none",
                          boxShadow: "none",
                          backgroundColor: "transparent",
                        }}
                        disabled
                      />
                    </div>
                  </Col>
                </FormGroup>
              </div>
              {/* 패스워드 */}
              <FormGroup as={Row} className="mb-3" controlId="password">
                <FormLabel column sm={3}>
                  비밀번호
                </FormLabel>
                <Col>
                  <div style={{ position: "relative" }}>
                    <FormControl
                      placeholder="비밀번호"
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                      }}
                      className={error ? "is-invalid" : ""}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}

                    {/* 👁 비밀번호 보기 토글 */}
                    {password && (
                      <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{
                          position: "absolute",
                          top: "45%",
                          right: "30px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      >
                        {showPassword ? <IoIosEye /> : <IoMdEyeOff />}
                      </span>
                    )}
                    {/* 비밀번호 초기화 (입력값 있을 때만) */}
                    {password && (
                      <span
                        onClick={() => setPassword("")}
                        style={{
                          position: "absolute",
                          top: "45%",
                          right: "10px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          fontSize: "15px",
                        }}
                      >
                        <FaRegTimesCircle />
                      </span>
                    )}
                  </div>
                </Col>
              </FormGroup>
            </Form>
          </section>
          <div className="d-flex justify-content-center">
            <Button
              variant="outline-danger"
              className="me-2"
              onClick={handleDeleteButtonClick}
            >
              탈퇴
            </Button>
            <Button variant="outline-dark" onClick={() => navigate(-1)}>
              취소
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
