import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  ListGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useState } from "react";

export function OrderList() {
  const [orderList, setOrderList] = useState();
  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <div className="d-flex justify-content-between">
          <h2 className="mb-4">seq</h2>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="title1">
            <FormLabel>주문번호</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="title1">
            <FormLabel>주문자명</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="author1">
            <FormLabel>주문상태</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="author1">
            <FormLabel>상품명</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="insertedAt1">
            <FormLabel>상품옵션</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="author1">
            <FormLabel>상품번호</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="insertedAt1">
            <FormLabel>상품갯수</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="insertedAt1">
            <FormLabel>상품총가격</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="author1">
            <FormLabel>배송번호</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="insertedAt1">
            <FormLabel>배송비용</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="author1">
            <FormLabel>운송장번호</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="insertedAt1">
            <FormLabel>총가격</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="author1">
            <FormLabel>첫주문일시</FormLabel>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="author1">
            <FormLabel>마지막수정일시</FormLabel>
          </FormGroup>
        </div>
        <div className="my-5">
          <hr />
        </div>
      </Col>
    </Row>
  );
}
