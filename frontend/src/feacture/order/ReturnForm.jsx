import React, { useState } from "react";
import { Row, Col, FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import axios from "axios";

export function ReturnForm() {
  const [form, setForm] = useState({
    orderNumber: "",
    productCode: "",
    customerName: "",
    phoneNumber: "",
    reason: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/return", form);
      setMessage(res.data);
    } catch (err) {
      setMessage("반품 신청에 실패했습니다.");
    }
  };

  return (
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2>반품 신청</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel>주문번호</FormLabel>
              <FormControl
                  name="orderNumber"
                  placeholder="주문번호"
                  onChange={handleChange}
                  required
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>상품코드</FormLabel>
              <FormControl
                  name="productCode"
                  placeholder="상품코드"
                  onChange={handleChange}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>이름</FormLabel>
              <FormControl
                  name="customerName"
                  placeholder="이름"
                  onChange={handleChange}
                  required
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>전화번호</FormLabel>
              <FormControl
                  name="phoneNumber"
                  placeholder="전화번호"
                  onChange={handleChange}
                  required
              />
            </FormGroup>

            <FormGroup className="mb-4">
              <FormLabel>반품 사유</FormLabel>
              <FormControl
                  as="textarea"
                  name="reason"
                  placeholder="반품 사유를 입력해주세요."
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