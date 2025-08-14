import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { memberId, email } = location.state || {};

  const [modalShow, setModalShow] = useState(false);

  const [errors, setErrors] = useState({});

  // 유효성 검사 함수
  const validatePassword = (value) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~]).{8,}$/.test(value);

  function handleResetButtonClick() {
    const newErrors = {};

    if (!newPassword) {
      newErrors.newPassword = "비밀번호를 입력해주세요.";
    }
    if (newPassword !== newPassword2) {
      newErrors.newPassword2 = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (window.confirm("비밀번호를 재설정하시겠습니까?")) {
      axios
        .put(`/api/member/resetPassword`, {
          memberId,
          email,
          newPassword,
        })
        .then(() => {
          alert("비밀번호가 변경되었습니다.");
          navigate("/login");
        })
        .catch(() => {
          toast.error("비밀번호 변경 실패");
        })
        .finally(() => {});
    } else {
      toast.info("비밀번호 변경이 취소되었습니다.");
    }
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
        <Col xs={12} sm="auto" style={{ width: "500px" }}>
          <section className="bg-gray-200 px-3 px-sm-5 py-4 rounded mb-3">
            <h3 className="mb-4 mt-2 text-center">비밀번호 재설정</h3>
            <Form>
              {/* 비밀번호 입력 + 비밀번호 확인 입력을 가로로 정렬 */}
              <div className="d-flex flex-column" style={{ gap: "15px" }}>
                {/* 비밀번호 */}
                <div className="d-flex flex-column" style={{ gap: "5px" }}>
                  <FormLabel>변경할 비밀번호</FormLabel>
                  <FormControl
                    autoComplete="off"
                    type="password"
                    value={newPassword}
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
                    className={errors.newPassword ? "is-invalid" : ""}
                  />
                  {errors.newPassword && (
                    <FormText className="text-danger">
                      {errors.newPassword}
                    </FormText>
                  )}
                </div>

                {/* 비밀번호 확인 */}
                <div className="d-flex flex-column" style={{ gap: "5px" }}>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl
                    autoComplete="off"
                    type="password"
                    value={newPassword2}
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
                    className={errors.newPassword2 ? "is-invalid" : ""}
                  />
                  {errors.newPassword2 && (
                    <FormText className="text-danger">
                      {errors.newPassword2}
                    </FormText>
                  )}
                </div>
              </div>
            </Form>

            {/* 취소, 변경 버튼 가로 정렬 */}
            <div
              className="d-flex mt-4"
              style={{ gap: "10px", justifyContent: "center" }}
            >
              <Button variant="secondary" onClick={() => navigate("/login")}>
                취소
              </Button>
              <Button variant="primary" onClick={handleResetButtonClick}>
                변경
              </Button>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
}
