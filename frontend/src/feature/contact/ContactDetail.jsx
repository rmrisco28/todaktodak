import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

export function ContactDetail() {
  const [contact, setContact] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [reply, setReply] = useState("");
  const { seq } = useParams();

  let navigate = useNavigate();
  // const isAdmin =
  //   new URLSearchParams(location.search).get("isAdmin") === "true";

  const { user, hasAccess, isAdmin } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user === null) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    axios
      .get(`/api/contact/detail/${seq}`, {})
      .then((res) => {
        console.log("ok");
        const data = res.data;
        setReply(data.reply);
        setContact(data);
        console.log("user.memberId:", user.memberId, typeof user.memberId);
        console.log(
          "res.data.memberId:",
          res.data.memberNoMemberId,
          typeof res.data.memberNoMemberId,
        );

        if (!hasAccess(res.data.memberNoMemberId) && !isAdmin()) {
          alert("본인의 게시물에만 접근 할 수 있습니다.");
          navigate("/contact/list");
          return;
        }
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, [seq]);

  if (!contact) return <div>로딩 중...</div>;

  function handleSaveButtonClick() {
    axios
      .put(`/api/contact/reply/${seq}?isAdmin=true`, { reply })
      .then((res) => {
        console.log("ok");
        alert(res.data.message);
        navigate(`/contact/list/?isAdmin=true`, { replace: true });
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }

  return (
    <>
      <div className="container-fluid py-3" style={{ background: "#f8f9fa" }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div
              className="card border-0 shadow-sm"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-4">
                {/* 헤더 */}
                <div className="d-flex align-items-center mb-4">
                  <h3
                    className="fw-bold mb-0"
                    style={{
                      color: "#212529",
                      cursor: "pointer",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#495057")}
                    onMouseLeave={(e) => (e.target.style.color = "#212529")}
                    onClick={() => navigate("/contact/list")}
                  >
                    문의게시판
                  </h3>
                  <i
                    className="fas fa-chevron-right mx-3"
                    style={{ color: "#6c757d", fontSize: "0.9rem" }}
                  ></i>
                  <span style={{ color: "#6c757d" }}>{seq}번 게시물</span>
                </div>

                {/* 제목 */}
                <div className="mb-4">
                  <label
                    className="form-label fw-medium"
                    style={{ color: "#343a40" }}
                  >
                    제목
                  </label>
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{
                      borderRadius: "10px",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      backgroundColor: "#f1f1f1",
                    }}
                    value={contact.title}
                    readOnly
                  />
                </div>

                {/* 내용 */}
                <div className="mb-4">
                  <label
                    className="form-label fw-medium"
                    style={{ color: "#343a40" }}
                  >
                    내용
                  </label>
                  <textarea
                    className="form-control border-0"
                    style={{
                      borderRadius: "10px",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      backgroundColor: "#f1f1f1",
                      minHeight: "200px",
                      resize: "none",
                    }}
                    rows={6}
                    value={contact.content}
                    readOnly
                  />
                </div>

                {/* 작성자 */}
                <div className="mb-4">
                  <label
                    className="form-label fw-medium"
                    style={{ color: "#343a40" }}
                  >
                    작성자
                  </label>
                  <input
                    type="text"
                    className="form-control border-0"
                    style={{
                      borderRadius: "10px",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      backgroundColor: "#f1f1f1",
                    }}
                    value={contact.name}
                    readOnly
                  />
                </div>

                {/* 액션 버튼들 */}
                <div className="d-flex gap-2 mb-4">
                  <button
                    className="btn btn-outline-secondary px-4 py-2 fw-medium"
                    style={{
                      borderRadius: "10px",
                      fontSize: "0.95rem",
                      borderWidth: "2px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                    }}
                    onClick={() =>
                      navigate(
                        `/contact/list${isAdmin() ? "?isAdmin=true" : ""}`,
                      )
                    }
                  >
                    목록
                  </button>

                  <button
                    className="btn btn-outline-danger px-4 py-2 fw-medium"
                    style={{
                      borderRadius: "10px",
                      fontSize: "0.95rem",
                      borderWidth: "2px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                    }}
                    onClick={() => setModalShow(true)}
                  >
                    삭제
                  </button>

                  <button
                    className="btn btn-outline-warning px-4 py-2 fw-medium"
                    style={{
                      borderRadius: "10px",
                      fontSize: "0.95rem",
                      borderWidth: "2px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                    }}
                    onClick={() =>
                      navigate(
                        `/contact/modify/${seq}${isAdmin() ? "?isAdmin=true" : ""}`,
                      )
                    }
                  >
                    수정
                  </button>
                </div>

                {/* 구분선 */}
                <hr style={{ margin: "2rem 0", border: "1px solid #dee2e6" }} />

                {/* 관리자 답변 섹션 */}
                <div className="mb-4">
                  <label
                    className="form-label fw-medium"
                    style={{ color: "#343a40" }}
                  >
                    문의 답변
                  </label>
                  <div
                    className="mb-3"
                    style={{
                      color: "#6c757d",
                      fontSize: "0.85rem",
                      backgroundColor: "#e3f2fd",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      border: "1px solid #bbdefb",
                    }}
                  >
                    <i className="fas fa-info-circle me-2"></i>
                    답변이 완료될 경우, 자동으로 게시판 목록의 답변 상태가
                    변경됩니다.
                  </div>
                  <textarea
                    className={`form-control ${isAdmin() ? "bg-white" : "border-0"}`}
                    style={{
                      borderRadius: "10px",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      minHeight: "150px",
                      resize: "vertical",
                      backgroundColor: isAdmin() ? "white" : "#f1f1f1",
                      border: isAdmin() ? "2px solid #dee2e6" : "none",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={
                      isAdmin()
                        ? (e) => {
                            e.target.style.borderColor = "#495057";
                            e.target.style.boxShadow =
                              "0 0 0 0.2rem rgba(73, 80, 87, 0.15)";
                          }
                        : undefined
                    }
                    onBlur={
                      isAdmin()
                        ? (e) => {
                            e.target.style.borderColor = "#dee2e6";
                            e.target.style.boxShadow = "none";
                          }
                        : undefined
                    }
                    rows={6}
                    value={reply}
                    readOnly={!isAdmin()}
                    placeholder={isAdmin() ? "답변을 입력해주세요." : ""}
                    onChange={(e) => setReply(e.target.value)}
                  />
                </div>

                {/* 관리자 전용 답변 저장 */}
                {isAdmin() && (
                  <div>
                    <div
                      className="mb-3"
                      style={{
                        color: "#6c757d",
                        fontSize: "0.8rem",
                        backgroundColor: "#fff3cd",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ffeaa7",
                      }}
                    >
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      답변 완료 상태를 변경하기 원하시는 경우, "아직 답변이
                      없습니다."로 수정 후 저장하시기 바랍니다.
                    </div>
                    <button
                      className="btn px-4 py-2 fw-medium"
                      style={{
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "0.95rem",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#218838";
                        e.target.style.transform = "translateY(-1px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#28a745";
                        e.target.style.transform = "translateY(0)";
                      }}
                      onClick={handleSaveButtonClick}
                      title="관리자에게만 보이게 할 예정"
                    >
                      <i className="fas fa-save me-2"></i>
                      답변저장
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 삭제 모달 */}
        <div
          className={`modal fade ${modalShow ? "show d-block" : ""}`}
          style={{
            backgroundColor: modalShow ? "rgba(0,0,0,0.5)" : "transparent",
          }}
          onClick={() => setModalShow(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content border-0"
              style={{ borderRadius: "15px" }}
            >
              <div className="modal-header border-0 pb-2">
                <h5
                  className="modal-title fw-bold"
                  style={{ color: "#212529" }}
                >
                  삭제 여부 확인
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalShow(false)}
                ></button>
              </div>
              <div className="modal-body pt-0" style={{ color: "#495057" }}>
                정말 삭제하시겠습니까?
              </div>
              <div className="modal-footer border-0 pt-2">
                <button
                  className="btn btn-outline-secondary px-4"
                  style={{ borderRadius: "8px", fontWeight: "500" }}
                  onClick={() => setModalShow(false)}
                >
                  뒤로
                </button>
                <button
                  className="btn btn-danger px-4"
                  style={{ borderRadius: "8px", fontWeight: "500" }}
                  onClick={() => {
                    axios
                      .delete(`/api/contact/${seq}`)
                      .then((res) => {
                        console.log("ok");
                        alert(res.data.message);
                        navigate("/contact/list", { replace: true });
                      })
                      .catch((err) => {
                        console.log("no");
                      })
                      .finally(() => {
                        console.log("finally");
                      });
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
