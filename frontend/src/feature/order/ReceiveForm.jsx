import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function ReceiveForm() {
    const { orderId } = useParams(); // = orderManageSeq
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [memo, setMemo] = useState("");

    useEffect(() => {
        axios
            .get("/api/receive", {
                params: { orderManageSeq: orderId },
            })
            .then((res) => {
                setOrder(res.data);
            })
            .catch(() => {
                alert("수령 정보를 불러오는 데 실패했습니다.");
            });
    }, [orderId]);

    const handleClick = () => {
        const memberNo = localStorage.getItem("memberNo");
        if (!memberNo) {
            alert("로그인이 필요합니다.");
            return;
        }

        navigate("/receive/exec", {
            state: {
                orderManageSeq: parseInt(orderId),
                memberNo: memberNo,
                memo: memo,
            },
        });
    };

    if (!order) return <div>로딩 중...</div>;

    return (
        <div className="container mt-4">
            <h3>상품 수령 확인</h3>
            <table className="table mt-3">
                <tbody>
                <tr>
                    <th>주문번호</th>
                    <td>{order.productName}</td>
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

            <div className="form-group mt-3">
                <label>수령 메모</label>
                <textarea
                    className="form-control"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                />
            </div>

            <button className="btn btn-primary mt-3" onClick={handleClick}>
                수령 확인
            </button>
        </div>
    );
}