import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function PaymentFail() {
  const navigate = useNavigate();
  return (
    <div className="container text-center my-5">
      <h1 className="mb-4 text-danger">❌ 결제에 실패했습니다.</h1>
      <p>결제 과정에서 문제가 발생했습니다. 다시 시도해주세요.</p>
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() => navigate("/")}
      >
        홈으로 돌아가기
      </Button>
    </div>
  );
}
