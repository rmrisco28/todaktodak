import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";

export function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/order/detail?orderSeq=${orderId}`)
      .then((res) => {
        console.log(res.data);
        setOrder(res.data);
      })
      .catch((err) => console.error("상세 조회 실패:", err));
  }, [orderId]);

  if (!order) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">로딩 중...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">주문 상세 정보</h2>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <strong>주문번호:</strong>
                {order.orderNo}
              </p>
              <p>
                <strong>주문일자:</strong>
                {new Date(order.orderDate).toLocaleString()}
              </p>
              <p>
                <strong>결제금액:</strong>
                {order.totalPrice.toLocaleString()}원
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>상태:</strong>
                {order.status}
              </p>
              <p>
                <strong>송장번호:</strong>
                {order.trackingNumber || "-"}
              </p>
              <p>
                <strong>상품명:</strong>
                {order.productNames}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <h5 className="mb-3">처리 메뉴</h5>
      <div className="d-flex flex-wrap gap-2 mb-5">
        <Button
          variant="danger"
          onClick={() => navigate(`/receive/${orderId}`)}
        >
          상품수령
        </Button>
        <button
          className="btn btn-outline-danger"
          onClick={() =>
            navigate("/cancel", {
              state: { orderManageSeq: item.orderManageSeq },
            })
          }
        >
          주문 취소
        </button>
        <Button
          variant="outline-primary"
          onClick={() => navigate(`/extend/${orderId}`)}
        >
          대여 연장 신청
        </Button>
        <Button
          variant="outline-danger"
          onClick={() =>
            navigate("/return", {
              state: {
                orderSeq: orderId,
                orderNo: order.orderNo,
                productNames: order.productNames,
                totalPrice: order.totalPrice,
              },
            })
          }
        >
          반납 신청
        </Button>
      </div>
    </div>
  );
}
