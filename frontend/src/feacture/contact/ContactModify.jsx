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

export function ContactModify() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [modalShow, setModalShow] = useState(false);

  let navigate = useNavigate();

  function handleSaveButtonClick() {}

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-3">문의 내용 수정</h2>
          <div className="mb-3">
            <FormGroup>
              <FormLabel>제목</FormLabel>
              <FormControl
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </FormGroup>
          </div>
          <div className="mb-3">
            <FormGroup>
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
          {/*버튼*/}
          <Button
            variant="danger"
            className="me-2"
            onClick={() => {
              setModalShow(true);
            }}
          >
            취소
          </Button>
          <Button onClick={handleSaveButtonClick}>저장</Button>
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
                navigate("/contact/detail");
              }}
            >
              게시판으로
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}
