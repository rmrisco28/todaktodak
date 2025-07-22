import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export function InquiryList() {
  let navigate = useNavigate();

  return (
    <>
      <Row>
        <Col>
          <h2 className="mb-4">문의사항</h2>

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
              <tr>
                <td>1</td>
                <td>어떻게 빌리나요</td>
                <td>첫방문자</td>
                <td>2025.07.22</td>
                <td>365</td>
              </tr>
            </tbody>
          </table>
          <Button onClick={() => navigate("/inquiry/add")}>문의</Button>
        </Col>
      </Row>
    </>
  );
}
