import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export function ContactModify() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [useYn, setUseYn] = useState(true);
  const { seq } = useParams();
  const [isProcessing, setIsProcessing] = useState();

  const [modalShow, setModalShow] = useState(false);

  let navigate = useNavigate();
  const isAdmin =
    new URLSearchParams(location.search).get("isAdmin") === "true";

  let validate = true;
  if (title.trim() === "" || content.trim() === "" || name.trim() === "") {
    validate = false;
  }

  useEffect(() => {
    axios
      .get(`/api/contact/detail/${seq}`, {})
      .then((res) => {
        console.log("ok");
        const data = res.data;
        setTitle(data.title);
        setContent(data.content);
        setName(data.name);
        setUseYn(data.useYn);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, [seq]);

  let validateTitle = true;
  let validateContent = true;
  let validateName = true;
  if (title.trim() === "") {
    validateTitle = false;
  } else if (content.trim() === "") {
    validateContent = false;
  } else if (name.trim() === "") {
    validateName = false;
  }

  function handleSaveButtonClick() {
    if (!validateTitle) {
      alert("제목을 입력해주세요.");
    } else if (!validateContent) {
      alert("내용을 입력해주세요.");
    } else if (!validateName) {
      alert("이름을 입력해주세요.");
    } else {
      axios
        .put(`/api/contact/modify/${seq}`, {
          seq,
          title,
          content,
          name,
          useYn,
        })
        .then((res) => {
          console.log("ok");
          navigate(`/contact/list${isAdmin ? "?isAdmin=true" : ""}`, {
            replace: true,
          });
          alert(res.data.message);
        })
        .catch((err) => {
          console.log("no");
        })
        .finally(() => {
          console.log("finally");
        });
    }
  }

  return (
    <>
      
      <div style={{ background: "#f8f9fa" }}>
        <div className="container py-3">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div
                className="card border-0 shadow-sm"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4" style={{ color: "#212529" }}>
                    문의 내용 수정
                  </h3>

                  {/* 관리자 전용 체크박스 */}
                  {isAdmin && (
                    <div className="mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={useYn}
                          onChange={(e) => setUseYn(e.target.checked)}
                          style={{
                            transform: "scale(1.2)",
                            appearance: "auto",
                            WebkitAppearance: "auto",
                            MozAppearance: "auto",

                          }}
                        />
                        <label
                          className="form-check-label fw-medium"
                          style={{ color: "#343a40", marginLeft: "8px" }}
                        >
                          {useYn ? "게시물 보임" : "게시물 숨김"}
                        </label>
                      </div>
                    </div>
                  )}

                  {/* 제목 입력 */}
                  <div className="mb-4">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#343a40" }}
                    >
                      제목
                    </label>
                    <input
                      type="text"
                      className="form-control bg-white"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        border: "2px solid #dee2e6",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#495057";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(73, 80, 87, 0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#dee2e6";
                        e.target.style.boxShadow = "none";
                      }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  {/* 내용 입력 */}
                  <div className="mb-4">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#343a40" }}
                    >
                      내용
                    </label>
                    <textarea
                      className="form-control bg-white"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        border: "2px solid #dee2e6",
                        transition: "all 0.3s ease",
                        minHeight: "200px",
                        resize: "vertical",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#495057";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(73, 80, 87, 0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#dee2e6";
                        e.target.style.boxShadow = "none";
                      }}
                      rows={6}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
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
                      value={name}
                      disabled
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* 버튼 영역 */}
                  <div className="d-flex gap-2 pt-3">
                    <button
                      className="btn btn-outline-success px-4 py-2 fw-medium"
                      style={{
                        borderRadius: "10px",
                        fontSize: "0.95rem",
                        borderWidth: "2px",
                        transition: "all 0.3s ease",
                        opacity: !validate || isProcessing ? 0.6 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (validate && !isProcessing) {
                          e.target.style.transform = "translateY(-1px)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                      }}
                      onClick={handleSaveButtonClick}
                      disabled={isProcessing || !validate}
                    >
                      {isProcessing && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          style={{}}
                        ></span>
                      )}
                      {isProcessing ? "저장 중..." : "저장"}
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
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 취소 모달 */}
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
                  저장 여부 확인
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalShow(false)}
                ></button>
              </div>
              <div className="modal-body pt-0" style={{ color: "#495057" }}>
                저장하지않고 이동하시겠습니까?
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
                  onClick={() => navigate(`/contact/detail/${seq}`)}
                >
                  게시판으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
