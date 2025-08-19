import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Image,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

export function SaleDetail() {
  const [sale, setSale] = useState(null);
  const { seq } = useParams();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const [mainThumbnail, setMainThumbnail] = useState([]);
  const [orderCount, setOrderCount] = useState(1);
  const [period, setPeriod] = useState(30);

  const { isAdmin } = useContext(AuthenticationContext);

  useEffect(() => {
    axios
      .get(`/api/sale/detail/${seq}`)
      .then((res) => {
        setSale(res.data);
      })
      .catch((err) => {
        toast("해당 상품이 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  if (!sale) {
    return <Spinner />;
  }

  function handleDeleteButtonClick() {
    axios
      .put(`/api/sale/${seq}`)
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate("/sale/list");
      })
      .catch((err) => {
        console.log("동작 오류");
        toast("상품이 삭제되지 않았습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }

  const handleThumbnailClick = (path) => setMainThumbnail(path);
  const handleOrderCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setOrderCount(isNaN(value) || value < 1 ? 1 : value);
  };

  function handleCartAddButtonClick() {
    // TODO [@minki] 장바구니 추가 기능 (+회원 체크, input 체크)
  }

  function handlePickAddButtonClick() {
    // TODO [@minki] 찜하기 추가 기능 (+회원 체크)
  }

  return (
    <Container className="my-3">
      <div className="container-fluid py-4" style={{ background: "#f8f9fa" }}>
        <Row className=" justify-content-center">
          <Col className="col-lg-10 col-xl-10">
            <div className="row g-4">
              {/* 왼쪽 - 상품 이미지 */}
              <div className="col-12 col-lg-6 ">
                <div
                  className="card border-0 shadow-sm "
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4">
                    {/* 메인 이미지 */}
                    <div
                      className="main-image-container mb-3"
                      style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <Image
                        src={sale.thumbnails[0]?.path}
                        className="w-100"
                        style={{
                          height: "400px",
                          objectFit: "cover",
                        }}
                        alt={sale.title}
                      />
                    </div>

                    {/* 썸네일 이미지들 */}
                    <div className="d-flex gap-2 flex-wrap">
                      {sale.thumbnails.map((image) => (
                        <div
                          key={image.name}
                          className="thumbnail-item"
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "8px",
                            overflow: "hidden",
                            cursor: "pointer",
                            border:
                              mainThumbnail === image.path
                                ? "3px solid #495057"
                                : "2px solid #dee2e6",
                            transition: "all 0.2s ease",
                          }}
                          onClick={() => handleThumbnailClick(image.path)}
                          onMouseEnter={(e) => {
                            if (mainThumbnail !== image.path) {
                              e.currentTarget.style.borderColor = "#6c757d";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (mainThumbnail !== image.path) {
                              e.currentTarget.style.borderColor = "#dee2e6";
                            }
                          }}
                        >
                          <img
                            src={image.path}
                            className="w-100 h-100"
                            style={{ objectFit: "cover" }}
                            alt={`${sale.title} thumbnail`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 오른쪽 - 상품 정보 */}
              <div className="col-12 col-lg-6">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4">
                    <h2 className="fw-bold mb-3" style={{ color: "#212529" }}>
                      {sale.title}
                    </h2>
                    <p
                      className="text-muted mb-3"
                      style={{ fontSize: "0.9rem" }}
                    >
                      상품번호: {sale.seq}
                    </p>

                    <hr className="my-4" />

                    <div className="mb-3">
                      <span className="fw-medium" style={{ color: "#495057" }}>
                        분류:
                      </span>
                      <span className="ms-2" style={{ color: "#212529" }}>
                        {sale.category}
                      </span>
                    </div>

                    <div className="mb-3">
                      <span className="fw-medium" style={{ color: "#495057" }}>
                        가격:
                      </span>
                      <span
                        className="ms-2 fw-bold"
                        style={{ color: "#212529", fontSize: "1.2rem" }}
                      >
                        {sale.salePrice.toLocaleString()}원
                      </span>
                    </div>

                    <div className="mb-4">
                      <span className="fw-medium" style={{ color: "#495057" }}>
                        배송비:
                      </span>
                      <span className="ms-2" style={{ color: "#212529" }}>
                        {sale.deliveryFee > 0
                          ? `${sale.deliveryFee.toLocaleString()}원`
                          : "무료배송"}
                      </span>
                    </div>

                    {/* 대여기간 선택 */}
                    <div className="mb-3">
                      <label
                        className="form-label fw-medium"
                        style={{ color: "#495057" }}
                      >
                        대여기간
                      </label>
                      <select
                        className="form-select bg-white"
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
                        onChange={(e) => setPeriod(e.target.value)}
                      >
                        <option value={30}>30일 대여</option>
                        <option value={90}>90일 대여</option>
                        <option value={180}>180일 대여</option>
                        <option value={360}>360일 대여</option>
                      </select>
                    </div>

                    {/* 주문수량 */}
                    <div className="mb-4">
                      <label
                        className="form-label fw-medium"
                        style={{ color: "#495057" }}
                      >
                        주문수량
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={orderCount}
                        onChange={handleOrderCountChange}
                        className="form-control bg-white"
                        style={{
                          borderRadius: "10px",
                          padding: "12px 16px",
                          fontSize: "0.95rem",
                          border: "2px solid #dee2e6",
                          transition: "all 0.3s ease",
                          maxWidth: "120px",
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
                      />
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      <button
                        className="btn btn-outline-success fw-bold px-7"
                        style={{
                          borderRadius: "10px",
                          padding: "12px 24px",
                          fontSize: "0.95rem",
                          borderWidth: "2px",
                        }}
                        onClick={() =>
                          navigate(
                            `/buy/${seq}?orderCount=${orderCount}&period=${period}`,
                          )
                        }
                      >
                        대여하기
                      </button>
                      <button
                        className="btn btn-outline-dark fw-medium"
                        style={{
                          borderRadius: "10px",
                          padding: "12px 20px",
                          fontSize: "0.9rem",
                          borderWidth: "2px",
                        }}
                        onClick={handleCartAddButtonClick}
                      >
                        장바구니
                      </button>
                      <button
                        className="btn btn-outline-danger fw-medium"
                        style={{
                          borderRadius: "10px",
                          padding: "12px 20px",
                          fontSize: "0.9rem",
                          borderWidth: "2px",
                        }}
                        onClick={handlePickAddButtonClick}
                      >
                        찜하기
                      </button>
                    </div>

                    <div className="d-flex gap-2 mb-2">
                      <button
                        className="btn btn-outline-warning fw-medium flex-grow-1"
                        style={{
                          borderRadius: "10px",
                          padding: "10px 16px",
                          fontSize: "0.9rem",
                          borderWidth: "2px",
                        }}
                        onClick={() => navigate(`/rental/list`)}
                      >
                        대여 연장 신청
                      </button>
                    </div>

                    {/* 관리자 버튼 */}
                    {isAdmin() && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-secondary fw-medium"
                          style={{
                            borderRadius: "10px",
                            padding: "8px 16px",
                            fontSize: "0.85rem",
                            borderWidth: "2px",
                          }}
                          onClick={() => setModalShow(true)}
                        >
                          삭제
                        </button>
                        <button
                          className="btn btn-outline-info fw-medium"
                          style={{
                            borderRadius: "10px",
                            padding: "8px 16px",
                            fontSize: "0.85rem",
                            borderWidth: "2px",
                          }}
                          onClick={() => navigate(`/sale/modify/${sale.seq}`)}
                        >
                          수정
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 상품 설명 섹션 */}
            <div className="row mt-4">
              <div className="col-12">
                <div
                  className="card border-0 shadow-sm"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4">
                    <h4 className="fw-bold mb-4" style={{ color: "#212529" }}>
                      상품 설명
                    </h4>
                    <p
                      style={{
                        whiteSpace: "pre-wrap",
                        color: "#495057",
                        lineHeight: "1.6",
                        fontSize: "0.95rem",
                      }}
                    >
                      {sale.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 상세 이미지 섹션 */}
            {sale.contentImages.length > 0 && (
              <div className="row mt-4">
                <div className="col-12">
                  <div
                    className="card border-0 shadow-sm"
                    style={{ borderRadius: "15px" }}
                  >
                    <div className="card-body p-4">
                      <h4 className="fw-bold mb-4" style={{ color: "#212529" }}>
                        상세 이미지
                      </h4>
                      <div className="d-flex flex-column gap-3">
                        {sale.contentImages.map((image) => (
                          <div
                            key={image.name}
                            style={{
                              borderRadius: "12px",
                              overflow: "hidden",
                              border: "1px solid #dee2e6",
                            }}
                          >
                            <img
                              src={image.path}
                              className="w-100"
                              style={{ display: "block" }}
                              alt="상품 상세 이미지"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>

      {/* 본문 이미지 */}
      {sale.contentImages.length > 0 && (
        <Row className="mt-4">
          <Col>
            <h5>상세 이미지</h5>
            <div className="d-flex flex-column gap-3">
              {sale.contentImages.map((image) => (
                <Image
                  key={image.name}
                  src={image.path}
                  fluid
                  className="border"
                />
              ))}
            </div>
          </Col>
        </Row>
      )}

      {/* 삭제 모달 */}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>상품 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>{sale.seq} 번 상품을 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
          <Button variant="danger" onClick={handleDeleteButtonClick}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
