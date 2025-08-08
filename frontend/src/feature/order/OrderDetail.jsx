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
  FormSelect,
} from "react-bootstrap";
import { toast } from "react-toastify";

import data from "../../json/stateOrder.json";

// 주문 상태값 목록
const stateList = [];
data.orderStateList.map((i) =>
  stateList.push({ id: i.id, code: i.code, kor: i.kor }),
);

export function OrderDetail() {
  const [order, setOrder] = useState(null);
  const { seq } = useParams();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [state, setState] = useState("");
  const [request, setRequest] = useState("");
  const [deliveryCompany, setDeliveryCompany] = useState("");
  const [tracking, setTracking] = useState("");

  useEffect(() => {
    axios
      .get(`/api/order/detail/${seq}`)
      .then((res) => {
        setOrder(res.data);
        setRequest(res.data.request);
        setDeliveryCompany(res.data.deliveryCompany);
        setTracking(res.data.tracking);
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

  let validate = true;
  if (
    state === null
    // TODO [@MINKI] state의 값에 따라 필요한 validate 확인
  ) {
    validate = false;
  }

  function handleSaveButtonClick() {
    setIsProcessing(true);
    // console.log(product);
    axios
      .putForm(`/api/order/modify/${seq}`, {
        state: order.state,
        request: order.request,
        deliveryCompany: order.deliveryCompany,
        tracking: order.tracking,
      })
      .then((res) => {
        const message = res.data.message;
        toast(message.text, { type: message.type });
        navigate(`/order/${seq}`);
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        } else {
          toast("주문 수정 시 오류가 발생하였습니다.", { type: "warning" });
        }
      })
      .finally(() => {
        console.log("always");
        setModalShow(false);
        setIsProcessing(false);
      });
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
          <FormGroup className="mb-3" controlId="formState">
            <FormLabel>주문상태</FormLabel>
            <FormSelect
              className="mb-3"
              onChange={(e) => setOrder({ ...order, state: e.target.value })}
            >
              {/* TODO [@MINKI] 기존 상태값에 따라 선택가능한 상태값만 보여줄 것 */}
              {stateList.map((item) => (
                <option
                  value={item.code}
                  key={item.id}
                  selected={item.code == order.state}
                >
                  {item.kor}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
        </div>

        <div>
          <Button
            variant="outline-info"
            onClick={() => setModalShow(true)}
            disabled={isProcessing || !validate}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "주문 상태 변경"}
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
            <FormControl
              value={order.request}
              placeholder={request}
              onChange={(e) => setOrder({ ...order, request: e.target.value })}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formDeliveryCompany">
            <FormLabel>배송업체명</FormLabel>
            <FormControl
              value={order.deliveryCompany}
              placeholder={deliveryCompany}
              onChange={(e) =>
                setOrder({ ...order, deliveryCompany: e.target.value })
              }
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formTracking">
            <FormLabel>운송장번호</FormLabel>
            <FormControl
              value={order.tracking}
              placeholder={tracking}
              onChange={(e) => setOrder({ ...order, tracking: e.target.value })}
            />
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

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>상태값 변경 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>{order.seq} 주문의 상태 수정하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
          <Button
            disabled={isProcessing}
            variant="primary"
            onClick={handleSaveButtonClick}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "수정"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
