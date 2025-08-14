import {
  Button,
  Col,
  FormCheck,
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
  const [useYn, setUseYn] = useState(true);
  const { seq } = useParams();
  const [isProcessing, setIsProcessing] = useState();

  const [modalShow, setModalShow] = useState(false);

  let navigate = useNavigate();
  const isAdmin =
    new URLSearchParams(location.search).get("isAdmin") === "true";

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
        setUseYn(data.useYn);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, [seq]);

  let validateTitle = true;
  let validateContent = true;
  let validateName = true;
  if (title.trim() === "") {
    validateTitle = false;
  } else if (content.trim() === "") {
    validateContent = false;
  } else if (name.trim() === "") {
    validateName = false;
  }

  function handleSaveButtonClick() {
    if (!validateTitle) {
      alert("제목을 입력해주세요.");
    } else if (!validateContent) {
      alert("내용을 입력해주세요.");
    } else if (!validateName) {
      alert("이름을 입력해주세요.");
    } else {
      axios
        .put(`/api/contact/modify/${seq}`, {
          seq,
          title,
          content,
          name,
          useYn,
        })
        .then((res) => {
          console.log("ok");
          navigate(`/contact/list${isAdmin ? "?isAdmin=true" : ""}`, {
            replace: true,
          });
          alert(res.data.message);
        })
        .catch((err) => {
          console.log("no");
        })
        .finally(() => {
          console.log("finally");
        });
    }
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-3">문의 내용 수정</h2>
          {isAdmin && (
            <FormCheck
              type="checkbox"
              label={useYn ? "게시물 보임" : "게시물 숨김"}
              checked={useYn}
              onChange={(e) => setUseYn(e.target.checked)}
              value={useYn}
            />
          )}
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
                disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </div>

          {/*버튼*/}
          <Button
            onClick={handleSaveButtonClick}
            disabled={isProcessing || !validate}
            className="me-2"
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
          <Button
            variant="danger"
            className="me-2"
            onClick={() => {
              setModalShow(true);
            }}
          >
            취소
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
