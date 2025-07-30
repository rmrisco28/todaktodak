import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

export function SaleDetail() {
  const [sale, setSale] = useState(null);
  const { seq } = useParams();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const [mainThumbnail, setMainThumbnail] = useState([]);
  const [quantity, setQuantity] = useState(1);

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
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  function handleCartAddButton() {
    // TODO [@minki] 장바구니 추가 기능 (+회원 체크, input 체크)
  }

  function handlePickAddButton() {
    // TODO [@minki] 찜하기 추가 기능 (+회원 체크)
  }

  return (
    <Container className="my-5">
      <Row className="gx-5">
        {/* 왼쪽 - 대표 썸네일 */}
        <Col md={6}>
          <Image
            src={sale.thumbnails[0]?.path}
            fluid
            rounded
            className="border"
          />
          <div className="d-flex gap-2 flex-wrap">
            {sale.thumbnails.map((image) => (
              <Image
                key={image.name}
                src={image.path}
                thumbnail
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border:
                    mainThumbnail === image.path
                      ? "2px solid #007bff"
                      : "1px solid #dee2e6",
                }}
                onClick={() => handleThumbnailClick(image.path)}
              />
            ))}
          </div>
        </Col>

        {/* 오른쪽 - 상품 정보 */}
        <Col md={6}>
          <h3 className="mb-3">{sale.title}</h3>
          <p className="text-muted">상품번호: {sale.seq}</p>
          <hr />
          <div className="mb-3">
            <strong>분류:</strong>
            {sale.category}
          </div>
          <div className="mb-3">
            {/* TODO [@minki] 판매건당가격 price 용어 변경(상품가격 중복방지) */}
            <strong>가격:</strong>{" "}
            <span className="text-danger fw-bold">
              {sale.price.toLocaleString()}원
            </span>
          </div>
          <div className="mb-3">
            {/* TODO [@minki] 배송업체 데이터 조회 */}
            <strong>배송비:</strong>{" "}
            {sale.deliveryFee > 0
              ? `${sale.deliveryFee.toLocaleString()}원`
              : "무료배송"}
          </div>

          <FormGroup className="mb-3" controlId="formQuantity">
            <FormLabel>수량</FormLabel>
            <FormControl
              type="number"
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
              style={{ maxWidth: "120px" }}
            />
          </FormGroup>

          {/* 액션 버튼 */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate(`/buy/${sale.seq}`)}
            >
              대여하기
            </Button>
            <Button variant="outline-primary" onClick={handleCartAddButton}>
              장바구니 담기
            </Button>
            <Button variant="outline-danger" onClick={handlePickAddButton}>
              찜하기
            </Button>
            <Button
              variant="warning"
              onClick={() => navigate(`/rental/${sale.seq}`)}
            >
              대여 연장 신청
            </Button>
          </div>

          {/* 관리자 버튼 (TODO [@minki]) */}
          <div className="d-flex gap-2">
            <Button variant="outline-danger" onClick={() => setModalShow(true)}>
              삭제
            </Button>
            <Button
              variant="outline-info"
              onClick={() => navigate(`/sale/modify/${sale.seq}`)}
            >
              수정
            </Button>
          </div>
        </Col>
      </Row>

      {/* 본문 내용 */}
      <Row className="mt-5">
        <Col>
          <h5>상품 설명</h5>
          <p style={{ whiteSpace: "pre-wrap" }}>{sale.content}</p>
        </Col>
      </Row>

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
