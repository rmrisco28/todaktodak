import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export function BuyForm() {
  const { seq } = useParams();
  const [sale, setSale] = useState(null);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState(); // 참고항목
  const [request, setRequest] = useState("집 앞에 놔주세요.");
  const [isCustom, setIsCustom] = useState(false);
  const [isProcessing, setIsProcessing] = useState();
  const [mainThumbnail, setMainThumbnail] = useState([]);
  const [orderCount, setOrderCount] = useState(1);
  const [period, setPeriod] = useState(30);
  const [searchParams] = useSearchParams();

  const handleThumbnailClick = (path) => setMainThumbnail(path);

  let navigate = useNavigate();

  useEffect(() => {
    setOrderCount(searchParams.get("orderCount") || 1);
    setPeriod(searchParams.get("period") || 30);

    axios
      .get(`/api/sale/detail/${seq}`)
      .then((res) => {
        console.log(res.data);
        setSale(res.data);
      })
      .catch((err) => {
        toast("해당 상품이 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  if (!sale) {
    return <Spinner />;
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
      setPhoneNumber(value);
    }
  };

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
    phoneNumber.trim() === "" ||
    postalCode.trim() === "" ||
    address.trim() === "" ||
    request.trim() === ""
  ) {
    validate = false;
  }

  // 결제 버튼
  function handleSuccessButtonClick() {
    window.open("https://payment-demo.kakaopay.com/online", "_blank");
    setIsProcessing(true);

    axios
      .post("/api/buy", {
        name: name,
        phoneNo: phoneNumber,
        postCode: postalCode,
        saleNo: sale.saleNo,
        addr: address,
        addrDetail: addressDetail,
        request: request,
        price: sale.salePrice,
        deliveryFee: sale.deliveryFee,
        orderCount: orderCount,
        period: period,
        productNo: sale.productNo,
      })
      .then((res) => {
        axios.put("/api/rental/save", {});
        console.log("ok");
        alert(res.data.message);
        navigate("/buy/add");
      })
      .catch((err) => {
        console.log("no");
        console.log(addressDetail);
      })
      .finally(() => {
        console.log("finally");
        setIsProcessing(false);
      });
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col md={2}></Col>
        <Col xs={12} md={8}>
          <h2 className="mb-3">구매할 제품</h2>
        </Col>
        <Col md={2}></Col>
        <Col md={4} lg={4}>
          <Image
            src={sale.thumbnails[0]?.path}
            fluid
            rounded
            className="border"
          />
          {/*<div className="d-flex gap-2 flex-wrap">
            {sale.thumbnails.map((image) => (
              <Image
                key={image.name}
                src={image.path}
                thumbnail
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                  border:
                    mainThumbnail === image.path
                      ? "2px solid #007bff"
                      : "1px solid #dee2e6",
                }}
                onClick={() => handleThumbnailClick(image.path)}
              />
            ))}
          </div>*/}
        </Col>
        <Col md={4} lg={4}>
          <h5 className="mb-3">{sale.title}</h5>
          <hr />
          {/*<p>{sale.saleNo}</p>*/}
          <p>
            가격: {sale.salePrice.toLocaleString()}원
            <br />
            수량: {orderCount} 개
            <br />
            배송비:{" "}
            {sale.deliveryFee > 0
              ? `${sale.deliveryFee.toLocaleString()}원`
              : "무료배송"}
          </p>
        </Col>

        <Col xs={12} md={8} lg={6}>
          <hr />
          <h2 className="mb-3">상품구매 / 결제</h2>
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
            <FormLabel>주소</FormLabel>
            <FormGroup>
              <div className="d-flex" style={{ gap: "10px" }}>
                <FormControl
                  value={postalCode}
                  placeholder="우편번호"
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
                placeholder="주소 입력해주세요."
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
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "직접입력") {
                    setIsCustom(true); // 직접입력 활성화
                    setRequest(""); // 직접입력값 초기화
                  } else {
                    setIsCustom(false); // 기본 선택지일 경우
                    setRequest(value); // 바로 값 설정
                  }
                }}
              >
                <option value="집 앞에 놔주세요.">집 앞에 놔주세요.</option>
                <option value="직접 받을게요.">직접 받을게요.</option>
                <option value="경비실에 놔주세요.">경비실에 놔주세요.</option>
                <option value="택배함에 놔주세요.">택배함에 놔주세요.</option>
                <option value="직접입력">직접입력</option>
              </select>
            </FormGroup>
          </div>

          <div className="mb-3">
            <FormGroup>
              <FormControl
                value={request}
                placeholder={request}
                onChange={(e) => {
                  setRequest(e.target.value);
                }}
                disabled={!isCustom}
              />
            </FormGroup>
          </div>

          <div className="mb-3">
            <FormLabel>결제수단</FormLabel>
            {/*todo [@gg] 결제수단 api?*/}
            <FormControl value={"api?"} disabled />
          </div>
          <hr className="mb-3" />

          <div className="mb-5">
            <FormLabel style={{ fontSize: "20px" }}>최종 결제 금액</FormLabel>
            <FormControl
              style={{ fontSize: "20px" }}
              value={
                (
                  sale.salePrice * orderCount +
                  sale.deliveryFee
                ).toLocaleString() + "원"
              }
              readOnly
            />
          </div>
          {/*결제 버튼*/}
          <div className="d-grid gap-2 mx-auto">
            <Button onClick={handleSuccessButtonClick} disabled={!validate}>
              {isProcessing && <Spinner size="sm" />}
              {isProcessing || "결제하기"}
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
