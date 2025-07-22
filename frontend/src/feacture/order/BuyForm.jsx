import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";

export function BuyForm() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [request, setRequest] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  let navigate = useNavigate();

  // 전화번호 입력을 위한 정규식 (010-XXXX-XXXX)

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;

    // 전화번호의 숫자만 추출하여 포맷 적용
    value = value.replace(/[^\d]/g, ""); // 숫자가 아닌 문자 모두 제거

    // 포맷 적용
    if (value.length > 3 && value.length <= 6) {
      value = value.replace(/(\d{3})(\d{1,3})/, "$1-$2");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    }

    // 최대 13자리까지만 허용
    if (value.length <= 13) {
      setPhoneNumber(value);
    }
  };
  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2>상품구매 / 결제</h2>
          <hr />

          <div className="mb-3">
            <FormGroup>
              <FormLabel>이름</FormLabel>

              <FormControl
                placeholder="배송 받을 분의 성함을 입력해주세요."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormGroup>
          </div>
          <div className="mb-3">
            <FormGroup>
              <FormLabel>휴대폰 번호</FormLabel>
              <FormControl
                placeholder="번호를 입력해주세요."
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </FormGroup>
          </div>

          <div className="mb-3">
            <FormGroup>
              <FormLabel className="me-2">우편번호 api?</FormLabel>
              {/*todo 우편번호 api?*/}
              <Button className="mb-1" variant="">
                {" "}
                주소 검색
              </Button>

              <FormControl
                value={address}
                placeholder="주소를 입력해주세요."
                readOnly
              />
            </FormGroup>
          </div>

          <div className="mb-3">
            <FormGroup>
              <FormLabel className="me-5">상세주소</FormLabel>
              <FormControl
                value={addressDetail}
                placeholder="상세주소를 입력해주세요."
                onChange={(e) => {
                  setAddressDetail(e.target.value);
                }}
              />
            </FormGroup>
          </div>
          <div className="mb-3">
            <FormGroup>
              <FormLabel>배송 요청 사항</FormLabel>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option
                  value={(e) => {
                    setRequest(e.target.value);
                  }}
                >
                  집 앞에 놔주세요.
                </option>
                <option
                  value={(e) => {
                    setRequest(e.target.value);
                  }}
                >
                  경비실에 놔주세요.
                </option>
                <option
                  value={(e) => {
                    setRequest(e.target.value);
                  }}
                >
                  부재시 경비실에 놔주세요.
                </option>
              </select>
            </FormGroup>
          </div>

          <div className="mb-5">
            <FormLabel>결제수단</FormLabel>
            {/*todo 결제수단 api?*/}
            <FormControl value={"api?"} disabled />
          </div>
          <hr className="mb-5" />
          {/*결제 버튼*/}

          <div className="d-grid gap-2 mx-auto">
            <Button
              onClick={() => {
                navigate("/buy/add");
              }}
            >
              결제하기
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
