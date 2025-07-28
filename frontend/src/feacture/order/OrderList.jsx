import { Col, Row, Spinner, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export function OrderList() {
  const [orderList, setOrderList] = useState({
    ordererName: "",
    orderState: "",
    orderOption: "",
    count: 0,
    totalPrice: 0,
    insertDttn: "",
  });

  useEffect(() => {
    // 마운트될때(initial render 시) 실행되는 코드
    axios
      .get("/api/order/list", orderList)
      .then((res) => {
        console.log("잘 될 때 코드");
        setOrderList(res.data);
      })
      .catch((err) => {
        console.log("잘 안될 때 코드");
      })
      .finally(() => {
        console.log("항상 실행 코드");
      });
  }, []);

  if (!orderList) {
    return <Spinner />;
  }

  return (
    <Row>
      <Col>
        <h2 className="mb-4">주문 목록</h2>
        {orderList.length > 0 ? (
          <Table striped={true} hover={true}>
            <thead>
              <tr>
                <th>주문자명</th>
                <th>주문상태</th>
                <th>옵션</th>
                <th>갯수</th>
                <th>총 가격</th>
                <th>등록일시</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr key={order.ordererName}>
                  <td>{order.orderState}</td>
                  <td>{order.orderOption}</td>
                  <td>{order.count}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.insertDttn}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>조회된 주문이 없습니다.</p>
        )}
      </Col>
    </Row>
  );
}
