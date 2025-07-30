import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";

export function MyPageMyInfo() {
  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <h2 className="mb-4">내 정보</h2>
        <div>
          <FormGroup as={Row} controlId="memberId" className="mb-4">
            <FormLabel column lg={3}>
              아이디
            </FormLabel>
            <Col lg={7}>
              <FormControl />
            </Col>
          </FormGroup>
        </div>
        {/* 비밀번호 */}
        <div>
          <FormGroup as={Row} controlId="password" className="mb-4">
            <FormLabel column lg={3}>
              비밀번호
            </FormLabel>
            <Col lg={7} className="text-center">
              <Button>비밀번호 변경</Button>
            </Col>
          </FormGroup>
        </div>
        {/* 이름 */}
        <div>
          <FormGroup as={Row} controlId="name" className="mb-4">
            <FormLabel column sm={3}>
              이름
            </FormLabel>
            <Col sm={7}>
              <FormControl />
            </Col>
          </FormGroup>
        </div>
        {/* 이메일 */}
        <div>
          <FormGroup as={Row} controlId="email" className="mb-4">
            <FormLabel column sm={3}>
              이메일
            </FormLabel>
            <Col sm={7}>
              <FormControl />
            </Col>
          </FormGroup>
        </div>
        {/* 생년월일 */}
        <div>
          <FormGroup as={Row} controlId="birthDate" className="mb-4">
            <FormLabel column sm={3}>
              생년월일
            </FormLabel>
            <Col sm={7}>
              <FormControl />
            </Col>
          </FormGroup>
        </div>
        {/* 연락처 */}
        <div>
          <FormGroup as={Row} controlId="phone" className="mb-4">
            <FormLabel column sm={3}>
              연락처
            </FormLabel>
            <Col sm={7}>
              <FormControl />
            </Col>
          </FormGroup>
        </div>
        {/* 우편번호 */}
        <div>
          <FormGroup as={Row} controlId="postCode" className="mb-4">
            <FormLabel column sm={3}>
              우편번호
            </FormLabel>
            <Col sm={7}>
              <FormControl />
            </Col>
          </FormGroup>
        </div>
        {/* 주소 */}
        <div>
          <FormGroup controlId="address" className="mb-2">
            <FormLabel>주소</FormLabel>
            <FormControl />
          </FormGroup>
        </div>
        {/* 상세주소 */}
        <div>
          <FormGroup controlId="addressDetail" className="mb-3">
            <FormControl />
          </FormGroup>
        </div>
      </Col>
    </Row>
  );
}
