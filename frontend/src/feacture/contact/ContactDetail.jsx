import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router";

export function ContactDetail() {
  let navigate = useNavigate();

  function handleSaveButtonClick() {}

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-3">문의내역</h2>
          <div>
            <FormGroup className="mb-3" controlId="title1">
              <FormLabel>제목</FormLabel>
              <FormControl value={"임시 제목"} readOnly />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3" controlId="content1">
              <FormLabel>내용</FormLabel>
              <FormControl
                readOnly
                as="textarea"
                rows={6}
                value={
                  "임시 내용 readonly @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
                }
              />
            </FormGroup>
          </div>
          <div className="mb-3">
            <FormGroup>
              <FormLabel>작성자</FormLabel>
              <FormControl value={"임시 작성자"} readOnly />
            </FormGroup>
          </div>
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => navigate("/contact/list")}
          >
            목록
          </Button>
          <Button
            variant="warning"
            className="me-2"
            onClick={() => navigate("/contact/modify")}
          >
            수정
          </Button>

          {/*관리자 답변 */}
          <br />
          <hr />
          <div>
            <FormGroup className="mb-3" controlId="content1">
              <FormLabel className="mb-3">문의 답변 </FormLabel>
              <FormControl
                readOnly
                as="textarea"
                rows={6}
                value={`아직 답변이 없습니다. (readonly)

관리자만 수정 할 수 있게 할 예정

아래 버튼도 관리자만 볼 수 있게 할 예정
                `}
              />
            </FormGroup>
          </div>
          <Button
            title="관리자에게만 보이게 할 예정"
            onClick={handleSaveButtonClick}
          >
            답변저장
          </Button>
        </Col>
      </Row>
    </>
  );
}
