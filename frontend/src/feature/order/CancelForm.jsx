import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// ✅ 주문 취소 신청 폼
export function CancelForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderManageSeq = location.state?.orderManageSeq;

  // ✅ 입력값 상태: 취소자와 취소 사유
  const [cancelBy, setCancelBy] = useState(""); // 취소자 이름 또는 ID
  const [memo, setMemo] = useState(""); // 취소 사유

  // ✅ 주문 취소 요청 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // PATCH 요청: 취소 처리
      await axios.patch("/api/order/cancel", {
        orderManageSeq,
        cancelBy,
        memo,
      });

      alert("주문이 성공적으로 취소되었습니다.");
      navigate("/order/list", { state: { updated: true } }); // 주문 목록으로 이동
    } catch (err) {
      console.error(err);
      alert("주문 취소 중 오류가 발생했습니다.");
    }
  };

  // ✅ 잘못된 접근 방지 (orderManageSeq 누락 시)
  if (!orderManageSeq) {
    return <div>잘못된 접근입니다. 주문 정보가 없습니다.</div>;
  }

  return (
      <div className="container mt-4">
        <h4>주문 취소 신청</h4>

        <form onSubmit={handleSubmit}>
          {/* 🔹 취소자 입력 */}
          <div className="mb-3">
            <label className="form-label">취소자</label>
            <input
                type="text"
                className="form-control"
                value={cancelBy}
                onChange={(e) => setCancelBy(e.target.value)}
                required
            />
          </div>

          {/* 🔹 취소 사유 입력 */}
          <div className="mb-3">
            <label className="form-label">취소 사유</label>
            <textarea
                className="form-control"
                rows="4"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                required
            ></textarea>
          </div>

          {/* 🔴 제출 버튼 */}
          <button type="submit" className="btn btn-danger">
            주문 취소하기
          </button>
        </form>
      </div>
  );
}