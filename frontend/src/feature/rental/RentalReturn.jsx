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

  // 반납 버튼
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
        memberNo: rentalData.memberNo,
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

  // 반납 취소 버튼
  function handleCancellationOfReturnButton() {
    axios
      .put(`/api/rental/return/cancel/${rentalData.rentalNo}`, {
        rentalNo: rentalData.rentalNo,
        state: "대여중",
        rentalState: "대여중",
        content: content,
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

  const formatDate = (dateStr) => {
    // 'yyMMdd' 형식의 문자열을 Date 객체로 변환
    const year = `20${dateStr.slice(0, 2)}`; // 'yy' -> '20yy'로 변환
    const month = dateStr.slice(2, 4); // 'MM'
    const day = dateStr.slice(4, 6); // 'dd'
    const formattedDate = new Date(`${year}-${month}-${day}`);

    return `${formattedDate.getFullYear().toString().slice(2)}-${(formattedDate.getMonth() + 1).toString().padStart(2, "0")}-${formattedDate.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div
        className="container-fluid py-4"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {/* 상단 제목 */}
            <div className="mb-5">
              <h2
                className="fw-bold mb-2"
                style={{
                  color: "#2d3748",
                  fontSize: "2rem",
                  cursor: "pointer",
                  width: "fit-content",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#4299e1")}
                onMouseLeave={(e) => (e.target.style.color = "#2d3748")}
                onClick={() => navigate("/rental/list")}
              >
                내 렌탈 현황(반납)
              </h2>
              <p className="text-muted mb-0">
                반납할 제품 정보를 확인하고 반납 신청을 진행하세요.
              </p>
            </div>

            {/* 메인 카드 */}
            <div
              className="card border-0 shadow-sm mb-4"
              style={{ borderRadius: "16px" }}
            >
              <div className="card-body p-4">
                {/* 제품 정보 섹션 */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: "#4a5568" }}>
                    제품 정보
                  </h5>

                  <div className="mb-3">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#2d3748" }}
                    >
                      제품명
                    </label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        backgroundColor: "#f8f9fa",
                      }}
                      value={rentalData.productName}
                      disabled
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label fw-medium"
                        style={{ color: "#2d3748" }}
                      >
                        제품 대여 개수
                      </label>
                      <input
                        type="text"
                        className="form-control border-0"
                        style={{
                          borderRadius: "10px",
                          padding: "12px 16px",
                          fontSize: "0.95rem",
                          backgroundColor: "#f8f9fa",
                        }}
                        value={rentalData.orderCount}
                        disabled
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label fw-medium"
                        style={{ color: "#2d3748" }}
                      >
                        현재 상태
                      </label>
                      <input
                        type="text"
                        className="form-control border-0"
                        style={{
                          borderRadius: "10px",
                          padding: "12px 16px",
                          fontSize: "0.95rem",
                          backgroundColor: "#f8f9fa",
                        }}
                        value={state}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#2d3748" }}
                    >
                      남은 대여 기간
                    </label>
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        backgroundColor: "#f8f9fa",
                      }}
                      value={formatDate(rentalData.endDttm)}
                      disabled
                    />
                  </div>
                </div>

                <hr style={{ opacity: 0.1 }} />

                {/* 반납자 정보 섹션 */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: "#4a5568" }}>
                    반납자 정보
                  </h5>

                  <div className="mb-3">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#2d3748" }}
                    >
                      주문자 성명
                    </label>
                    <input
                      type="text"
                      className="form-control bg-white"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        border: "2px solid #e2e8f0",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#4299e1";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(66, 153, 225, 0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                      }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#2d3748" }}
                    >
                      연락처
                    </label>
                    <input
                      type="text"
                      className="form-control bg-white"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        border: "2px solid #e2e8f0",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#4299e1";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(66, 153, 225, 0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                      }}
                      value={phone}
                      onChange={handlePhoneNumberChange}
                    />
                  </div>
                </div>

                <hr style={{ opacity: 0.1 }} />

                {/* 반납 주소 섹션 */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: "#4a5568" }}>
                    반납 주소지
                  </h5>

                  <div className="mb-3">
                    <label
                      className="form-label fw-medium"
                      style={{ color: "#2d3748" }}
                    >
                      우편번호
                    </label>
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control border-0"
                        style={{
                          borderRadius: "10px",
                          padding: "12px 16px",
                          fontSize: "0.95rem",
                          backgroundColor: "#f8f9fa",
                          width: "150px",
                        }}
                        value={postalCode}
                        readOnly
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                      <button
                        className="btn px-4"
                        style={{
                          backgroundColor: "#2d3748",
                          color: "white",
                          border: "none",
                          borderRadius: "10px",
                          fontWeight: "500",
                          fontSize: "0.9rem",
                        }}
                        onClick={handleAddressButtonClick}
                      >
                        검색
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control border-0"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        backgroundColor: "#f8f9fa",
                      }}
                      value={address}
                      placeholder="주소"
                      readOnly
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control bg-white"
                      style={{
                        borderRadius: "10px",
                        padding: "12px 16px",
                        fontSize: "0.95rem",
                        border: "2px solid #e2e8f0",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#4299e1";
                        e.target.style.boxShadow =
                          "0 0 0 0.2rem rgba(66, 153, 225, 0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#e2e8f0";
                        e.target.style.boxShadow = "none";
                      }}
                      value={addressDetail}
                      placeholder="상세주소"
                      onChange={(e) => setAddressDetail(e.target.value)}
                    />
                  </div>
                </div>

                {/* 메모 섹션 */}
                <div className="mb-4">
                  <label
                    className="form-label fw-medium"
                    style={{ color: "#2d3748" }}
                  >
                    남기실 메모
                  </label>
                  <textarea
                    className="form-control bg-white"
                    style={{
                      borderRadius: "10px",
                      padding: "12px 16px",
                      fontSize: "0.95rem",
                      border: "2px solid #e2e8f0",
                      transition: "all 0.3s ease",
                      minHeight: "100px",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#4299e1";
                      e.target.style.boxShadow =
                        "0 0 0 0.2rem rgba(66, 153, 225, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                    rows={3}
                    placeholder="반납과 관련된 메모를 입력해주세요."
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* 버튼 섹션 */}
                <div className="d-flex justify-content-center gap-3 mt-5">
                  {state === "대여중" && (
                    <button
                      className="btn px-5 py-3 fw-medium"
                      style={{
                        backgroundColor: validate ? "#2d3748" : "#a0aec0",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "0.95rem",
                        transition: "all 0.3s ease",
                      }}
                      disabled={!validate}
                      onClick={handleReturnButtonClick}
                    >
                      <i className="fas fa-undo"></i>
                      반납하기
                    </button>
                  )}

                  {state === "반납 확인중" && (
                    <button
                      className="btn px-5 py-3 fw-medium"
                      style={{
                        backgroundColor: "#4299e1",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                        fontSize: "0.95rem",
                        transition: "all 0.3s ease",
                      }}
                      onClick={handleCancellationOfReturnButton}
                    >
                      <i className="fas fa-times"></i>
                      반납 취소
                    </button>
                  )}

                  <button
                    className="btn px-5 py-3 fw-medium"
                    style={{
                      backgroundColor: "transparent",
                      color: "#718096",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#f7fafc";
                      e.target.style.borderColor = "#cbd5e0";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderColor = "#e2e8f0";
                    }}
                    onClick={() => setCancelModalShow(true)}
                  >
                    <i className="fas fa-arrow-left"></i>
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 취소 모달 */}
        <div
          className={`modal fade ${cancelModalShow ? "show d-block" : ""}`}
          style={{
            backgroundColor: cancelModalShow
              ? "rgba(0,0,0,0.5)"
              : "transparent",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content"
              style={{ borderRadius: "16px", border: "none" }}
            >
              <div className="modal-header border-0 pb-0">
                <h5
                  className="modal-title fw-bold"
                  style={{ color: "#2d3748" }}
                >
                  반납 취소 여부 확인
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setCancelModalShow(false)}
                ></button>
              </div>
              <div className="modal-body pt-0">
                <p className="mb-0" style={{ color: "#4a5568" }}>
                  반납 신청하지 않고 이동하시겠습니까?
                  <br />
                  작성하신 내용은 삭제됩니다.
                </p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  className="btn px-4 py-2"
                  style={{
                    backgroundColor: "transparent",
                    color: "#718096",
                    border: "2px solid #e2e8f0",
                    borderRadius: "10px",
                  }}
                  onClick={() => setCancelModalShow(false)}
                >
                  뒤로
                </button>
                <button
                  className="btn px-4 py-2"
                  style={{
                    backgroundColor: "#f56565",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                  }}
                  onClick={() => navigate("/rental/list")}
                >
                  목록으로
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
