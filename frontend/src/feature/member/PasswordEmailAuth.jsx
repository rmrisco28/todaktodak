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
        toast.success("이메일 인증이 완료되었습니다.", {
          position: "top-center",
        });

        setEmailVerified(true);
        setValids((prev) => ({ ...prev, email: "이메일 인증 완료" }));
        setErrors((prev) => ({ ...prev, email: null }));
      })
      .catch(() => {
        toast.error("이메일 인증 요청을 해주세요.", { position: "top-center" });
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
      <h2
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "10vh" }}
      >
        비밀번호 찾기
      </h2>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Col xs={12} sm="auto" style={{ width: "550px" }}>
          <section className="bg-gray-200 px-3 px-5 py-4 rounded mb-3">
            <h3 className="mb-4 mt-2 text-center">이메일 인증</h3>
            {/* 아이디 */}
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
                className={errors.memberId ? "is-invalid" : ""}
              />
              {errors.memberId && (
                <FormText className="text-danger">{errors.memberId}</FormText>
              )}
            </FormGroup>

            {/* 이메일 / 인증 요청 */}
            <FormGroup className="mb-3 mt-2" controlId="email">
              <FormLabel>이메일</FormLabel>
              <Row className="g-2 align-items-center">
                <Col xs={12} sm={8}>
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
                    readOnly={emailVerified}
                    className={errors.email ? "is-invalid" : ""}
                  />
                </Col>
                {/* 인증 요청 버튼 */}
                <Col xs={12} sm={4}>
                  <Button
                    variant="outline-dark"
                    className="w-100 mb-0"
                    onClick={handleRequestAuth}
                    disabled={isProcessing}
                  >
                    인증번호 요청
                  </Button>
                </Col>
              </Row>
              {errors.email && (
                <FormText className="text-danger">{errors.email}</FormText>
              )}
            </FormGroup>

            {/* 인증번호 입력 / 확인 */}
            <FormGroup className="mb-3" controlId="emailCode">
              <Row className="g-2 align-items-center">
                <Col xs={12} sm={8}>
                  <FormControl
                    placeholder="인증번호 입력"
                    autoComplete="off"
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                    disabled={emailVerified}
                    className={valids.email ? "is-valid" : ""}
                  />
                </Col>
                {/* 인증 확인 버튼 */}
                <Col xs={12} sm={4}>
                  <Button
                    variant="outline-success"
                    className="w-100 mb-0"
                    onClick={handleVerifyAuth}
                  >
                    인증 확인
                  </Button>
                </Col>
              </Row>
              {valids.email && (
                <FormText className="text-success">{valids.email}</FormText>
              )}
            </FormGroup>

            {/* 비밀번호 재설정 버튼 */}
            <div className="d-flex justify-content-between">
              <Button
                style={{ height: "60px", fontSize: "20px" }}
                variant="primary"
                className="w-100 mt-3"
                onClick={handleNextButtonClick}
              >
                비밀번호 재설정
              </Button>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
}
