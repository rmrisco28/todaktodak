import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentResult, setPaymentResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pgToken = searchParams.get("pg_token");

    // localStorage에서 주문 정보와 tid를 가져옵니다.
    const orderDataString = localStorage.getItem("kakaoPayOrder");

    if (!pgToken || !orderDataString) {
      toast.error("잘못된 접근입니다.");
      navigate("/");
      return;
    }

    const orderData = JSON.parse(orderDataString);
    const { tid } = orderData;

    // 1. 백엔드에 결제 승인 요청을 보냅니다.
    axios
      .get(`/api/kakaopay/approve?pg_token=${pgToken}&tid=${tid}`)
      .then((approveRes) => {
        // 2. 결제가 최종 승인되면, 우리 서버 DB에 주문 정보를 저장합니다.
        return axios.post("/api/buy", orderData).then((orderRes) => {
          setPaymentResult(approveRes.data); // 성공 시 결과 저장
          localStorage.removeItem("kakaoPayOrder"); // 성공 후 저장된 정보 삭제
        });
      })
      .catch((err) => {
        console.error("결제 승인 또는 주문 저장 오류:", err);
        toast.error("결제 처리 중 오류가 발생했습니다.");
        setPaymentResult("fail"); // 실패 상태 표시
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location, navigate]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
        <h4 className="ms-3">결제 승인 중입니다...</h4>
      </div>
    );
  }

  return (
    <div className="container text-center my-5">
      {paymentResult && paymentResult !== "fail" ? (
        <>
          <h1 className="mb-4">🎉 결제가 완료되었습니다!</h1>
          <div className="card w-50 mx-auto">
            <div className="card-body">
              <p>
                <strong>주문 상품:</strong>
                {paymentResult.itemName}
              </p>
              <p>
                <strong>결제 금액:</strong>
                {paymentResult.amount.toLocaleString()}원
              </p>
              <p>
                <strong>결제 수단:</strong>
                {paymentResult.paymentMethodType === "MONEY"
                  ? "카카오페이 머니"
                  : "카드"}
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => navigate("/order/list")}
          >
            주문 내역 확인하기
          </Button>
        </>
      ) : (
        <>
          <h1 className="mb-4 text-danger">❌ 결제에 실패했습니다.</h1>
          <p>문제가 지속될 경우 고객센터로 문의해주세요.</p>
          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => navigate("/")}
          >
            홈으로 돌아가기
          </Button>
        </>
      )}
    </div>
  );
}
