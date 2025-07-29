import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Button,
  Col,
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

  function handleCartAddButton() {
    //   TODO 장바구니 추가 기능 (+회원 체크, input 체크)
  }

  function handlePickAddButton() {
    // TODO 찜하기 추가 기능 (+회원 체크)
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <div className="d-flex justify-content-between">
          <h2 className="mb-4">{sale.seq} 번 상품</h2>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formCategory">
            <FormLabel>분류</FormLabel>
            <FormControl value={sale.category} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formTitle">
            <FormLabel>제목</FormLabel>
            <FormControl value={sale.title} readOnly={true} />
          </FormGroup>
        </div>

        <div className="mb-3">
          상품 썸네일
          <ListGroup>
            {sale.thumbnails.map((image) => (
              <ListGroupItem key={image.name}>
                <Image fluid src={image.path} />
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
        <div>
          {/* TODO 판매건당가격 price 용어 변경(상품가격 중복방지) */}
          <FormGroup className="mb-3" controlId="formPrice">
            <FormLabel>가격</FormLabel>
            <FormControl value={sale.price} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          {/* TODO 배송업체 데이터 조회 */}
          <FormGroup className="mb-3" controlId="formDeliveryFee">
            <FormLabel>배송비</FormLabel>
            <FormControl value={sale.deliveryFee} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formContent">
            <FormLabel>본문내용</FormLabel>
            <FormControl value={sale.content} readOnly={true} />
          </FormGroup>
        </div>

        <div className="mb-3">
          본문 이미지
          <ListGroup>
            {sale.contentImages.map((image) => (
              <ListGroupItem key={image.name}>
                <Image fluid src={image.path} />
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>

        <div>
          <Button
            className="me-2"
            variant="primary"
            onClick={() => navigate(`/buy/${sale.seq}`)}
          >
            대여하기
          </Button>
          <Button
            className="me-2"
            variant="outline-primary"
            onClick={handleCartAddButton}
          >
            장바구니 담기
          </Button>
          <Button
            className="me-2"
            variant="outline-danger"
            onClick={handlePickAddButton}
          >
            찜하기
          </Button>
          <Button
            className="me-2"
            variant="warning"
            onClick={() => navigate(`/rental/${sale.seq}`)}
          >
            대여 연장 신청
          </Button>
        </div>

        {/* TODO 수정+삭제 버튼 = 관리자 권한 */}
        <div>
          <Button
            className="me-2"
            variant="outline-danger"
            onClick={() => setModalShow(true)}
          >
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
    </Row>
  );
}
