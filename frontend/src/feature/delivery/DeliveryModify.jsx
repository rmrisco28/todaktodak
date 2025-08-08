import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

export function DeliveryModify() {
  const [delivery, setDelivery] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { seq } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/delivery/detail/${seq}`)
      .then((res) => {
        setDelivery(res.data);
      })
      .catch((err) => {
        toast("해당 배송업체가 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  if (!delivery) {
    return <Spinner />;
  }

  let validate = true;
  if (delivery.name.trim() === "") {
    validate = false;
  }

  function handleSaveButtonClick() {
    setIsProcessing(true);
    axios
      .putForm(`/api/delivery/modify/${seq}`, {
        name: delivery.name,
        callNo: delivery.callNo,
      })
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate("/delivery/list");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">배송업체 수정</h2>
        <div>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel>배송업체명</FormLabel>
            <FormControl
              value={delivery.name}
              onChange={(e) =>
                setDelivery({ ...delivery, name: e.target.value })
              }
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel>업체 연락처</FormLabel>
            <FormControl
              value={delivery.callNo}
              onChange={(e) =>
                setDelivery({ ...delivery, callNo: e.target.value })
              }
            ></FormControl>
          </FormGroup>
        </div>
        <div className="mb-3">
          <Button
            className="me-2"
            onClick={() => navigate(-1)}
            variant="outline-secondary"
          >
            취소
          </Button>
          <Button
            onClick={() => setModalShow(true)}
            disabled={isProcessing || !validate}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "수정"}
          </Button>
        </div>
      </Col>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>배송업체 수정 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>{delivery.seq} 번 배송업체 수정하시겠습니까?</Modal.Body>
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
