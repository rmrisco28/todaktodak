import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  ListGroup,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

export function MemberMyInfo() {
  const [member, setMember] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  const { logout } = useContext(AuthenticationContext);

  const alertShow = useRef(false);

  useEffect(() => {
    axios
      .get(`/api/member/myinfo`)
      .then((res) => {
        setMember(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401 && !alertShow.current) {
          alert("로그인 후 이용 가능합니다.");
          alertShow.current = true;
          navigate("/login");
        }
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  // 회원탈퇴 버튼
  function handleDeleteButtonClick() {
    axios
      .put(`/api/member/withdraw`)
      .then((res) => {
        console.log("ok");
        const message = res.data.message;
        toast(message.text, { type: message.type });
        navigate("/");
        logout();
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
    <Row className="d-flex justify-content-center">
      {/* 왼쪽 사이드바 */}
      <Col xs={0} sm={0} md={3} className="border-end my-6 d-none d-md-block ">
        <div className="text-center mb-4">
          <h3 className="mt-3">{member.memberId}</h3>
          <div className="text-muted fs-6">{member.email}</div>
          <br />
          <hr />
        </div>
        <ListGroup variant="flush">
          <ListGroup.Item
            action
            onClick={() => navigate(`/member/myinfo/modify`)}
            style={{ border: "none" }}
            className="fs-5"
          >
            정보 변경
          </ListGroup.Item>

          <ListGroup.Item
            action
            onClick={() => setModalShow(true)}
            style={{ border: "none" }}
            className="fs-5"
          >
            회원 탈퇴
          </ListGroup.Item>
        </ListGroup>
      </Col>

      {/* 오른쪽 상세 정보 */}
      <Col xs={12} sm={12} md={7} className="p-2 mx-5">
        <h2 className="mb-4">내 정보</h2>
        <section
          className="px-4 py-4"
          style={{ border: "4px solid #F0F3F6", borderRadius: "10px" }}
        >
          <Form style={{ width: "100%" }}>
            {/* 아이디 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                아이디
              </FormLabel>
              <Col sm={6}>
                <FormControl
                  disabled
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.memberId}
                />
              </Col>
            </FormGroup>

            {/* 이름 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                이름
              </FormLabel>
              <Col sm={6}>
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.name}
                  disabled
                />
              </Col>
            </FormGroup>

            {/* 이메일 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                이메일
              </FormLabel>
              <Col sm={6}>
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.email}
                  disabled
                />
              </Col>
            </FormGroup>

            {/* 생년월일 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                생년월일
              </FormLabel>
              <Col sm={6}>
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.birthDate}
                  disabled
                />
              </Col>
            </FormGroup>

            {/* 연락처 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                연락처
              </FormLabel>
              <Col sm={6}>
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.phone}
                  disabled
                />
              </Col>
            </FormGroup>

            {/* 우편번호 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                우편번호
              </FormLabel>
              <Col xs={3} sm={3} md={3} lg={2}>
                <FormControl
                  style={{
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.postCode}
                  disabled
                />
              </Col>
            </FormGroup>

            {/* 주소 */}
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                주소
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  style={{
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.addr}
                  disabled
                />
              </Col>
            </FormGroup>

            {/* 상세 주소 */}
            <FormGroup as={Row}>
              <FormLabel column sm={2}></FormLabel>
              <Col sm={7}>
                <FormControl
                  style={{
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.addrDetail || ""}
                  disabled
                />
              </Col>
            </FormGroup>
          </Form>
        </section>
      </Col>

      {/*  탈퇴 확인 모달*/}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>회원탈퇴를 하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleDeleteButtonClick}>
            탈퇴
          </Button>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
