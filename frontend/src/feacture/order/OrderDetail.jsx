import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/order/detail?orderSeq=${orderId}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.error("상세 조회 실패:", err));
  }, [orderId]);

  if (!order) return <div className="container mt-4">로딩 중...</div>;

  return (
    <div className="container mt-4">
      <h3>주문 상세 정보</h3>
      <p>
        <strong>주문번호:</strong>
        {order.orderNo}
      </p>
      <p>
        <strong>주문일자:</strong>
        {new Date(order.orderDate).toLocaleString()}
      </p>
      <p>
        <strong>상품명:</strong>
        {order.productNames}
      </p>
      <p>
        <strong>결제금액:</strong>
        {order.totalPrice.toLocaleString()}원
      </p>
      <p>
        <strong>상태:</strong>
        {order.status}
      </p>
      <p>
        <strong>송장번호:</strong>
        {order.trackingNumber}
      </p>
    </div>
  );
}
