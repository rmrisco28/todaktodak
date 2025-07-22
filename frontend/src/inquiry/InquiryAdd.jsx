import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";

export function InquiryAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalShow, setModalShow] = useState(false);

  let navigate = useNavigate();

  return (
    // 가운데 정렬
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2>문의사항 작성</h2>
        <div>
          <FormGroup className="mb-3" controlId="title1">
            <FormLabel>제목</FormLabel>
            <FormControl
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="content1">
            <FormLabel>내용</FormLabel>
            <FormControl
              as="textarea"
              rows={6}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </FormGroup>
        </div>

        <Button
          variant="danger"
          className="me-2"
          onClick={() => {
            setModalShow(true);
          }}
        >
          취소
        </Button>
        <Button>저장</Button>
      </Col>

      {/* 취소 모달*/}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>저장 여부 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>저장하지않고 이동하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            뒤로
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              navigate("/inquiry");
            }}
          >
            목록으로
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
