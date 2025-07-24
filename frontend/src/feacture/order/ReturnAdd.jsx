import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function ReturnAdd() {
  const [returnDate, setReturnDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  function handleRtnSaveButtonClick() {
    // 반납 신청 확인
    axios
      .get(`api/return/add`)
      .then((res) => {
        console.log("잘됨");
      })
      .catch((err) => {
        console.log("안됨");
      })
      .finally(() => {
        console.log("항상");
      });
  }

  const navigate = useNavigate();

  function handleMyPageButton() {
    // 로그인과 동시에 마이페이지로 이동
    navigate("/member");
  }

  function handleReturnAddButton() {
    // 반납에 필요한 정보 입력하는 페이지로 이동
    navigate("/return/add");
  }

  function handleNoticeFaqButton() {
    // 공지사항&FAQ로 이동
    navigate("/notice");
  }

  function handleContactButton() {
    // 고객센터로 이동
    navigate("/contact/list");
  }

  return (
    <div>
      <div>
        <FormGroup>
          <FormLabel>최초 주문자 성명</FormLabel>
          <input
            type="text"
            value={name}
            placeholder="이름을 입력하세요."
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormLabel>연락처</FormLabel>
          <input
            type="text"
            value={phone}
            placeholder="연락처를 입력하세요."
            onChange={(e) => setPhone(e.target.value)}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormLabel>이메일</FormLabel>
          <input
            type="email"
            value={email}
            placeholder="이메일을 입력하세요."
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormLabel>주소</FormLabel>
          <input
            type="text"
            value={address}
            placeholder="주소를 입력하세요."
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
      </div>
      <div></div>
      <div>
        <FormLabel>기타 알림 사항</FormLabel>
        <FormGroup>
          <FormControl
            as="textarea"
            rows={6}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </FormGroup>
      </div>
      <FormGroup>
        <FormLabel>반납 신청일</FormLabel>
        <FormControl
          type="datetime-local"
          readOnly={true}
          value={returnDate}
          disabled
        />
      </FormGroup>
      <button onClick={handleRtnSaveButtonClick}>반납 신청하기</button>

      <Container className="mt-4">
        <Form>
          <Form.Group>
            <Form.Label>로고</Form.Label>
            <Button onClick={handleMyPageButton}>로그인/마이페이지</Button>
          </Form.Group>

          <Form.Group>
            <Button onClick={handleReturnAddButton}>지금 반납하기</Button>
          </Form.Group>

          <Form.Group>
            <Form.Label>절차</Form.Label>
          </Form.Group>

          <Form.Group>
            <Button onClick={handleNoticeFaqButton}>공지사항/FAQ</Button>
          </Form.Group>

          <Form.Group>
            <Button onClick={handleContactButton}>문의하기/고객센터</Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
