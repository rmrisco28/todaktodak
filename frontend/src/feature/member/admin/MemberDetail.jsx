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
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const page = params.get("page");

  const handleRedirectToList = () => {
    if (page && page !== "1") {
      navigate(`/member/list?page=${page}`);
    } else {
      navigate(`/member/list`);
    }
  };

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
    if (!adminPassword) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    axios
      .put(`/api/member/${params.get("seq")}/delete`, {
        password: adminPassword,
      })
      .then((res) => {
        console.log("실행완료");
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type, position: "top-center" });
        }
        setModalShow(false);
        setAdminPassword("");
        setError("");
        handleRedirectToList();
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
      <Col xs={10} md={10} lg={6}>
        <h3 className="mb-4 text-center">회원 정보</h3>
        <section className="bg-gray-100 px-3 px-sm-5 py-4 rounded-4">
          {/* 고객 번호 */}
          <div>
            <FormGroup as={Row} controlId="memberNo" className="mb-4">
              <FormLabel column sm={3}>
                고객 번호
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.memberNo}
                  readOnly={true}
                />
              </Col>
            </FormGroup>
          </div>
          {/* 아이디 */}
          <div>
            <FormGroup as={Row} controlId="memberId" className="mb-4">
              <FormLabel column sm={3}>
                아이디
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.memberId}
                  readOnly={true}
                />
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
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.name}
                  readOnly={true}
                />
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
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.email}
                  readOnly={true}
                />
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
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.birthDate}
                  readOnly={true}
                />
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
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.phone}
                  readOnly={true}
                />
              </Col>
            </FormGroup>
          </div>
          {/* 우편번호 */}
          <div>
            <FormGroup as={Row} controlId="postCode" className="mb-2">
              <FormLabel column sm={3}>
                우편번호
              </FormLabel>
              <Col xs={3} sm={3} md={2}>
                <FormControl
                  style={{ textAlign: "center" }}
                  value={member.postCode}
                  readOnly={true}
                />
              </Col>
            </FormGroup>
          </div>
          {/* 주소 */}
          <div>
            <FormGroup as={Row} controlId="address" className="mb-2">
              <FormLabel column sm={3}>
                주소
              </FormLabel>
              <Col sm={7}>
                <FormControl value={member.addr} readOnly={true} />
              </Col>
            </FormGroup>
          </div>
          {/* 상세주소 */}
          <div>
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={3}></FormLabel>
              <Col sm={7}>
                <FormControl value={member.addrDetail} readOnly={true} />
              </Col>
            </FormGroup>
          </div>
          {/* 등록일시 */}
          <div>
            <FormGroup as={Row} controlId="insertDttm" className="mb-3">
              <FormLabel column sm={3}>
                등록일시
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.insertDttm?.replace("T", "  ")}
                  readOnly={true}
                />
              </Col>
            </FormGroup>
          </div>
          {/* 수정일시 */}
          <div>
            <FormGroup as={Row} controlId="updatetDttm" className="mb-3">
              <FormLabel column sm={3}>
                수정일시
              </FormLabel>
              <Col sm={7}>
                <FormControl
                  style={{
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                  }}
                  value={member.updateDttm?.replace("T", "  ")}
                  readOnly={true}
                />
              </Col>
            </FormGroup>
          </div>
          {/* 사용여부 */}
          <div>
            <FormGroup as={Row} controlId="useYn" className="mb-4">
              <FormLabel column sm={3}>
                사용
              </FormLabel>
              <Col sm={7}>
                <FormCheck
                  type="checkbox"
                  id="useYn"
                  label={"사용"}
                  checked={member.useYn}
                  readOnly
                  disabled
                />
              </Col>
            </FormGroup>
          </div>
          {/* 삭제여부 */}
          <div>
            <FormGroup as={Row} controlId="delYn">
              <FormLabel column sm={3}>
                삭제
              </FormLabel>
              <Col sm={7}>
                <FormCheck
                  type="checkbox"
                  id="delYn"
                  label={"삭제"}
                  checked={member.delYn}
                  readOnly
                  disabled
                />
              </Col>
            </FormGroup>
          </div>
        </section>
        {/* 삭제, 수정 버튼*/}
        <div className="mt-3 d-flex justify-content-end">
          <Button
            className="me-3"
            variant="outline-danger"
            onClick={() => setModalShow(true)}
          >
            삭제
          </Button>
          <Button
            variant="outline-primary"
            onClick={() =>
              navigate(
                `/member/modify?seq=${params.get("seq")}&page=${params.get("page")}`,
              )
            }
          >
            수정
          </Button>
        </div>
        <div className="d-flex justify-content-end">
          <Button variant="outline-dark" onClick={handleRedirectToList}>
            목록
          </Button>
        </div>
      </Col>

      {/* 회원 삭제 확인 모달 */}
      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>회원 삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="adminPassword">
            <FormLabel>비밀번호 확인</FormLabel>
            <FormControl
              type="password"
              placeholder="비밀번호"
              value={adminPassword}
              onChange={(e) => {
                setAdminPassword(e.target.value);
                setError(null);
              }}
              className={error ? "is-invalid" : ""}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleDeleteButtonClick}>
            삭제
          </Button>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
