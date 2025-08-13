import { useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export function PasswordEmailAuth() {
  const [memberId, setMemberId] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // 이메일 인증 상태
  const [emailSent, setEmailSent] = useState(false); // 인증번호 발송 여부
  const [emailCode, setEmailCode] = useState(""); // 입력한 인증번호
  const [emailVerified, setEmailVerified] = useState(false); // 인증 완료 여부

  const [errors, setErrors] = useState({});
  const [valids, setValids] = useState({});

  // 이메일
  const validateEmail = (value) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  // 인증 요청
  function handleRequestAuth() {
    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: "올바른 이메일을 입력하세요." }));
      return;
    }
    setIsProcessing(true);

    axios
      .post("/api/member/findPassword/authRequest", { memberId, email })
      .then(() => {
        toast.success("인증번호가 발송되었습니다.");
        setEmailSent(true);
      })
      .catch(() => {
        toast.error("이메일 발송에 실패했습니다.");
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  // 인증 확인
  function handleVerifyAuth() {
    axios
      .post("/api/member/findPassword/verifyAuth", { email, code: emailCode })
      .then(() => {
        toast.success("이메일 인증이 완료되었습니다.");
        setEmailVerified(true);
        setValids((prev) => ({ ...prev, email: "이메일 인증 완료" }));
        setErrors((prev) => ({ ...prev, email: null }));
      })
      .catch(() => {
        toast.error("이메일 인증 요청을 해주세요.");
      })
      .finally(() => {});
  }

  function handleNextButtonClick() {
    const newErrors = {};

    if (!memberId) {
      newErrors.memberId = "아이디를 입력해주세요.";
    }
    if (!emailVerified) {
      newErrors.email = "이메일 인증을 완료해주세요.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    navigate("/member/resetPassword", { state: { memberId, email } });
  }

  return (
    <div>
      <h3 className="mt-5 d-flex justify-content-center">비밀번호 찾기</h3>
      <div
        style={{
          border: "solid #ccc",
          borderRadius: "10px",
          margin: "auto",
          padding: "1rem",
          width: "500px",
          marginTop: "5rem",
        }}
      >
        <Row className="d-flex justify-content-center ">
          <Col md="auto">
            <h3 className="mb-2 mt-2 text-center">이메일 인증</h3>
            {/* 아이디 */}
            <div>
              <FormGroup className="mt-3">
                <FormLabel>아이디</FormLabel>
                <FormControl
                  placeholder="아이디를 입력하세요."
                  value={memberId}
                  onChange={(e) => {
                    setMemberId(e.target.value);
                    setErrors((prev) => ({ ...prev, memberId: null }));
                  }}
                  readOnly={emailVerified}
                />
              </FormGroup>
            </div>
            {errors.memberId && (
              <FormText className="text-danger">{errors.memberId}</FormText>
            )}

            {/* 이메일 */}
            <div>
              <FormGroup className="mb-3 mt-2" controlId="email">
                <FormLabel>이메일</FormLabel>
                <div className="d-flex gap-2">
                  <FormControl
                    placeholder="example@example.com"
                    autoComplete="off"
                    type="email"
                    style={{ width: "240px" }}
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
                    readOnly={emailVerified} // 인증 완료되면 수정 불가
                  />
                  {/* 인증 요청 버튼*/}
                  <Button
                    className="mb-0"
                    variant="outline-secondary"
                    onClick={handleRequestAuth}
                    disabled={isProcessing}
                  >
                    인증번호 요청
                  </Button>
                </div>
                {errors.email && (
                  <FormText className="text-danger">{errors.email}</FormText>
                )}
              </FormGroup>
              {/* 인증번호 입력 */}
              <FormGroup className="mb-3" controlId="emailCode">
                <div className="d-flex gap-2">
                  <FormControl
                    autoComplete="off"
                    placeholder="인증번호 입력"
                    style={{ width: "240px" }}
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                    disabled={emailVerified}
                    className="me-4"
                  />
                  {/* 인증 확인 버튼*/}
                  <Button
                    className="mb-0"
                    variant="outline-success"
                    onClick={handleVerifyAuth}
                  >
                    인증 확인
                  </Button>
                </div>
                {valids.email && (
                  <FormText className="text-success">{valids.email}</FormText>
                )}
              </FormGroup>
            </div>
            <div className="d-flex justify-content-between">
              <Button
                style={{ height: "60px", fontSize: "20px" }}
                variant="secondary"
                className="w-100 mt-3"
                onClick={handleNextButtonClick}
                disabled={!emailVerified}
              >
                비밀번호 재설정
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
