import { useState } from "react";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router";

export function EmailAuth() {
  const [memberId, setMemberId] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const navigate = useNavigate();

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
          height: "400px",
          marginTop: "5rem",
        }}
      >
        <Row className="d-flex justify-content-center ">
          <Col md="auto">
            <h3 className="mb-4 mt-3 text-center">이메일 인증</h3>
            {/* 아이디 */}
            <div>
              <FormGroup className="mb-3 mt-5">
                <FormControl
                  style={{ width: "350px" }}
                  placeholder="아이디를 입력하세요."
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                />
              </FormGroup>
            </div>
            {/* 이메일 + 인증 버튼 */}
            <div>
              <FormGroup className="mb-3">
                <div className="d-flex gap-3">
                  <FormControl
                    placeholder="이메일을 입력하세요."
                    autoComplete="off"
                    style={{ width: "240px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* 인증 요청 버튼 */}
                  <Button variant="outline-danger">인증 요청</Button>
                </div>
              </FormGroup>
            </div>
            {/* 인증 번호 + 확인 버튼*/}
            <div>
              <FormGroup className="mb-3">
                <div className="d-flex gap-3">
                  <FormControl
                    placeholder="인증번호"
                    autoComplete="off"
                    style={{ width: "240px" }}
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                  />
                  {/* 확인 버튼 */}
                  <Button variant="outline-dark">확인</Button>
                </div>
              </FormGroup>
            </div>
            <div className="d-flex justify-content-between">
              <Button
                style={{ height: "60px", fontSize: "20px" }}
                variant="outline-primary"
                className="w-100 mt-3"
                onClick={() => navigate("/member/find_password")}
              >
                다음
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
