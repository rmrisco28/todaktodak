import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function DeliveryAdd() {
  const [tcode, setTcode] = useState("00");
  const [name, setName] = useState("");
  const [callNo, setCallNo] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  let validate = true;
  if (name.trim() === "" || tcode.trim() === "") {
    validate = false;
  }

  function handleSaveButtonClick() {
    setIsProcessing(true);
    axios
      .postForm("/api/delivery/add", {
        code: tcode,
        name: name,
        callNo: callNo,
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
        <h2 className="mb-4">배송업체 등록</h2>
        <div>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel>택배사코드(스윗트래커연동)</FormLabel>
            <FormControl
              value={tcode}
              onChange={(e) => setTcode(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel>배송업체명</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel>업체 연락처</FormLabel>
            <FormControl
              value={callNo}
              onChange={(e) => setCallNo(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div className="mb-3">
          <Button
            onClick={handleSaveButtonClick}
            disabled={isProcessing || !validate}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
        </div>
      </Col>
    </Row>
  );
}
