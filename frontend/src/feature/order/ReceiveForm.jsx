import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export function ReceiveForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderManageSeq } = location.state || {};

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleReceiveConfirm = async () => {
        try {
            await axios.patch("/api/order/receive", {
                orderManageSeq,
                receivedBy: "user01", // 필요시 사용자 정보 설정
                memo: "수령 확인"
            });
            alert("상품을 수령 처리했습니다.");
            navigate(`/order/detail/${orderManageSeq}`);
        } catch (error) {
            console.error(error);
            alert("상품 수령 처리에 실패했습니다.");
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
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleCloseModal();
                            handleReceiveConfirm();
                        }}
                    >
                        예, 수령했습니다
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}