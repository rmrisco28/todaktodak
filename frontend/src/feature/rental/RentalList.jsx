import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";

export function RentalList() {
  const navigate = useNavigate();

  return (
    <>
      <Row className="justify-content-center">
        <Col md={12} lg={10} className="mb-4">
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
            onClick={() => navigate("/rental/list")}
          >
            내 렌탈 현황
          </h2>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>번호</th>
                <th>제품명</th>
                <th>개수</th>
                <th>가격</th>
                <th>대여일시</th>
                <th>반납일시</th>
                <th>상태</th>
                <th>반납하기</th>
                <th>연장하기</th>
              </tr>
            </thead>
            <tbody>
              <tr
                onClick={() => {
                  axios
                    .then((res) => {
                      console.log("ok");
                    })
                    .catch(() => {
                      console.log("no");
                    })
                    .finally(() => {
                      console.log("always");
                    });
                }}
              >
                <td>1</td>
                <td>가나다라</td>
                <td>5개</td>
                <td>39,800원</td>
                <td>2025.08.04.</td>
                <td>2025.12.04.</td>
                <td>대여중</td>
                <td>
                  <Button style={{}}>반납하기</Button>
                </td>
                <td>
                  <Button style={{}}>연장하기</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
}
