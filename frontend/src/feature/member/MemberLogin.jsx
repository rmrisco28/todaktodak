import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";
import { FaRegTimesCircle, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

import "../../css/Checkbox.css";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import { useLocation } from "react-router-dom";

export function MemberLogin() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [saveId, setSaveId] = useState(false);

  // step2. Use the context (토큰 인증 context 호출)
  const { login } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const savedId = localStorage.getItem("savedMemberId");
    if (savedId) {
      setMemberId(savedId);
      setSaveId(true);
    }
  }, []);

  function handleLogInButtonClick() {
    const newErrors = {};

    if (!memberId) {
      newErrors.memberId = "아이디를 입력해주세요.";
    }
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    axios
      .post(`/api/member/login`, {
        memberId: memberId,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        // TODO [@MINKI] 중복 호출 삭제
        // login(token);

        if (saveId) {
          localStorage.setItem("savedMemberId", memberId);
        } else {
          localStorage.removeItem("savedMemberId");
        }

        // [수정] login 함수의 Promise가 완료된 후에 navigate를 실행
        login(token).then(() => {
          // [수정] 쿼리 파라미터 대신 location.state에서 이전 경로를 가져옵니다.
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        });

        toast.success("로그인 되었습니다.", { position: "top-center" });
        // 중복 호출
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);

        setPassword("");

        setErrors({ password: "아이디 또는 비밀번호가 올바르지 않습니다." });
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
    <Row
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <Col xs={12} sm="auto" style={{ width: "500px" }}>
        <h2 className="d-flex justify-content-center mb-4">Login</h2>
        <section className="bg-gray-200 px-3 px-5 py-4 rounded mb-3">
          {/* 아이디 */}
          <Form onSubmit={handleFormSubmit}>
            <div>
              <FormGroup className="mb-3" controlId="memberId">
                <FormLabel>아이디</FormLabel>
                <div style={{ position: "relative" }}>
                  <FormControl
                    value={memberId}
                    onChange={(e) => {
                      setMemberId(e.target.value);
                      setErrors((prev) => ({ ...prev, memberId: null }));
                    }}
                    style={{
                      width: "100%",
                    }}
                    className={errors.memberId ? "is-invalid" : ""}
                  />
                  {errors.memberId && (
                    <div className="invalid-feedback">{errors.memberId}</div>
                  )}
                  {/* 아이디 초기화 (입력값 있을 때만) */}
                  {memberId && (
                    <span
                      onClick={() => setMemberId("")}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: null }));
                  }}
                  style={{ paddingRight: "60px" }}
                  className={errors.password ? "is-invalid" : ""}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}

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
            </FormGroup>
            {/* 아이디 저장 체크박스 추가 (로그인 버튼 위) */}
            <div className="mb-2">
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={saveId}
                  onChange={(e) => setSaveId(e.target.checked)}
                />
                <span className="checkmark mb-1"></span>
                아이디 저장
              </label>
            </div>
            {/* 로그인 버튼 / 찾기, 가입 옵션 */}
            <div className="d-flex justify-content-between">
              <Button type="submit" className="w-100 mb-4">
                로그인
              </Button>
            </div>
          </Form>
        </section>
        <div className="text-center">
          <Link
            to="/member/password/email_auth"
            className="mx-2 text-decoration-none"
          >
            비밀번호찾기
          </Link>
          <span>|</span>
          <Link to="/signup" className="mx-2 text-decoration-none">
            회원가입
          </Link>
        </div>
      </Col>
    </Row>
  );
}
