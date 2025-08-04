import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export function BuyAdd() {
  let navigate = useNavigate();

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center">
            <h2>결제 완료</h2>
          </div>
          <hr />
          <div className="text-center mb-3">
            정상적으로 결제 완료되었습니다.
          </div>

          <div className="d-flex justify-content-center gap-3 mb-4">
            <Button
              style={{ width: "250px" }}
              onClick={() => {
                navigate("/sale/list");
              }}
              variant="success"
            >
              추가 렌탈 제품 확인하기
            </Button>
            <Button
              style={{ width: "250px" }}
              onClick={() => {
                navigate("/order/list");
              }}
              variant="warning"
            >
              주문 조회 현황
            </Button>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <Button
              style={{ width: "250px" }}
              onClick={() => {
                navigate("/rental/list");
              }}
              variant="primary"
            >
              대여 현황 확인하기
            </Button>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="secondary"
            >
              홈으로
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
