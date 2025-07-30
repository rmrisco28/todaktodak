import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export function ReceiveForm() {
  const { orderId } = useParams(); // ✅ /receive/:orderId 에서 받기
  const orderManageSeq = orderId; // 이름 맞추기
  const memberNo = localStorage.getItem("memberNo"); // 로그인 정보

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!orderManageSeq) {
      alert("잘못된 접근입니다. 주문 정보가 없습니다.");
      navigate("/order/list");
    }
  }, [orderManageSeq, navigate]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleReceiveConfirm = async () => {
    try {
      await axios.patch("/api/order/receive", {
        orderManageSeq,
        receivedBy: memberNo,
        memo: "수령 확인",
      });

      alert("상품을 수령 처리했습니다.");
      navigate("/order/list", { state: { updated: true } });
    } catch (error) {
      console.error(error);
      alert("상품 수령 처리에 실패했습니다.");
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h4 className="mb-4">상품 수령</h4>
          <p>상품 수령 처리를 진행하시려면 아래 버튼을 눌러주세요.</p>
          <Button variant="primary" onClick={handleOpenModal}>
            수령 처리하기
          </Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>상품 수령 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>정말로 상품을 수령하셨습니까?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            아니오
          </Button>
          <Button variant="primary" onClick={handleReceiveConfirm}>
            예, 수령했습니다
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
