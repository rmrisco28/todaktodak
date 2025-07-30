import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ 주문 목록 화면 (회원/관리자 공용)
export function OrderList() {
    const [orders, setOrders] = useState([]); // 주문 목록 상태
    const navigate = useNavigate();

    // 로그인 정보
    const isAdmin = localStorage.getItem("role") === "ADMIN";
    const memberNo = localStorage.getItem("memberNo");

    // ✅ 비회원 접근 차단 (회원 또는 관리자만 가능)
    if (!memberNo && !isAdmin) {
        return (
            <div className="container mt-4">
                <h4>로그인이 필요한 서비스입니다.</h4>
            </div>
        );
    }

    // ✅ 주문 목록 조회 (회원: 본인 주문 / 관리자: 전체 주문)
    useEffect(() => {
        const url = isAdmin
            ? "/api/order/manage" // 관리자 전용 전체 주문 목록
            : `/api/order/list?memberNo=${memberNo}`; // 일반 회원용 개인 주문 목록

        axios.get(url).then((res) => {
            setOrders(res.data);
        });
    }, [isAdmin, memberNo]);

    // ✅ 관리자 전용 삭제 기능
    const handleDelete = (orderSeq) => {
        if (!isAdmin) return; // 관리자만 삭제 가능
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios
                .delete(`/api/order/delete?orderManageSeq=${orderSeq}`)
                .then(() => {
                    alert("삭제되었습니다.");
                    // 삭제된 항목을 목록에서 제거
                    setOrders(orders.filter((o) => o.seq !== orderSeq));
                })
                .catch(() => {
                    alert("삭제 실패");
                });
        }
    };

    return (
        <div className="container mt-4">
            <h3>{isAdmin ? "주문 관리" : "내 주문 내역"}</h3>

            {/* 🔴 관리자 전용: 주문 등록 버튼 */}
            {isAdmin && (
                <div className="mb-2 text-end">
                    <button className="btn btn-success">+ 주문 등록</button>
                </div>
            )}

            {/* ✅ 주문 목록 테이블 */}
            <table className="table table-bordered">
                <thead className="table-light">
                <tr>
                    <th>주문번호</th>
                    <th>주문일자</th>
                    <th>상태</th>
                    <th>총금액</th>
                    <th>기능</th>
                    {isAdmin && <th>관리</th>} {/* 관리자 전용 열 */}
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.seq}>
                        <td>{order.orderNo}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.status}</td>
                        <td>{order.totalPrice}</td>

                        {/* ✅ 공통 기능 버튼: 상세 조회 */}
                        <td>
                            <button
                                className="btn btn-outline-info btn-sm me-2"
                                onClick={() => navigate(`/order/${order.seq}`)}
                            >
                                상세
                            </button>

                            {/* 🔵 회원 전용: 상태에 따라 동작 버튼 출력 */}
                            {!isAdmin && (
                                <>
                                    {/* 상태가 배송완료일 경우 → 수령 버튼 */}
                                    {order.status === "배송완료" && (
                                        <button
                                            className="btn btn-outline-success btn-sm me-2"
                                            onClick={() => navigate(`/receive/${order.seq}`)}
                                        >
                                            수령
                                        </button>
                                    )}

                                    {/* 상태가 수령완료일 경우 → 반납 신청 */}
                                    {order.status === "수령완료" && (
                                        <button
                                            className="btn btn-outline-warning btn-sm me-2"
                                            onClick={() =>
                                                navigate("/return", {
                                                    state: {
                                                        orderManageSeq: order.seq,
                                                        memberNo: memberNo,
                                                    },
                                                })
                                            }
                                        >
                                            반납
                                        </button>
                                    )}

                                    {/* 결제대기 또는 결제완료 상태일 경우 → 주문 취소 가능 */}
                                    {(order.status === "결제대기" ||
                                        order.status === "결제완료") && (
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => navigate(`/cancel/${order.seq}`)}
                                        >
                                            취소
                                        </button>
                                    )}
                                </>
                            )}
                        </td>

                        {/* 🔴 관리자 전용: 수정 및 삭제 */}
                        {isAdmin && (
                            <td>
                                <button className="btn btn-outline-primary btn-sm me-2">
                                    수정
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleDelete(order.seq)}
                                >
                                    삭제
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}