import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function RentalRenew() {
  const [modalShow, setModalShow] = useState(false);
  const [rentalData, setRentalData] = useState(null);
  const [period, setPeriod] = useState(null);
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { seq } = useParams();

  useEffect(() => {
    axios
      .get(`/api/rental/renew/${seq}`, {})
      .then((res) => {
        console.log(res.data);
        setRentalData(res.data);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("always");
      });
  }, []);

  if (!rentalData) return <div>로딩 중...</div>;

  function handleReturnButtonClick() {
    if (period === null) {
      alert("기간을 선택해주세요.");
    } else {
      console.log(rentalData.startDttm);
      console.log(rentalData.endDttm);
      console.log(period);
      axios
        .get(`/api/rental/renew/finish/${seq}?period=${period}`, {})
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          navigate("/rental/list");
        })
        .catch((err) => {
          console.log("no");
        })
        .finally(() => {
          console.log("always");
        });
    }
  }

  const formatDate = (dateStr) => {
    // 'yyMMdd' 형식의 문자열을 Date 객체로 변환
    const year = `20${dateStr.slice(0, 2)}`; // 'yy' -> '20yy'로 변환
    const month = dateStr.slice(2, 4); // 'MM'
    const day = dateStr.slice(4, 6); // 'dd'
    const formattedDate = new Date(`${year}-${month}-${day}`);

    return `${formattedDate.getFullYear().toString().slice(2)}-${(formattedDate.getMonth() + 1).toString().padStart(2, "0")}-${formattedDate.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/*<>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
           대여 상단 제목
          <h2
            className="mb-4"
            style={{
              // textAlign: "center",
              cursor: "pointer",
              width: "fit-content",
              transition: "color 0.2s",
              color: "#000",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#007bff")}
            onMouseLeave={(e) => (e.target.style.color = "#000")}
            onClick={() => navigate("/rental/list")}
          >
            내 렌탈 현황(연장)
          </h2>

          <div>
            <FormGroup className="mb-3">
              <FormLabel>제품명</FormLabel>
              <FormControl value={rentalData.productNoName} disabled />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>제품 대여 개수</FormLabel>
              <FormControl value={rentalData.orderNoOrderCount} disabled />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>남은 대여 기간</FormLabel>
              <FormControl value={formatDate(rentalData.endDttm)} disabled />
            </FormGroup>
          </div>

          <FormGroup className="mb-3">
            <FormLabel>추가 연장 기간</FormLabel>
            <FormSelect
              className="mb-3"
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value={null}>연장기간 선택</option>
              <option value={10}>10일 연장</option>
              <option value={30}>30일 연장</option>
              <option value={90}>90일 연장</option>
              <option value={180}>180일 연장</option>
            </FormSelect>
          </FormGroup>

          <div>
            <FormGroup className="mb-3">
              <FormLabel>주문자 성명</FormLabel>
              <FormControl value={rentalData.orderNoName} disabled />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>연락처</FormLabel>

              <FormControl value={rentalData.orderNoPhone} disabled />
            </FormGroup>
          </div>
              <div className="mb-3">
            <FormGroup>
              <FormLabel>남기실 메모</FormLabel>
              <FormControl
                type="textarea"
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </FormGroup>
          </div>
          <div className="d-flex justify-content-center gap-4">
            <Button
              variant="primary"
              style={{ width: "150px", marginRight: "10px" }}
              onClick={handleReturnButtonClick}
            >
              연장하기
            </Button>
            <Button
              variant="warning"
              style={{ width: "150px", marginLeft: "10px" }}
              onClick={() => {
                setModalShow(true);
              }}
            >
              취소
            </Button>
          </div>
        </Col>

         취소 모달
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>연장 취소 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            연장 신청하지 않고 이동하시겠습니까?
            <br />
            작성하신 내용은 삭제됩니다.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              뒤로
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                navigate("/rental/list");
              }}
            >
              목록으로
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <hr />
      <h3>2차</h3>
      </>*/}

      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {/* 상단 제목 */}
            <div className="mb-5">
              <h2
                className="fw-bold mb-2"
                style={{
                  color: "#2d3748",
                  fontSize: "2rem",
                  cursor: "pointer",
                  width: "fit-content",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#4299e1")}
                onMouseLeave={(e) => (e.target.style.color = "#2d3748")}
                onClick={() => navigate("/rental/list")}
              >
                내 렌탈 현황(연장)
              </h2>
              <p className="text-muted mb-0">
                대여 기간을 연장하고 싶은 제품 정보를 확인하세요.
              </p>
            </div>

            {/* 메인 카드 */}
            <div
              className="card border-0 shadow-sm mb-4"
              style={{ borderRadius: "16px" }}
            >
              <div className="card-body p-4">
                {/* 제품 정보 섹션 */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: "#4a5568" }}>
                    제품 정보
                  </h5>

                  <div className="mb-3">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#2d3748" }}
                    >
                      제품명
                    </label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        backgroundColor: "#f8f9fa",
                      }}
                      value={rentalData.productNoName}
                      disabled
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label fw-medium"
                        style={{ color: "#2d3748" }}
                      >
                        제품 대여 개수
                      </label>
                      <input
                        type="text"
                        className="form-control border-0"
                        style={{
                          borderRadius: "10px",
                          padding: "12px 16px",
                          fontSize: "0.95rem",
                          backgroundColor: "#f8f9fa",
                        }}
                        value={rentalData.orderNoOrderCount}
                        disabled
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label fw-medium"
                        style={{ color: "#2d3748" }}
                      >
                        남은 대여 기간
                      </label>
                      <input
                        type="text"
                        className="form-control border-0"
                        style={{
                          borderRadius: "10px",
                          padding: "12px 16px",
                          fontSize: "0.95rem",
                          backgroundColor: "#f8f9fa",
                        }}
                        value={formatDate(rentalData.endDttm)}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <hr style={{ opacity: 0.1 }} />

                {/* 연장 정보 섹션 */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: "#4a5568" }}>
                    연장 정보
                  </h5>

                  <div className="mb-3">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#2d3748" }}
                    >
                      추가 연장 기간
                    </label>
                    <select
                      className="form-select bg-white"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        border: "2px solid #e2e8f0",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#4299e1";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(66, 153, 225, 0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                      }}
                      onChange={(e) => setPeriod(e.target.value)}
                    >
                      <option value={null}>연장기간 선택</option>
                      <option value={10}>10일 연장</option>
                      <option value={30}>30일 연장</option>
                      <option value={90}>90일 연장</option>
                      <option value={180}>180일 연장</option>
                    </select>
                  </div>
                </div>

                <hr style={{ opacity: 0.1 }} />

                {/* 주문자 정보 섹션 */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: "#4a5568" }}>
                    주문자 정보
                  </h5>

                  <div className="mb-3">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#2d3748" }}
                    >
                      주문자 성명
                    </label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        backgroundColor: "#f8f9fa",
                      }}
                      value={rentalData.orderNoName}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#2d3748" }}
                    >
                      연락처
                    </label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        backgroundColor: "#f8f9fa",
                      }}
                      value={rentalData.orderNoPhone}
                      disabled
                    />
                  </div>
                </div>

                {/* 버튼 섹션 */}
                <div className="d-flex justify-content-center gap-3 mt-5">
                  <button
                    className="btn px-5 py-3 fw-medium"
                    style={{
                      backgroundColor: "#48bb78",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#38a169";
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#48bb78";
                      e.target.style.transform = "translateY(0)";
                    }}
                    onClick={handleReturnButtonClick}
                  >
                    <i className="fas fa-clock me-2"></i>
                    연장하기
                  </button>

                  <button
                    className="btn px-5 py-3 fw-medium"
                    style={{
                      backgroundColor: "transparent",
                      color: "#718096",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#f7fafc";
                      e.target.style.borderColor = "#cbd5e0";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderColor = "#e2e8f0";
                    }}
                    onClick={() => setModalShow(true)}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    취소
                  </button>
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
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{ borderRadius: "16px", border: "none" }}
            >
              <div className="modal-header border-0 pb-0">
                <h5
                  className="modal-title fw-bold"
                  style={{ color: "#2d3748" }}
                >
                  연장 취소 확인
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalShow(false)}
                ></button>
              </div>
              <div className="modal-body pt-0">
                <p className="mb-0" style={{ color: "#4a5568" }}>
                  연장 신청하지 않고 이동하시겠습니까?
                  <br />
                  작성하신 내용은 삭제됩니다.
                </p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  className="btn px-4 py-2"
                  style={{
                    backgroundColor: "transparent",
                    color: "#718096",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                  }}
                  onClick={() => setModalShow(false)}
                >
                  뒤로
                </button>
                <button
                  className="btn px-4 py-2"
                  style={{
                    backgroundColor: "#f56565",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                  }}
                  onClick={() => navigate("/rental/list")}
                >
                  목록으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
