import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FcOk } from "react-icons/fc";
import { FaRegCheckCircle } from "react-icons/fa";

export function BuyAdd() {
  let navigate = useNavigate();

  return (
    <>
      <div
        className="min-vh-100 d-flex align-items-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              {/* 성공 메시지 */}
              <div className="text-center mb-5">
                <FaRegCheckCircle
                  style={{ fontSize: "8rem" }}
                  className="mb-2"
                />

                <h2 className="mb-3 fw-bold" style={{ color: "#2d3748" }}>
                  결제 완료
                </h2>
                <p
                  className="mb-0"
                  style={{ fontSize: "1.1rem", color: "#718096" }}
                >
                  정상적으로 결제 완료되었습니다.
                </p>
              </div>

              {/* 버튼들 */}
              <div className="row g-3 mb-4">
                {/* 첫 번째 줄 - 2개 버튼 */}
                <div className="col-12 col-md-6">
                  <button
                    className="btn w-100 py-3 fw-medium d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#2d3748",
                      color: "white",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#1a202c";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#2d3748";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                    }}
                    onClick={() => navigate("/sale/list")}
                  >
                    <i className="fas fa-shopping-bag"></i>
                    <span>추가 렌탈 제품 확인하기</span>
                  </button>
                </div>

                <div className="col-12 col-md-6">
                  <button
                    className="btn w-100 py-3 fw-medium d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#4a5568",
                      color: "white",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2d3748";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#4a5568";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                    }}
                    onClick={() => navigate("/order/list")}
                  >
                    <i className="fas fa-clipboard-list"></i>
                    <span>주문 조회 현황</span>
                  </button>
                </div>

                {/* 두 번째 줄 - 1개 버튼 */}
                <div className="col-12 col-md-8 mx-auto mt-4">
                  <button
                    className="btn w-100 py-3 fw-medium d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#718096",
                      color: "white",
                      borderRadius: "12px",
                      border: "none",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#4a5568";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 15px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#718096";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                    }}
                    onClick={() => navigate("/rental/list")}
                  >
                    <i className="fas fa-calendar-check"></i>
                    <span>대여 현황 확인하기</span>
                  </button>
                </div>
              </div>

              {/* 구분선 */}
              <hr style={{ opacity: 0.2, margin: "2rem 0" }} />

              {/* 홈 버튼 */}
              <div className="row">
                <div className="col-12 col-md-6 mx-auto">
                  <button
                    className="btn w-100 py-3 fw-medium"
                    style={{
                      backgroundColor: "transparent",
                      color: "#6b7280",
                      borderRadius: "12px",
                      border: "2px solid #e5e7eb",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#f9fafb";
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.color = "#374151";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.color = "#6b7280";
                    }}
                    onClick={() => navigate("/")}
                  >
                    <i className="fas fa-home me-2"></i>
                    홈으로
                  </button>
                </div>
              </div>

              {/* 추가 정보 */}
              <div className="text-center mt-5">
                <p className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>
                  <i className="fas fa-shield-alt me-2"></i>
                  안전한 결제가 완료되었습니다
                </p>
                <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                  주문 관련 문의사항이 있으시면 고객센터로 연락해주세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
