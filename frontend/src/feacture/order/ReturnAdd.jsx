import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";

export function ReturnAdd() {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId, productNames } = location.state || {};

    if (!orderId || !productNames) {
        return (
            <Container className="mt-5 text-center">
                <h4>잘못된 접근입니다.</h4>
                <Button onClick={() => navigate("/")}>홈으로</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Card className="text-center shadow">
                <Card.Header className="bg-success text-white fs-4">
                    반품 신청 완료
                </Card.Header>
                <Card.Body>
                    <Card.Title>반품 신청이 접수되었습니다.</Card.Title>
                    <Card.Text className="mt-3">
                        <strong>주문번호:</strong> {orderId} <br />
                        <strong>반품 상품:</strong> {productNames}
                    </Card.Text>
                    <Card.Text className="text-muted mt-2">
                        접수된 반품은 평균 3~5일 내에 처리됩니다.
                        <br />
                        처리 상태는 마이페이지에서 확인 가능합니다.
                    </Card.Text>
                    <Button variant="primary" onClick={() => navigate("/mypage/orders")}>
                        주문내역 보기
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}