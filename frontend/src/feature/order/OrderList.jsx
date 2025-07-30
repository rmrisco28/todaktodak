import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function OrderList() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("role") === "ADMIN";
    const memberNo = localStorage.getItem("memberNo");

    // ✅ 비회원 차단
    if (!memberNo && !isAdmin) {
        return (
            <div className="container mt-4">
                <h4>로그인이 필요한 서비스입니다.</h4>
            </div>
        );
    }

    // ✅ 주문 목록 조회
    useEffect(() => {
        const url = isAdmin
            ? "/api/order/manage"
            : `/api/order/list?memberNo=${memberNo}`;

        axios.get(url).then((res) => {
            setOrders(res.data);
        });
    }, [isAdmin, memberNo]);

    // ✅ 관리자 전용 삭제 기능
    const handleDelete = (orderSeq) => {
        if (!isAdmin) return;
        if (window.confirm("정말 삭제하시겠습니까?")) {
            axios
                .delete(`/api/order/delete?orderManageSeq=${orderSeq}`)
                .then(() => {
                    alert("삭제되었습니다.");
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

            {/* 🔴 관리자 전용 등록 버튼 */}
            {isAdmin && (
                <div className="mb-2 text-end">
                    <button className="btn btn-success">+ 주문 등록</button>
                </div>
            )}

            <table className="table table-bordered">
                <thead className="table-light">
                <tr>
                    <th>주문번호</th>
                    <th>주문일자</th>
                    <th>상태</th>
                    <th>총금액</th>
                    <th>기능</th>
                    {isAdmin && <th>관리</th>}
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.seq}>
                        <td>{order.orderNo}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.status}</td>
                        <td>{order.totalPrice}</td>

                        <td>
                            {/* ✅ 상세 버튼: 회원/관리자 공통 */}
                            <button
                                className="btn btn-outline-info btn-sm me-2"
                                onClick={() => navigate(`/order/${order.seq}`)}
                            >
                                상세
                            </button>

                            {/* 🔵 회원 전용 상태별 버튼 */}
                            {!isAdmin && (
                                <>
                                    {order.status === "배송완료" && (
                                        <button
                                            className="btn btn-outline-success btn-sm me-2"
                                            onClick={() => navigate(`/receive/${order.seq}`)}
                                        >
                                            수령
                                        </button>
                                    )}

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

                        {/* 🔴 관리자 전용: 수정/삭제 */}
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
