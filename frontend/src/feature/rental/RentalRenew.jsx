import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

export function RentalRenew() {
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();
  const { seq } = useParams();

  useEffect(() => {
    axios
      .get(`/api/rental/renew/${seq}`, {})
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("always");
      });
  }, []);

  function handleReturnButtonClick() {}

  // 결제 버튼 클릭시 공란 여부 확인
  let validate = true;
  if (
    name.trim() === "" ||
    postalCode.trim() === "" ||
    address.trim() === "" ||
    addressDetail.trim() === "" ||
    phone.trim() === ""
  ) {
    validate = false;
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
            내 렌탈 현황(반납)
          </h2>

          <div>
            <FormGroup className="mb-3">
              <FormLabel>제품명</FormLabel>
              <FormControl value={"제품명"} readOnly />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>제품 대여 개수</FormLabel>
              <FormControl value={"제품 대여 개수"} readOnly />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>현재 상태</FormLabel>
              <FormControl value={"대여중"} readOnly />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>남은 대여 기간</FormLabel>
              <FormControl value={"남은 대여기간"} readOnly />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>주문자 성명</FormLabel>
              <FormControl
                value={"이름"}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormGroup>
          </div>

          <div className="mb-3">
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
          </div>
          <div className="d-flex justify-content-center gap-4">
            <Button
              variant="primary"
              style={{ width: "100px" }}
              disabled={!validate}
              onClick={handleReturnButtonClick}
            >
              반납하기
            </Button>
            <Button
              variant="warning"
              style={{ width: "100px" }}
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
