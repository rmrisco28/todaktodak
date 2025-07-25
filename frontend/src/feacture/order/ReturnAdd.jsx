import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

export function ReturnAdd() {
  const [returnAdd, setReturnAdd] = useState({
    productNo: "",
    memberNo: "",
    odrName: "",
    rentalDate: "",
    count: 0,
    state: "",
    insertDttn: "",
  });

  function handleRtnSaveButtonClick() {
    // 반납 신청 확인
    axios
      .post(`/api/return/add`, returnAdd)
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
          <FormLabel>{returnAdd.productNo}</FormLabel>
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormLabel>{returnAdd.memberNo}</FormLabel>
        </FormGroup>
      </div>
      <FormGroup>
        <FormLabel>{returnAdd.odrName}</FormLabel>
      </FormGroup>
      <div>
        <FormGroup>
          <FormLabel>{returnAdd.rentalDate}</FormLabel>
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormLabel>{returnAdd.count}</FormLabel>
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormLabel>{returnAdd.state}</FormLabel>
        </FormGroup>
      </div>
      <div>
        <FormGroup>
          <FormLabel>{returnAdd.insertDttn}</FormLabel>
        </FormGroup>
      </div>

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
