import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export function MemberMyInfo() {
  const [member, setMember] = useState(null);
  const { memberId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/member/myinfo/${memberId}`)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  if (!member) {
    return <Spinner />;
  }

  function handleDeleteButtonClick() {}

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
              <FormControl value={member.memberId} readOnly={true} />
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
              <FormControl value={member.name} readOnly={true} />
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
              <FormControl value={member.email} readOnly={true} />
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
              <FormControl value={member.birthDate} readOnly={true} />
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
              <FormControl value={member.phone} readOnly={true} />
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
              <FormControl value={member.postCode} readOnly={true} />
            </Col>
          </FormGroup>
        </div>
        {/* 주소 */}
        <div>
          <FormGroup controlId="address" className="mb-2">
            <FormLabel>주소</FormLabel>
            <FormControl value={member.addr} readOnly={true} />
          </FormGroup>
        </div>
        {/* 상세주소 */}
        <div>
          <FormGroup controlId="addressDetail" className="mb-3">
            <FormControl value={member.addrDetail} readOnly={true} />
          </FormGroup>
        </div>

        {/* 수정, 탈퇴 버튼*/}
        <div>
          <Button
            className="mb-4"
            variant="outline-primary"
            onClick={() => navigate(`/member/myinfo/modify/${memberId}`)}
          >
            수정
          </Button>
        </div>
        <div>
          <Button
            className="mb-2"
            variant="outline-dark"
            onClick={handleDeleteButtonClick}
          >
            회원 탈퇴
          </Button>
        </div>
      </Col>
    </Row>
  );
}
