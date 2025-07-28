import { Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function ContactDeletedDetail() {
  const [contact, setContact] = useState(null);
  const [reply, setReply] = useState("");

  const navigate = useNavigate();
  const { seq } = useParams();

  useEffect(() => {
    axios
      .get(`/api/contact/deleted/detail/${seq}`, {})
      .then((res) => {
        console.log("ok");
        const data = res.data;
        console.log(res.data);
        setContact(data);
        setReply(data.reply);
        console.log(contact);
        console.log(reply);
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
              color: "#000"
            }}
            onMouseEnter={(e) => (e.target.style.color = "#007bff")}
            onMouseLeave={(e) => (e.target.style.color = "#000")}
            onClick={() => {
              navigate("/contact/delete/list");
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
              <FormControl value={contact.content} as="textarea" rows={6} readOnly />
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
        </Col>
      </Row>
    </>
  );
}
