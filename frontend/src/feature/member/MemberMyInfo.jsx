import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export function MemberMyInfo() {
  const [member, setMember] = useState(null);
  const { memberId } = useParams();

  const [modalShow, setModalShow] = useState(false);

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

  // 회원탈퇴 버튼
  function handleDeleteButtonClick() {
    axios
      .put(`/api/member/${memberId}/withdraw`)
      .then((res) => {
        console.log("ok");
        const message = res.data.message;
        toast(message.text, { type: message.type });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }

  if (!member) {
    return <Spinner />;
  }

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

        {/* 변경, 탈퇴 버튼*/}
        <div>
          <Button
            className="mb-4"
            variant="outline-primary"
            onClick={() => navigate(`/member/myinfo/modify/${memberId}`)}
          >
            정보 변경
          </Button>
        </div>
        <div>
          <Button
            className="mb-2"
            variant="outline-danger"
            onClick={() => setModalShow(true)}
          >
            회원 탈퇴
          </Button>
        </div>
      </Col>

      {/*  탈퇴 확인 모달*/}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>회원탈퇴를 하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
          <Button variant="outline-danger" onClick={handleDeleteButtonClick}>
            탈퇴
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
