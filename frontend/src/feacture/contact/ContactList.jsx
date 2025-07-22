import { useNavigate } from "react-router";
import { Button, Col, Row } from "react-bootstrap";

export function ContactList() {
  let navigate = useNavigate();

  function handleTableRowClick() {
    // todo axios로 게시판 데이터 가져오기
  }

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
              <tr
                style={{ cursor: "pointer" }}
                // onClick={handleTableRowClick}
                onClick={() => navigate("/contact/detail")}
              >
                <td>1</td>
                <td>어떻게 빌리나요</td>
                <td>첫방문자</td>
                <td>2025.07.22</td>
                <td>365</td>
              </tr>
            </tbody>
          </table>
          <Button onClick={() => navigate("/contact/add")}>글쓰기</Button>
        </Col>
      </Row>
    </>
  );
}
