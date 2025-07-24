import { useNavigate } from "react-router";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export function ContactList() {
  const [contactList, setContactList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/contact/list")
      .then((res) => {
        console.log("ok");
        setContactList(res.data);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-4">문의게시판</h2>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일시</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {contactList.map((contact) => (
                <tr
                  key={contact.seq}
                  onClick={() => navigate(`/contact/detail/${contact.seq}`)}
                >
                  <td>{contact.seq}</td>
                  <td>{contact.title}</td>
                  <td>{contact.name}</td>
                  <td>{contact.insertDttm}</td>
                  <td>{contact.view}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={() => navigate("/contact/add")}>글쓰기</Button>
        </Col>
      </Row>
    </>
  );
}
