import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Table } from "react-bootstrap";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/member/list")
      .then((res) => {
        setMemberList(res.data);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  return (
    <Row>
      <Col>
        <h2>회원목록</h2>
        <Table hover={true} striped={true}>
          <thead>
            <tr>
              <th>시퀀스</th>
              <th>ID</th>
              <th>고객명</th>
              <th>등록일시</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member) => (
              <tr key={member.id} style={{ cursor: "pointer" }}>
                <td>{member.id}</td>
                <td>{member.memberId}</td>
                <td>{member.name}</td>
                <td>{member.insertDttm}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
