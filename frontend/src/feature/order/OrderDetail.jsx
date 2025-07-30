import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Spinner, Row, Col } from "react-bootstrap";

// ✅ 주문 상세 정보 조회 컴포넌트
export function OrderDetail() {
  // URL 파라미터에서 orderId 추출 (예: /order/detail/:orderId)
  const { orderId } = useParams();

  // 주문 정보를 저장할 상태 변수
  const [order, setOrder] = useState(null);

  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  // ✅ 컴포넌트 마운트 시 주문 상세 API 호출
  useEffect(() => {
    axios
        .get(`/api/order/detail?orderSeq=${orderId}`) // Spring에서 orderSeq로 받음
        .then((res) => {
          console.log(res.data); // 콘솔 로그로 응답 확인
          setOrder(res.data);    // 주문 데이터 저장
        })
        .catch((err) => console.error("상세 조회 실패:", err));
  }, [orderId]);

  // ✅ 주문 정보가 아직 로딩 중일 경우 Spinner 표시
  if (!order) {
    return (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">로딩 중...</span>
          </Spinner>
        </div>
    );
  }

  // ✅ 주문 정보가 로딩된 후 상세 내용 렌더링
  return (
      <div className="container mt-4">
        <h2 className="mb-4">주문 상세 정보</h2>

        {/* 주문 기본 정보 카드 UI */}
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
                  {order.trackNo || "-"}
                </p>
                <p>
                  <strong>상품명:</strong>
                  {order.productNames}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* 주문 처리 버튼 영역 */}
        <h5 className="mb-3">처리 메뉴</h5>
        <div className="d-flex flex-wrap gap-2 mb-5">

          {/* ✅ 상품 수령 버튼 → /receive/:orderId 이동, state에 seq와 memberNo 전달 */}
          <Button
              variant="danger"
              onClick={() => {
                const memberNo = localStorage.getItem("memberNo");
                navigate(`/receive/${order.seq}`, {
                  state: {
                    orderManageSeq: order.seq,
                    memberNo: memberNo,
                  },
                });
              }}
          >
            상품수령
          </Button>

          {/* ❌ 오류 가능성 있음: item.orderManageSeq → order.seq 로 수정 필요 */}
          <button
              className="btn btn-outline-danger"
              onClick={() =>
                  navigate("/cancel", {
                    state: { orderManageSeq: order.seq }, // ← item → order로 수정 필요
                  })
              }
          >
            주문 취소
          </button>

          {/* ✅ 대여 연장 신청 → /extend/:orderId 이동 */}
          <Button
              variant="outline-primary"
              onClick={() => navigate(`/extend/${orderId}`)}
          >
            대여 연장 신청
          </Button>

          {/* ✅ 반납 신청 → /return 이동, 주문번호 등 상태 전달 */}
          <Button
              variant="outline-danger"
              onClick={() =>
                  navigate("/return", {
                    state: {
                      orderSeq: orderId,              // seq 전달
                      orderNo: order.orderNo,         // 주문번호
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