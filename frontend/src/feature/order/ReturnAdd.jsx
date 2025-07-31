import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ 상품 수령 확인 폼 컴포넌트
// - 사용자가 배송 완료된 상품에 대해 "수령 확인"을 진행하는 화면
export function ReturnAdd() {
  const { orderId } = useParams(); // URL 파라미터에서 주문번호(seq) 가져옴
  const navigate = useNavigate();

  const [order, setOrder] = useState(null); // 주문 정보 상태
  const [memo, setMemo] = useState(""); // 수령 메모 상태

  // ✅ 컴포넌트 마운트 시 주문 정보 불러오기
  useEffect(() => {
    axios
      .get("/api/receive", {
        params: { orderManageSeq: orderId }, // 백엔드에 전달할 주문번호
      })
      .then((res) => {
        setOrder(res.data); // 응답 받은 주문 정보 저장
      })
      .catch(() => {
        alert("수령 정보를 불러오는 데 실패했습니다.");
      });
  }, [orderId]);

  // ✅ 수령 확인 버튼 클릭 시 처리
  const handleClick = () => {
    const memberNo = localStorage.getItem("memberNo");
    if (!memberNo) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 수령 실행 페이지로 이동하며 필요한 데이터(state)를 함께 전달
    navigate("/receive/exec", {
      state: {
        orderManageSeq: parseInt(orderId), // 주문 번호 (정수형)
        memberNo: memberNo, // 수령자 정보
        memo: memo, // 수령 메모
      },
    });
  };

  // ✅ 주문 정보 로딩 중일 경우 메시지 표시
  if (!order) return <div>로딩 중...</div>;

  // ✅ 화면 출력 (주문 정보 + 수령 메모 입력 + 버튼)
  return (
    <div className="container mt-4">
      <h3>상품 수령 확인</h3>

      {/* 주문 정보 표시 테이블 */}
      <table className="table mt-3">
        <tbody>
          <tr>
            <th>주문번호</th>
            <td>{order.productName}</td>
            {/* ❗ 실제로는 주문번호가 아니라 상품명으로 추정됨 */}
          </tr>
          <tr>
            <th>배송 상태</th>
            <td>{order.status}</td>
          </tr>
          <tr>
            <th>주문 일자</th>
            <td>{order.orderDate}</td>
          </tr>
        </tbody>
      </table>

      {/* 수령 메모 입력란 */}
      <div className="form-group mt-3">
        <label>수령 메모</label>
        <textarea
          className="form-control"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
      </div>

      {/* 수령 확인 버튼 */}
      <button className="btn btn-primary mt-3" onClick={handleClick}>
        수령 확인
      </button>
    </div>
  );
}
