import React from "react";
import axios from "axios";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export function ReceiveForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId } = location.state || {};

    const handleReceive = async () => {
        try {
            await axios.patch("/api/order/receive", { orderId });
            alert("상품을 수령 처리했습니다.");
            navigate(`/order/detail/${orderId}`);
        } catch (error) {
            console.error(error);
            alert("상품 수령 처리에 실패했습니다.");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h4 className="mb-4">상품 수령 확인</h4>
                    <p>상품을 수령하셨습니까?</p>
                    <Button variant="primary" onClick={handleReceive}>
                        수령 완료 처리
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}