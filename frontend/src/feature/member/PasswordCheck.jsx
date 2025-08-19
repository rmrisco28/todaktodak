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
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import { FaRegTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export function PasswordCheck() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

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

  function handleCheckButtonClick() {
    if (!password.trim()) {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    axios
      .post("/api/member/passwordCheck", { password: password })
      .then((res) => {
        console.log(res.data);
        navigate("/member/myinfo/modify");
      })
      .catch((err) => {
        console.log(err);
        toast.error("비밀번호 확인에 실패하였습니다.", {
          position: "top-center",
        });
      })
      .finally(() => {});
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
        회원 정보 확인
      </h2>
      <h6 className="text-center">
        회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인해
        주세요.
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
              variant="outline-primary"
              className="me-2"
              onClick={handleCheckButtonClick}
            >
              확인
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
