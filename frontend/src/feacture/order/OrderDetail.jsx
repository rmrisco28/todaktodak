  import React, { useEffect, useState } from "react";
  import { Row, Col, FormGroup, FormLabel, Table, Button } from "react-bootstrap";
  import { useParams } from "react-router-dom";
  import axios from "axios";

  export function OrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
      axios.get(`/api/orders/${orderId}`)
          .then((res) => setOrder(res.data))
          .catch((err) => console.error(err));
    }, [orderId]);

    if (!order) return <p>로딩 중...</p>;

    return (
        <Row className="justify-content-center">
          <Col xs={12} md={10}>
            <h2>주문 상세</h2>
            <hr />

            <FormGroup className="mb-3">
              <FormLabel>주문번호</FormLabel>
              <div>{order.orderId}</div>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>주문일자</FormLabel>
              <div>{order.orderDate}</div>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>결제금액</FormLabel>
              <div>{order.totalPrice.toLocaleString()}원</div>
            </FormGroup>

            <FormGroup className="mb-4">
              <FormLabel>주문 상태</FormLabel>
              <div>{order.status}</div>
            </FormGroup>

            <h5>주문 상품</h5>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th>상품명</th>
                <th>수량</th>
                <th>가격</th>
              </tr>
              </thead>
              <tbody>
              {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toLocaleString()}원</td>
                  </tr>
              ))}
              </tbody>
            </Table>

            {order.trackingNumber && (
                <div className="mt-4">
                  <a
                      href={`https://tracker.delivery/#/kr.epost/${order.trackingNumber}`}
                      target="_blank"
                      rel="noreferrer"
                  >
                    <Button variant="outline-primary">배송조회</Button>
                  </a>
                </div>
            )}
          </Col>
        </Row>
    );
  }
