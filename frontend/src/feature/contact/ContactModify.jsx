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
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export function ContactModify() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const { seq } = useParams();
  const [isProcessing, setIsProcessing] = useState();

  const [modalShow, setModalShow] = useState(false);

  let navigate = useNavigate();

  let validate = true;
  if (title.trim() === "" || content.trim() === "" || name.trim() === "") {
    validate = false;
  }

  useEffect(() => {
    axios
      .get(`/api/contact/detail/${seq}`, {})
      .then((res) => {
        console.log("ok");
        const data = res.data;
        setTitle(data.title);
        setContent(data.content);
        setName(data.name);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, [seq]);

  function handleSaveButtonClick() {
    axios
      .put(`/api/contact/modify/${seq}`, {
        seq,
        title,
        content,
        name,
      })
      .then((res) => {
        console.log("ok");
        navigate("/contact/list");
        alert(res.data.message);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }

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

          <div className="mb-3">
            <FormGroup>
              <FormLabel>작성자</FormLabel>
              <FormControl
                value={name}
                onChange={(e) => setName(e.target.value)}
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
          <Button
            onClick={handleSaveButtonClick}
            disabled={isProcessing || !validate}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
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
                navigate(`/contact/detail/${seq}`);
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
