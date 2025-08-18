import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
import axios from "axios";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

export function ContactAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  let navigate = useNavigate();

  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    if (user === null) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
  }, []);

  let validateTitle = true;
  let validateContent = true;
  if (title.trim() === "") {
    validateTitle = false;
  } else if (content.trim() === "") {
    validateContent = false;
  }

  if (user === null) {
    return <Spinner />;
  }

  function handleSaveButtonClick() {
    if (!validateTitle) {
      alert("제목을 입력해주세요.");
    } else if (!validateContent) {
      alert("내용을 입력해주세요.");
    } else {
      setIsProcessing(true);
      axios
        .post("/api/contact/add", {
          title: title,
          content: content,
          name: user.name,
        })
        .then((res) => {
          console.log("ok");
          navigate("/contact/list");
          alert(res.data.message);
        })
        .catch((err) => {
          console.log("no");
          console.log("저장실패");
        })
        .finally(() => {
          console.log("finally");
          setIsProcessing(false);
        });
    }
  }

  console.log();

  return (
    // 가운데 정렬
    <>
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
          <div className="mb-3">
            <FormGroup>
              <FormLabel>작성자</FormLabel>
              <FormControl value={user.name} disabled />
            </FormGroup>
          </div>

          {/*버튼*/}
          <Button
            onClick={handleSaveButtonClick}
            disabled={isProcessing}
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
                navigate("/contact/list");
              }}
            >
              목록으로
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>

      {/*todo 2차*/}
      <h2>2차</h2>
    </>
  );
}
