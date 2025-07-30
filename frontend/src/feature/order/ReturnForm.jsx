import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";

export function ReturnForm() {
  const location = useLocation();
  const memberSeq = localStorage.getItem("memberSeq");

  const [form, setForm] = useState({
    orderNumber: "",
    productCode: "",
    customerName: "",
    phoneNumber: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (memberSeq && location.state) {
      setForm((prev) => ({
        ...prev,
        orderNumber: location.state.orderNo || "",
        customerName: location.state.customerName || "",
        phoneNumber: location.state.phoneNumber || "",
      }));
    }
  }, [location.state, memberSeq]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/return", form);
      setMessage(res.data);
    } catch (err) {
      setMessage("반납 신청에 실패했습니다.");
    }
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2>반납 신청</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>주문번호</FormLabel>
            <FormControl
              name="orderNumber"
              value={form.orderNumber}
              placeholder="주문번호"
              onChange={handleChange}
              required
              readOnly={!!memberSeq}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>상품코드</FormLabel>
            <FormControl
              name="productCode"
              value={form.productCode}
              placeholder="상품코드"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>이름</FormLabel>
            <FormControl
              name="customerName"
              value={form.customerName}
              placeholder="이름"
              onChange={handleChange}
              required
              readOnly={!!memberSeq}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>전화번호</FormLabel>
            <FormControl
              name="phoneNumber"
              value={form.phoneNumber}
              placeholder="전화번호"
              onChange={handleChange}
              required
              readOnly={!!memberSeq}
            />
          </FormGroup>

          <FormGroup className="mb-4">
            <FormLabel>반납 사유</FormLabel>
            <FormControl
              as="textarea"
              name="reason"
              value={form.reason}
              placeholder="반납 사유를 입력해주세요."
              onChange={handleChange}
              required
            />
          </FormGroup>

          <div className="d-grid">
            <Button type="submit">신청하기</Button>
          </div>
        </form>

        {message && <p className="mt-3">{message}</p>}
      </Col>
    </Row>
  );
}
