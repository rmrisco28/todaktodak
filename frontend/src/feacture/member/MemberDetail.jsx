import {
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

export function MemberDetail() {
  const [member, setMember] = useState(null);
  const [params] = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/member?seq=${params.get("seq")}`)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log("always"));
  }, []);

  if (!member) {
    return <Spinner />;
  }

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <h3 className="mb-4">회원 정보 관리</h3>
        <div>
          <FormGroup as={Row} controlId="memberId" className="mb-4">
            <FormLabel column lg={3}>
              고객 번호
            </FormLabel>
            <Col lg={7}>
              <FormControl value={member.memberNo} readOnly={true} />
            </Col>
          </FormGroup>
        </div>
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
        <div>
          <FormGroup controlId="address" className="mb-2">
            <FormLabel>주소</FormLabel>
            <FormControl value={member.addr} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="addressDetail" className="mb-3">
            <FormControl value={member.addrDetail} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="insertDttm" className="mb-3">
            <FormLabel>가입일시</FormLabel>
            <FormControl value={member.insertDttm} readOnly={true} />
          </FormGroup>
        </div>
      </Col>
    </Row>
  );
}
