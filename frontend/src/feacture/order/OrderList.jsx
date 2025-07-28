import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Form, Row, Col } from "react-bootstrap";

export function OrderList() {
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({
        memberSeq: 1,
        status: "",
        keyword: "",
        startDate: "",
        endDate: "",
    });

    useEffect(() => {
        // 빈 값 제거하여 쿼리 스트링 최소화
        const sanitizedParams = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== "") {
                sanitizedParams[key] = value;
            }
        });

        axios
            .get("/api/order/list", { params: sanitizedParams })
            .then((res) => setOrders(res.data))
            .catch((err) => console.error("주문 조회 실패:", err));
    }, [filters]);

    const handleDateRange = (months) => {
        const end = new Date();
        const start = new Date();
        start.setMonth(end.getMonth() - months);
        setFilters({
            ...filters,
            startDate: start.toISOString().slice(0, 10),
            endDate: end.toISOString().slice(0, 10),
        });
    };

    return (
        <Container className="mt-4">
            <h2>주문 내역</h2>
            <Row className="my-3">
                <Col>
                    <Button variant="outline-secondary" onClick={() => handleDateRange(1)}>1개월</Button>{" "}
                    <Button variant="outline-secondary" onClick={() => handleDateRange(3)}>3개월</Button>{" "}
                    <Button variant="outline-secondary" onClick={() => handleDateRange(6)}>6개월</Button>{" "}
                    <Button
                        variant="secondary"
                        onClick={() =>
                            setFilters({
                                memberSeq: 1,
                                status: "",
                                keyword: "",
                                startDate: "",
                                endDate: "",
                            })
                        }
                    >
                        초기화
                    </Button>
                </Col>
                <Col>
                    <Form.Select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    >
                        <option value="">전체 상태</option>
                        <option value="배송중">배송중</option>
                        <option value="배송완료">배송완료</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="상품명 검색"
                        value={filters.keyword}
                        onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
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
                    <tr key={order.orderId}>
                        <td>
                            <a href={`/order/${order.orderId}`}>{order.orderId}</a>
                        </td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{order.productNames}</td>
                        <td>{order.totalPrice.toLocaleString()}원</td>
                        <td>{order.status}</td>
                        <td>
                            {order.trackingNumber && (
                                <a
                                    href={`https://tracker.delivery/#/kr.epost/${order.trackingNumber}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    배송조회
                                </a>
                            )}
                            {" "}
                            {order.status === "배송완료" && (
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => (window.location.href = `/return/${order.orderId}`)}
                                >
                                    반품신청
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