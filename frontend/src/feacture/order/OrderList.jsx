import { Col, FormGroup, FormLabel, Row, Table } from "react-bootstrap";
import { useState } from "react";

export function OrderList() {
  const [orderList, setOrderList] = useState();
  return (
    <Row>
      <Col>
        <Table>
          <thead>
            <tr>
              <th>주문자명: {orderList.odrName}</th>
              <th>주문 상태: {orderList.orderState}</th>
              <th>상품 옵션: {orderList.orderOption}</th>
              <th>상품 갯수: {orderList.count}</th>
              <th>총 가격: {orderList.totalPrice}</th>
              <th>
                접수 시간:{" "}
                {orderList.updateDttm
                  ? orderList.updateDttm
                  : orderList.inserDttm}
              </th>
            </tr>
          </thead>
        </Table>
      </Col>
    </Row>
  );
}
