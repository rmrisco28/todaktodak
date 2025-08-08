import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function RentalRenew() {
  const [modalShow, setModalShow] = useState(false);
  const [rentalData, setRentalData] = useState(null);
  const [period, setPeriod] = useState(null);
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { seq } = useParams();

  useEffect(() => {
    axios
      .get(`/api/rental/renew/${seq}`, {})
      .then((res) => {
        console.log(res.data);
        setRentalData(res.data);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("always");
      });
  }, []);

  if (!rentalData) return <div>로딩 중...</div>;

  function handleReturnButtonClick() {
    if (period === null) {
      alert("기간을 선택해주세요.");
    } else {
      console.log(rentalData.startDttm);
      console.log(rentalData.endDttm);
      console.log(period);
      axios
        .get(`/api/rental/renew/finish/${seq}?period=${period}`, {})
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          navigate("/rental/list");
        })
        .catch((err) => {
          console.log("no");
        })
        .finally(() => {
          console.log("always");
        });
    }
  }

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
            내 렌탈 현황(연장)
          </h2>

          <div>
            <FormGroup className="mb-3">
              <FormLabel>제품명</FormLabel>
              <FormControl value={rentalData.productNoName} disabled />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>제품 대여 개수</FormLabel>
              <FormControl value={rentalData.orderNoOrderCount} disabled />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>남은 대여 기간</FormLabel>
              <FormControl value={rentalData.endDttm} disabled />
            </FormGroup>
          </div>

          <FormGroup className="mb-3">
            <FormLabel>추가 연장 기간</FormLabel>
            <FormSelect
              className="mb-3"
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value={null}>연장기간 선택</option>
              <option value={10}>10일 연장</option>
              <option value={30}>30일 연장</option>
              <option value={90}>90일 연장</option>
              <option value={180}>180일 연장</option>
            </FormSelect>
          </FormGroup>

          <div>
            <FormGroup className="mb-3">
              <FormLabel>주문자 성명</FormLabel>
              <FormControl value={rentalData.orderNoName} disabled />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>연락처</FormLabel>

              <FormControl value={rentalData.orderNoPhone} disabled />
            </FormGroup>
          </div>
          {/*    <div className="mb-3">
            <FormGroup>
              <FormLabel>남기실 메모</FormLabel>
              <FormControl
                type="textarea"
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </FormGroup>
          </div>*/}
          <div className="d-flex justify-content-center gap-4">
            <Button
              variant="primary"
              style={{ width: "150px", marginRight: "10px" }}
              onClick={handleReturnButtonClick}
            >
              연장하기
            </Button>
            <Button
              variant="warning"
              style={{ width: "150px", marginLeft: "10px" }}
              onClick={() => {
                setModalShow(true);
              }}
            >
              취소
            </Button>
          </div>
        </Col>

        {/* 취소 모달*/}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>연장 취소 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            연장 신청하지 않고 이동하시겠습니까?
            <br />
            작성하신 내용은 삭제됩니다.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              뒤로
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                navigate("/rental/list");
              }}
            >
              목록으로
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}
