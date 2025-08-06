import { useNavigate, useParams } from "react-router";
import { Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export function RentalReturn() {
  const [rentalData, setRentalData] = useState(null);
  const { seq } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/rental/return/${seq}`, {})
      .then((res) => {
        console.log(res.data);
        setRentalData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);
  useEffect(() => {
    axios.get();
  }, []);

  if (!rentalData) return <div>로딩 중...</div>;

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
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
            내 렌탈 현황(반납)
          </h2>

          <div>
            <FormGroup className="mb-3">
              <FormLabel>제품명</FormLabel>
              <FormControl value={rentalData.productNoName} readOnly />
            </FormGroup>
          </div>
        </Col>
      </Row>
    </>
  );
}
