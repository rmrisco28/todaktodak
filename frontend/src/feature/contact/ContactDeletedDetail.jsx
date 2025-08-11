import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function ContactDeletedDetail() {
  const [contact, setContact] = useState(null);
  const [reply, setReply] = useState("");
  const [modalShow, setModalShow] = useState();

  const navigate = useNavigate();
  const { seq } = useParams();

  useEffect(() => {
    axios
      .get(`/api/contact/deleted/detail/${seq}`, {})
      .then((res) => {
        console.log("ok");
        const data = res.data;
        setContact(data);
        setReply(data.reply);
      })
      .catch((err) => {
        console.log("no");
        console.log(err);
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);

  if (!contact) return <div>로딩 중...</div>;

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2
            className="mb-4"
            style={{
              // textAlign: "center",
              cursor: "pointer",
              width: "fit-content",
              transition: "color 0.2s",
              color: "#000",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#007bff")}
            onMouseLeave={(e) => (e.target.style.color = "#000")}
            onClick={() => {
              navigate("/contact/deleted/list");
            }}
          >
            삭제된 {seq}번 게시물
          </h2>
          <div className="mb-3">
            <FormGroup>
              <FormLabel>제목</FormLabel>
              <FormControl value={contact.title} readOnly />
            </FormGroup>
          </div>

          <div className="mb-3">
            <FormGroup>
              <FormLabel>내용</FormLabel>
              <FormControl
                value={contact.content}
                as="textarea"
                rows={6}
                readOnly
              />
            </FormGroup>
          </div>

          <div className="mb-3">
            <FormGroup>
              <FormLabel>작성자</FormLabel>
              <FormControl value={contact.name} readOnly />
            </FormGroup>
          </div>

          <div className="mb-3">
            <FormGroup>
              <FormLabel>문의 답변</FormLabel>
              <FormControl value={reply} as="textarea" rows={6} readOnly />
            </FormGroup>
          </div>

          <div>
            <Button
              className="me-2"
              onClick={() => navigate("/contact/list?isAdmin=true")}
            >
              전체 목록
            </Button>
            <Button
              className="me-2"
              variant="danger"
              onClick={() => navigate("/contact/deleted/list")}
            >
              삭제 목록
            </Button>
            <Button
              variant="warning"
              className="me-2"
              onClick={() => setModalShow(true)}
            >
              복구
            </Button>
          </div>
        </Col>

        {/*모오오오오오오오오오오오오오오오다아아아아아아아아아아아아아아아아알ㄹㄹㄹㄹ*/}
        {/*모오오오오오오오오오오오오오오오다아아아아아아아아아아아아아아아아알ㄹㄹㄹㄹ*/}
        {/*모오오오오오오오오오오오오오오오다아아아아아아아아아아아아아아아아알ㄹㄹㄹㄹ*/}
        {/* 복구 모달*/}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>복구 여부 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>정말 게시물을 복구하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              뒤로
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                axios
                  .delete(`/api/contact/restore/${seq}`)
                  .then((res) => {
                    console.log("ok");
                    alert(res.data.message);
                    navigate("/contact/list?isAdmin=true", { replace: true });
                  })
                  .catch((err) => {
                    console.log("no");
                  })
                  .finally(() => {
                    console.log("finally");
                  });
              }}
            >
              복구
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}
