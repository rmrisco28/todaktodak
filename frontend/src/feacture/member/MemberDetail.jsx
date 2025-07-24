import { Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

export function MemberDetail() {
  const [member, setMember] = useState("");
  const [params] = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/member?memberId=${params.get("memberId")}`)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log("always"));
  }, []);

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <h3>회원 정보</h3>
        <div>
          <FormGroup controlId="memberId" className="mb-3">
            <FormLabel>아이디</FormLabel>
            <FormControl value={member?.memberId || ""} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="name" className="mb-3">
            <FormLabel>이름</FormLabel>
            <FormControl value={member?.name || ""} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="email" className="mb-3">
            <FormLabel>이메일</FormLabel>
            <FormControl value={member?.email || ""} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="birthDate" className="mb-3">
            <FormLabel>생년월일</FormLabel>
            <FormControl value={member?.birthDt || ""} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="phone" className="mb-3">
            <FormLabel>연락처</FormLabel>
            <FormControl value={member?.phone || ""} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="postCode" className="mb-3">
            <FormLabel>우편번호</FormLabel>
            <FormControl value={member?.postCode || ""} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="address" className="mb-2">
            <FormLabel>주소</FormLabel>
            <FormControl value={member?.addr || ""} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="addressDetail" className="mb-3">
            <FormControl value={member?.addrDetail || ""} readOnly={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="insertDttm" className="mb-3">
            <FormLabel>가입일시</FormLabel>
            <FormControl value={member?.insertDttm || ""} readOnly={true} />
          </FormGroup>
        </div>
      </Col>
    </Row>
  );
}
