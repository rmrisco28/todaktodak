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

// ✅ 반납 신청 폼 컴포넌트
// - 주문한 상품을 사용자가 반납 신청하는 화면
// - location.state를 통해 orderNo, customerName, phoneNumber 등이 사전 전달될 수 있음
export function ReturnForm() {
  const location = useLocation(); // 이전 페이지에서 전달된 주문 정보 접근
  const memberSeq = localStorage.getItem("memberSeq"); // 로그인된 사용자 번호 (사용자 여부 판단)

  // 🔧 폼 상태 관리
  const [form, setForm] = useState({
    orderNumber: "",     // 주문 번호
    productCode: "",     // 반납할 상품 코드
    customerName: "",    // 사용자 이름
    phoneNumber: "",     // 사용자 전화번호
    reason: "",          // 반납 사유
  });

  const [message, setMessage] = useState(""); // 결과 메시지 (성공/실패)

  // ✅ location.state로 전달된 정보로 초기값 세팅
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

  // ✅ 입력값 변경 시 상태 업데이트
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ 반납 신청 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST 요청으로 반납 신청 데이터 전송
      const res = await axios.post("/api/return", form);
      setMessage(res.data); // 서버 응답 메시지 출력
    } catch (err) {
      setMessage("반납 신청에 실패했습니다.");
    }
  };

  // ✅ 렌더링
  return (
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2>반납 신청</h2>
          <hr />

          <form onSubmit={handleSubmit}>
            {/* 주문번호 입력 (회원일 경우 readOnly) */}
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

            {/* 상품코드 입력 (필수 아님) */}
            <FormGroup className="mb-3">
              <FormLabel>상품코드</FormLabel>
              <FormControl
                  name="productCode"
                  value={form.productCode}
                  placeholder="상품코드"
                  onChange={handleChange}
              />
            </FormGroup>

            {/* 이름 입력 (회원일 경우 readOnly) */}
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

            {/* 전화번호 입력 (회원일 경우 readOnly) */}
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

            {/* 반납 사유 입력 */}
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

            {/* 제출 버튼 */}
            <div className="d-grid">
              <Button type="submit">신청하기</Button>
            </div>
          </form>

          {/* 결과 메시지 출력 */}
          {message && <p className="mt-3">{message}</p>}
        </Col>
      </Row>
  );
}