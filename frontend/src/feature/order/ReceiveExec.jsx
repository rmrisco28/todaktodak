import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ 상품 수령 처리 실행 컴포넌트
// - ReceiveForm에서 navigate로 전달된 state를 기반으로 상품 수령을 처리함
export function ReceiveExec() {
  const { state } = useLocation(); // 이전 페이지에서 전달된 state (orderManageSeq, memberNo, memo)
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // ✅ 컴포넌트 마운트 시 수령 처리 실행
  useEffect(() => {
    // state가 존재하지 않을 경우 (잘못된 접근)
    if (!state) {
      alert("잘못된 접근입니다.");
      navigate("/"); // 홈으로 이동
      return;
    }

    // ✅ PATCH 요청: 상품 수령 처리 API 호출
    axios
      .patch("/api/receive/exec", {
        orderManageSeq: state.orderManageSeq, // 주문 번호 (PK)
        memberNo: state.memberNo, // 수령자 회원 번호
        memo: state.memo, // 수령 메모
      })
      .then(() => {
        alert("상품 수령이 완료되었습니다.");
        navigate("/order/list"); // 완료 후 주문 목록으로 이동
      })
      .catch(() => {
        alert("수령 처리 중 오류가 발생했습니다.");
        navigate("/"); // 오류 발생 시 홈으로 이동
      });
  }, [state, navigate]);

  // ✅ 사용자에게 수령 처리 중임을 안내
  return (
    <div className="container mt-4">
      <h3>상품 수령 처리 중...</h3>
    </div>
  );
}
