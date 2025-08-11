import { useNavigate, useParams } from "react-router";
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export function RentalReturn() {
  const [rentalData, setRentalData] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [content, setContent] = useState("");
  const [cancelModalShow, setCancelModalShow] = useState(false);
  const [state, setState] = useState("");
  const { seq } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/rental/return/${seq}`, {})
      .then((res) => {
        console.log(res.data);
        setRentalData(res.data);
        setState(res.data.state);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    if (rentalData && rentalData.orderName) {
      setName(rentalData.orderName);
    }
    if (rentalData && rentalData.orderPost) {
      setPostalCode(rentalData.orderPost);
    }
    if (rentalData && rentalData.orderAddr) {
      setAddress(rentalData.orderAddr); // rentalData.orderAddr 값을 address 상태에 넣기
    }
    if (rentalData && rentalData.orderAddrDetail) {
      setAddressDetail(rentalData.orderAddrDetail); // rentalData.orderAddr 값을 address 상태에 넣기
    }
    if (rentalData && rentalData.orderPhone) {
      setPhone(rentalData.orderPhone);
    }
  }, [rentalData]); // rentalData가 변경될 때마다 실행

  if (!rentalData) return <div>로딩 중...</div>;

  // 주소 검색 버튼 다음 api
  function handleAddressButtonClick() {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ""; // 주소 변수
        var extraAddr = ""; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
          // 조합된 참고항목을 해당 필드에 넣는다.
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        setPostalCode(data.zonecode);
        setAddress(addr + extraAddr);
        setTimeout(() => {
          const detailInput = document.querySelector(
            "input[placeholder='상세주소를 입력해주세요.']",
          );
          if (detailInput) {
            detailInput.focus();
          }
        }, 100); // 비동기 이슈로 살짝 딜레이

        // 커서를 상세주소 필드로 이동한다.
      },
    }).open();
  }

  // 결제 버튼 클릭시 공란 여부 확인
  let validate = true;
  if (
    name.trim() === "" ||
    postalCode.trim() === "" ||
    address.trim() === "" ||
    addressDetail.trim() === "" ||
    phone.trim() === ""
  ) {
    validate = false;
  }

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
      setPhone(value);
    }
  };

  function handleReturnButtonClick() {
    axios
      .post(`/api/rental/return/finish`, {
        name: name,
        post: postalCode,
        addr: address,
        addrDetail: addressDetail,
        phone: phone,
        content: content,
        rentalNo: rentalData.rentalNo,
        orderNo: rentalData.orderNo,
        productNo: rentalData.productNo,
        saleNo: rentalData.saleNo,
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        navigate("/rental/list");
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("always");
      });
  }

  function handleCancellationOfReturnButton() {
    axios
      .put(`/api/rental/return/cancel/${rentalData.rentalNo}`, {
        rentalNo: rentalData.rentalNo,
        state: "대여중",
        rentalState: "대여중",
      })
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        navigate("/rental/list");
      })
      .finally(() => {
        console.log(seq);
        console.log(rentalData.rentalNo);
      });
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          {/* 대여 상단 제목*/}
          <h2
            className="mb-4"
            style={{
              // textAlign: "center",
              cursor: "pointer",
              width: "fit-content",
              transition: "color 0.2s",
              color: "#000",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#007bff")}
            onMouseLeave={(e) => (e.target.style.color = "#000")}
            onClick={() => navigate("/rental/list")}
          >
            내 렌탈 현황(반납)
          </h2>

          <div>
            <FormGroup className="mb-3">
              <FormLabel>제품명</FormLabel>
              <FormControl value={rentalData.productName} disabled />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>제품 대여 개수</FormLabel>
              <FormControl value={rentalData.orderCount} disabled />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>현재 상태</FormLabel>
              <FormControl value={state} disabled />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>남은 대여 기간</FormLabel>
              <FormControl value={rentalData.endDttm} disabled />
            </FormGroup>
          </div>
          <div>
            <FormGroup className="mb-3">
              <FormLabel>주문자 성명</FormLabel>
              <FormControl
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormGroup>
          </div>

          <div className="mb-3">
            <FormLabel>반납 주소지</FormLabel>
            <FormGroup>
              <div className="d-flex" style={{ gap: "10px" }}>
                <FormControl
                  value={postalCode}
                  readOnly
                  style={{ width: "150px" }}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                />
                <Button
                  className="mb-1"
                  variant="outline-dark"
                  onClick={handleAddressButtonClick}
                >
                  검색
                </Button>
              </div>
            </FormGroup>
          </div>
          <div className="mb-3">
            <FormGroup>
              <FormControl
                value={address}
                readOnly
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </FormGroup>
          </div>
          <div className="mb-3">
            <FormGroup>
              <FormControl
                value={addressDetail}
                onChange={(e) => {
                  setAddressDetail(e.target.value);
                }}
              />
            </FormGroup>
          </div>

          <div>
            <FormGroup className="mb-3">
              <FormLabel>연락처</FormLabel>
              <FormControl value={phone} onChange={handlePhoneNumberChange} />
            </FormGroup>
          </div>
          <div className="mb-3">
            <FormGroup>
              <FormLabel>남기실 메모</FormLabel>
              <FormControl
                type="textarea"
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </FormGroup>
          </div>

          <div className="d-flex justify-content-center gap-4 mb-3">
            {state === "대여중" && (
              <Button
                variant="primary"
                style={{ width: "150px", margin: "10px" }}
                disabled={!validate}
                onClick={handleReturnButtonClick}
              >
                반납하기
              </Button>
            )}
            <Button
              variant="warning"
              style={{ width: "100px" }}
              onClick={() => {
                setCancelModalShow(true);
              }}
            >
              취소
            </Button>

            {state === "반납 확인중" && (
              <Button
                variant="info"
                style={{ width: "100px" }}
                onClick={handleCancellationOfReturnButton}
              >
                반납 취소
              </Button>
            )}
          </div>
        </Col>

        {/* 취소 모달*/}
        <Modal show={cancelModalShow} onHide={() => setCancelModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>반납 취소 여부 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            반납 신청하지 않고 이동하시겠습니까?
            <br />
            작성하신 내용은 삭제됩니다.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-dark"
              onClick={() => setCancelModalShow(false)}
            >
              뒤로
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                navigate("/rental/list");
              }}
            >
              목록으로
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}
