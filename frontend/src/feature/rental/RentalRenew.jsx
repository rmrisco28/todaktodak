import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export function RentalRenew() {
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <Col>
          {/* 대여 상단 제목*/}
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
            내 렌탈 현황(연장)
          </h2>
          <div></div>
        </Col>
      </Row>
    </>
  );
}
