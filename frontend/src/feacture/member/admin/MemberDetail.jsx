import {
  Button,
  Col,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export function MemberDetail() {
  const [member, setMember] = useState(null);
  const [params] = useSearchParams();
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/member?seq=${params.get("seq")}`)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log("always"));
  }, []);

  // 삭제 버튼 클릭
  function handleDeleteButtonClick() {
    axios
      .put(`/api/member/${params.get("seq")}/delete`)
      .then((res) => {
        console.log("실행완료");
        const message = res.data.message;
        toast(message.text, { type: message.type });
        navigate("list"); // 목록 페이지로 이동
      })
      .catch((err) => {
        console.log(err);
        const message = err.response.data.message;
        toast(message.text, { type: message.type });
      })
      .finally(() => {
        console.log("always");
        setModalShow(false);
      });
  }

  if (!member) {
    return <Spinner />;
  }

  return (
    <Row className="justify-content-center">
      <Col lg={4}>
        <h3 className="mb-4">회원 정보 관리</h3>
        {/* 고객 번호 */}
        <div>
          <FormGroup as={Row} controlId="memberNo" className="mb-4">
            <FormLabel column lg={3}>
              고객 번호
            </FormLabel>
            <Col lg={7}>
              <FormControl value={member.memberNo} readOnly={true} />
            </Col>
          </FormGroup>
        </div>
        {/* 아이디 */}
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
        {/* 등록일시 */}
        <div>
          <FormGroup controlId="insertDttm" className="mb-3">
            <FormLabel>등록일시</FormLabel>
            <FormControl value={member.insertDttm} readOnly={true} />
          </FormGroup>
        </div>
        {/* 수정일시 */}
        <div>
          <FormGroup controlId="updatetDttm" className="mb-3">
            <FormLabel>수정일시</FormLabel>
            <FormControl value={member.updateDttm} readOnly={true} />
          </FormGroup>
        </div>
        {/* 회원상태 */}
        <div>
          <FormGroup as={Row} controlId="state" className="mb-4">
            <FormLabel column sm={3}>
              회원상태
            </FormLabel>
            <Col sm={7}>
              <FormControl value={member.state} readOnly={true} />
            </Col>
          </FormGroup>
        </div>
        {/* 사용여부 */}
        <div>
          <FormGroup as={Row} controlId="useYn" className="mb-4">
            <FormLabel column sm={3}>
              사용여부
            </FormLabel>
            <Col sm={7} className="d-flex align-items-center">
              <FormCheck
                type="switch"
                id="useYn-switch"
                label={member.useYn ? "사용중" : "미사용"}
                checked={member.useYn}
                readOnly
                disabled
              />
            </Col>
          </FormGroup>
        </div>
        {/* 삭제여부 */}
        <div>
          <FormGroup as={Row} controlId="delYn" className="mb-4">
            <FormLabel column sm={3}>
              삭제여부
            </FormLabel>
            <Col sm={7}>
              <FormCheck
                type="switch"
                id="delYn-switch"
                label={member.delYn ? "삭제" : "미삭제"}
                checked={member.delYn}
                readOnly
                disabled
              />
            </Col>
          </FormGroup>
        </div>
        {/* 삭제, 수정, 목록 버튼*/}
        <div>
          <Button
            className="me-2"
            variant="outline-danger"
            onClick={() => setModalShow(true)}
          >
            삭제
          </Button>
          <Button
            className="me-5"
            variant="outline-primary"
            onClick={() => navigate(`/member/modify?seq=${params.get("seq")}`)}
          >
            수정
          </Button>
          <Button
            className="ms-5"
            variant="outline-dark"
            onClick={() => navigate(`/member/list`)}
          >
            목록
          </Button>
        </div>
      </Col>

      {/* 회원 삭제 확인 모달 */}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>회원 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>{member.memberId} 회원을 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
          <Button variant="outline-danger" onClick={handleDeleteButtonClick}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
