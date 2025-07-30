import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function OrderList() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth"); // 'admin' or 'user'
  const isAdmin = auth === "admin";
  const memberSeq = localStorage.getItem("memberSeq");

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const params = {
      status: status || undefined,
      keyword: keyword || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    };

    if (!isAdmin) {
      params.memberSeq = memberSeq;
    }

    axios
      .get("/api/order/list", { params })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("주문 조회 실패:", err));
  }, [memberSeq, status, keyword, startDate, endDate]);

  const handleDateRange = (months) => {
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - months);
    setStartDate(start.toISOString().slice(0, 10));
    setEndDate(end.toISOString().slice(0, 10));
  };

  const handleStatusChange = (orderSeq, newStatus) => {
    axios
      .post("/api/order/update-status", {
        orderSeq,
        status: newStatus,
      })
      .then(() => {
        // 변경 후 다시 불러오기
        const updatedOrders = orders.map((o) =>
          o.seq === orderSeq ? { ...o, status: newStatus } : o,
        );
        setOrders(updatedOrders);
      })
      .catch((err) => alert("상태 변경 실패"));
  };

  return (
    <Container className="mt-4">
      <h2>{isAdmin ? "주문 관리" : "주문 내역"}</h2>
      <Row className="my-3">
        <Col>
          <Button
            variant="outline-secondary"
            onClick={() => handleDateRange(1)}
          >
            1개월
          </Button>{" "}
          <Button
            variant="outline-secondary"
            onClick={() => handleDateRange(3)}
          >
            3개월
          </Button>{" "}
          <Button
            variant="outline-secondary"
            onClick={() => handleDateRange(6)}
          >
            6개월
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={() => {
              setStatus("");
              setKeyword("");
              setStartDate("");
              setEndDate("");
            }}
          >
            초기화
          </Button>
        </Col>
        <Col>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">전체</option>
            <option value="대여중">대여중</option>
            <option value="반납완료">반납완료</option>
            <option value="배송중">배송중</option>
            <option value="배송완료">배송완료</option>
            <option value="주문취소">주문취소</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="상품명 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>주문번호</th>
            <th>주문일자</th>
            <th>상품명</th>
            <th>결제금액</th>
            <th>상태</th>
            <th>처리</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.seq}
              style={{
                color: order.delYn === "Y" ? "gray" : "black",
              }}
            >
              <td>
                <Button
                  variant="link"
                  onClick={() => navigate(`/order/${order.seq}`)}
                >
                  {order.orderNo}
                </Button>
              </td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.productNames}</td>
              <td>{order.totalPrice.toLocaleString()}원</td>
              <td>
                {isAdmin ? (
                  <Form.Select
                    size="sm"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.seq, e.target.value)
                    }
                  >
                    <option value="대여중">대여중</option>
                    <option value="반납완료">반납완료</option>
                    <option value="배송중">배송중</option>
                    <option value="배송완료">배송완료</option>
                    <option value="주문취소">주문취소</option>
                  </Form.Select>
                ) : (
                  order.status
                )}
              </td>
              <td>
                {!isAdmin && order.status === "배송중" && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      navigate("/receive", {
                        state: {
                          orderManageSeq: order.seq,
                        },
                      })
                    }
                  >
                    상품수령
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
