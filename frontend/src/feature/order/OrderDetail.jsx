import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Button,
  Spinner,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  ListGroup,
  ListGroupItem,
  Image,
  Modal,
} from "react-bootstrap";
import { toast } from "react-toastify";

export function OrderDetail() {
  const [order, setOrder] = useState(null);
  const { seq } = useParams();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/order/detail/${seq}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        toast("해당 주문 정보가 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  if (!order) {
    return <Spinner />;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <div className="d-flex justify-content-between">
          <h2 className="mb-4">{order.seq} 번 주문 정보</h2>
        </div>

        <div className="mb-3">
          상품 이미지
          <ListGroup>
            <ListGroupItem key={order.image.name}>
              <Image fluid src={order.image.path} />
            </ListGroupItem>
          </ListGroup>
        </div>

        <div>
          <FormGroup className="mb-3" controlId="formTitle">
            <FormLabel>상품</FormLabel>
            <FormControl value={order.saleTitle} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formOrderNo">
            <FormLabel>주문번호</FormLabel>
            <FormControl value={order.orderNo} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formProdPrice">
            <FormLabel>상품가격</FormLabel>
            <FormControl value={order.prodPrice} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formOrderCount">
            <FormLabel>주문상품개수</FormLabel>
            <FormControl value={order.orderCount} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formRetalPeriod">
            <FormLabel>대여기간</FormLabel>
            <FormControl value={order.rentalPeriod} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formState">
            <FormLabel>주문상태</FormLabel>
            <FormControl value={order.state} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formInsertDttm">
            <FormLabel>주문일시</FormLabel>
            <FormControl
              value={order.insertDttm}
              type="datetime-local"
              readOnly={true}
            />
          </FormGroup>
        </div>

        <div>
          <Button
            variant="outline-info"
            onClick={() => navigate(`/order/modify/${order.seq}`)}
          >
            주문 상태 변경
          </Button>
        </div>

        <hr />

        <div>
          <FormGroup className="mb-3" controlId="formRecipient">
            <FormLabel>수령인 성함</FormLabel>
            <FormControl value={order.recipient} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formPhone">
            <FormLabel>연락처</FormLabel>
            <FormControl value={order.phone} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formPost">
            <FormLabel>post</FormLabel>
            <FormControl value={order.post} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formAddr">
            <FormLabel>주소</FormLabel>
            <FormControl value={order.addr} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formAddrDetail">
            <FormLabel>상세주소</FormLabel>
            <FormControl value={order.addrDetail} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formRequest">
            <FormLabel>배송요청사항</FormLabel>
            <FormControl value={order.request} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formDeliveryCompany">
            <FormLabel>배송업체명</FormLabel>
            <FormControl value={order.deliveryCompany} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formTracking">
            <FormLabel>운송장번호</FormLabel>
            <FormControl value={order.tracking} readOnly={true} />
          </FormGroup>
        </div>

        <hr />

        <div>
          <FormGroup className="mb-3" controlId="formTotalPrice">
            <FormLabel>총 결제금액</FormLabel>
            <FormControl value={order.totalPrice} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formTotProdPrice">
            <FormLabel>전체 상품 가격</FormLabel>
            <FormControl value={order.totProdPrice} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formDeliveryFee">
            <FormLabel>배달비</FormLabel>
            <FormControl value={order.deliveryFee} readOnly={true} />
          </FormGroup>
        </div>
      </Col>
    </Row>
  );
}
