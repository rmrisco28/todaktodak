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

export function FindPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  // 유효성 검사 함수
  const validatePassword = (value) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~]).{8,}$/.test(value);

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
        <Row className="d-flex justify-content-center">
          <Col md="auto">
            <h3 className="mb-4 mt-4 text-center">비밀번호 변경</h3>
            <Form>
              {/* 비밀번호 */}
              <FormGroup controlId="newPassword">
                <FormLabel className="mt-2">새 비밀번호</FormLabel>
                <FormControl
                  autoComplete="off"
                  type="password"
                  value={newPassword}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewPassword(value);
                    if (value.trim() === "") {
                      setErrors((prev) => ({ ...prev, newPassword: null }));
                    } else if (!validatePassword(value)) {
                      setErrors((prev) => ({
                        ...prev,
                        newPassword:
                          "비밀번호는 8자 이상, 숫자/특수문자를 포함해야합니다.",
                      }));
                    } else {
                      setErrors((prev) => ({ ...prev, newPassword: null }));
                    }
                  }}
                />
                {errors.newPassword && (
                  <FormText className="text-danger">
                    {errors.newPassword}
                  </FormText>
                )}
              </FormGroup>
              {/* 비밀번호 확인*/}
              <FormGroup className="mb-5" controlId="newPassword2">
                <FormLabel className="mt-2">새 비밀번호 확인</FormLabel>
                <FormControl
                  autoComplete="off"
                  type="password"
                  value={newPassword2}
                  style={{ width: "300px" }}
                  onChange={(e) => {
                    setNewPassword2(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      newPassword2:
                        e.target.value !== newPassword
                          ? "비밀번호가 일치하지 않습니다."
                          : null,
                    }));
                  }}
                />
                {errors.newPassword2 && (
                  <FormText className="text-danger">
                    {errors.newPassword2}
                  </FormText>
                )}
              </FormGroup>
            </Form>
            {/* 취소, 변경 버튼*/}
            <div className="mt-4 d-flex justify-content-center">
              <Button
                variant="outline-secondary"
                className="me-3"
                onClick={() => navigate("/login")}
              >
                취소
              </Button>
              <Button variant="outline-primary">변경</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
