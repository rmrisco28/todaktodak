import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";
import { toast } from "react-toastify";

export function MemberLogin() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  // step2. Use the context (토큰 인증 context 호출)
  const { login } = useContext(AuthenticationContext);

  const navigate = useNavigate();

  function handleLogInButtonClick() {
    axios
      .post(`/api/member/login`, {
        memberId: memberId,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        login(token);

        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("always");
      });
  }

  return (
    <Row className="d-flex justify-content-center">
      <Col md="auto">
        <h3 className="d-flex text-center mb-4">Login</h3>
        <div>
          <FormGroup className="mb-3" controlId="memberId">
            <FormLabel>아이디</FormLabel>
            <FormControl
              style={{ width: "200px" }}
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="password">
            <FormLabel>비밀번호</FormLabel>
            <FormControl
              type="password"
              style={{ width: "200px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </div>
        <div>
          <Button onClick={handleLogInButtonClick}>로그인</Button>
        </div>
      </Col>
    </Row>
  );
}
