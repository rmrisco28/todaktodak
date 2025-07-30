import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export function ReceiveExec() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      alert("잘못된 접근입니다.");
      navigate("/");
      return;
    }

    axios
        .patch("/api/receive/exec", {
          orderManageSeq: state.orderManageSeq,
          memberNo: state.memberNo,
          memo: state.memo,
        })
        .then(() => {
          alert("상품 수령이 완료되었습니다.");
          navigate("/order/list"); // 원하는 페이지로 이동
        })
        .catch(() => {
          alert("수령 처리 중 오류가 발생했습니다.");
          navigate("/");
        });
  }, [state, navigate]);

  return (
      <div className="container mt-4">
        <h3>상품 수령 처리 중...</h3>
      </div>
  );
}
