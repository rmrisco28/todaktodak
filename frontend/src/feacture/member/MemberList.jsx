import { useEffect } from "react";
import axios from "axios";
import { Col, Row, Table } from "react-bootstrap";

export function MemberList() {
  useEffect(() => {
    axios
      .get("/api/member/list")
      .then((res) => {})
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
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ cursor: "pointer" }}>
              <td>123</td>
              <td>123</td>
              <td>1123</td>
              <td>1123</td>
              <td>1123</td>
            </tr>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>1123</td>
              <td>1123</td>
              <td>1123</td>
            </tr>
            <tr>
              <td>123</td>
              <td>123</td>
              <td>1123</td>
              <td>1123</td>
              <td>1123</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
