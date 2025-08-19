import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BiSearchAlt2 } from "react-icons/bi";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";
import data from "../../json/stateOrder.json";
import { toast } from "react-toastify";

// 주문 상태값 목록
const stateList = [];
data.orderStateList.map((i) =>
  stateList.push({ id: i.id, code: i.code, kor: i.kor }),
);

export function OrderList() {
  const { user } = useContext(AuthenticationContext);
  const [keyword, setKeyword] = useState("");
  const [orderList, setOrderList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || isProcessing === true) {
      return;
    }

    const q = searchParams.get("q");
    if (q) {
      setKeyword(q);
    } else {
      setKeyword("");
    }

    axios
      .get(`/api/order/list?${searchParams}`)
      .then((res) => {
        setOrderList(res.data.orderList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.log("오류 발생");
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, [user, searchParams, isProcessing]);

  // 가격을 콤마 포맷으로 변경하는 함수
  const formatPrice = (price) => {
    return price ? `${price.toLocaleString()}원` : "가격 미정";
  };

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    navigate(`/order/list?q=` + keyword);
  }

  if (!user || !orderList) {
    return <Spinner />;
  }

  function handleTableRowClick(seq) {
    navigate(`/order/${seq}`);
  }

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handlePageNumberClick(pageNumber) {
    // console.log(pageNumber + "페이지로 이동");
    // navigate(`/?p=${pageNumber}`);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("p", pageNumber);
    setSearchParams(nextSearchParams);
  }

  function handleProcButtonClick(e, proc, seq) {
    e.stopPropagation(); //  버블링/캡처링 중단
    setIsProcessing(true);
    axios
      .putForm("/api/order/state/update", {
        seq: seq,
        process: proc,
      })
      .then((res) => {
        const message = res.data.message;
        toast(message.text, { type: message.type });
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        } else {
          toast("오류가 발생하였습니다.", { type: "danger" });
        }
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  const setButtonByState = (state, seq) => {
    switch (state) {
      case "P.RDY":
      case "P.CPLT":
        return (
          <Button
            size="sm"
            variant="warning"
            onClick={(e) => handleProcButtonClick(e, `C.REQ`, seq)}
          >
            취소요청
          </Button>
        );
      case "D.RDY":
      case "D.PRG":
      case "D.CPLT":
        return (
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={(e) => handleProcButtonClick(e, `RV.CPLT`, seq)}
            >
              수령완료
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={(e) => handleProcButtonClick(e, `RT.REQ`, seq)}
            >
              반송요청
            </Button>
          </>
        );
    }
  };

  const openTracking = (e, t_code, t_invoice) => {
    e.stopPropagation();
    // GET 방식으로 값 전달
    const url = `/api/order/tracking?t_code=${t_code}&t_invoice=${t_invoice}`;
    window.open(url, "trackingPopup", "width=500,height=900");
  };

  return (
    <>
      <>
        <div className="container-fluid py-4" style={{ background: "#f8f9fa" }}>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* 상단 제목 및 검색 */}
              <div className="mb-4">
                <h2
                  className="fw-bold mb-4"
                  style={{
                    color: "#2d3748",
                    fontSize: "2rem",
                  }}
                >
                  주문 목록
                </h2>

                {/* 검색 폼 */}
                <div
                  className="card border-0 shadow-sm mb-4"
                  style={{
                    borderRadius: "15px",
                    height: "100px",
                  }}
                >
                  <div className="card-body p-4">
                    <form onSubmit={handleSearchFormSubmit}>
                      <div className="d-flex gap-2">
                        <input
                          type="text"
                          className="form-control bg-white"
                          style={{
                            borderRadius: "10px",
                            padding: "12px 16px",
                            fontSize: "0.95rem",
                            border: "2px solid #dee2e6",
                            transition: "all 0.3s ease",
                            width: "100%",
                            height: "48px",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#495057";
                            e.target.style.boxShadow =
                              "0 0 0 0.2rem rgba(73, 80, 87, 0.15)";
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "#dee2e6";
                            e.target.style.boxShadow = "none";
                          }}
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                          placeholder="주문번호나 상품명으로 검색하세요"
                        />
                        <button
                          type="submit"
                          className="btn btn-dark px-4"
                          style={{
                            borderRadius: "10px",
                            fontWeight: "500",
                            fontSize: "0.9rem",
                            height: "48px",
                          }}
                        >
                          <BiSearchAlt2 />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* 주문 카드들 */}
              {orderList.length > 0 ? (
                <div className="row g-4 mb-5">
                  {orderList.map((order, index) => (
                    <div key={order.seq} className="col-12">
                      <div
                        className="card border-0 shadow-sm h-100"
                        style={{
                          borderRadius: "16px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow =
                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)";
                        }}
                        onClick={() => handleTableRowClick(order.seq)}
                      >
                        {/* 카드 헤더 */}
                        <div
                          className="card-header border-0 py-4"
                          style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "16px 16px 0 0",
                          }}
                        >
                          <div className="row align-items-center">
                            <div className="col-md-8 mb-2">
                              <h5
                                className="fw-semibold mb-2"
                                style={{ color: "#4a5568" }}
                              >
                                {order.saleTitle}
                              </h5>
                              <div className="d-flex align-items-center gap-3 flex-wrap">
                                <span></span>
                                <span
                                  className="text-muted"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  주문번호: {order.orderNo}
                                </span>
                                <span
                                  className="text-muted"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  주문자: {order.name}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-4 text-md-end">
                              <h5
                                className="fw-bold mb-1"
                                style={{ color: "#2d3748" }}
                              >
                                {formatPrice(order.totalPrice)}
                              </h5>
                              <p
                                className="text-muted mb-0"
                                style={{ fontSize: "0.875rem" }}
                              >
                                주문일: {order.insertDttm}
                              </p>
                            </div>
                            <div>
                              <span
                                style={{ fontSize: "0.875rem" }}
                                className="px-3 "
                              >
                                주문상태:
                              </span>
                              <span
                                className="px-3 py-1"
                                style={{
                                  backgroundColor: "#48bb78",
                                  color: "white",
                                  borderRadius: "8px",
                                  fontSize: "0.8rem",
                                }}
                              >
                                {stateList.map(
                                  (item) =>
                                    item.code === order.state && item.kor,
                                )}
                              </span>
                              <span>
                                {(order.state.split(".")[0] === "D" ||
                                  order.state.split(".")[0] === "RV") && (
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={(e) =>
                                      openTracking(e, order.deliveryCode, order.tracking)
                                    }
                                  >
                                    배송조회
                                  </Button>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 카드 바디 */}
                        <div className="card-body pt-0 pb-4">
                          <div className="row g-3">
                            {/* 주문 정보 */}
                            <div className="col-12">
                              <div
                                className="p-4 rounded-3"
                                style={{ backgroundColor: "#f7fafc" }}
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <div className="mb-3">
                                      <span
                                        className="fw-medium text-muted d-block mb-1"
                                        style={{ fontSize: "0.875rem" }}
                                      >
                                        주문번호
                                      </span>
                                      <span style={{ color: "#4a5568" }}>
                                        #{index + 1}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="mb-3">
                                      <span
                                        className="fw-medium text-muted d-block mb-1"
                                        style={{ fontSize: "0.875rem" }}
                                      >
                                        결제금액
                                      </span>
                                      <span style={{ color: "#4a5568" }}>
                                        {formatPrice(order.totalPrice)}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="mb-3">
                                      <span
                                        className="fw-medium text-muted d-block mb-1"
                                        style={{ fontSize: "0.875rem" }}
                                      >
                                        주문일시
                                      </span>
                                      <span style={{ color: "#4a5568" }}>
                                        {order.insertDttm}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="mb-3">
                                      <span
                                        className="fw-medium text-muted d-block mb-1"
                                        style={{ fontSize: "0.875rem" }}
                                      >
                                        주문처리
                                      </span>
                                      <div>
                                        {setButtonByState(
                                          order.state,
                                          order.seq,
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="row justify-content-center">
                  <div className="col-8 col-lg-6">
                    <div
                      className="card border-0 shadow-sm"
                      style={{ borderRadius: "15px" }}
                    >
                      <div className="card-body p-5 text-center">
                        <h6
                          className="text-muted mb-0"
                          style={{ fontSize: "1.1rem" }}
                        >
                          등록된 주문이 존재하지 않습니다.
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 페이지네이션 */}
              <div className="row">
                <div className="col-12">
                  <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center mb-0">
                      <li
                        className={`page-item ${pageInfo.currentPageNumber === 1 ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link border-0"
                          style={{
                            color: "#4a5568",
                            backgroundColor: "transparent",
                            padding: "0.75rem 1rem",
                            borderRadius: "8px",
                            marginRight: "0.25rem",
                          }}
                          onClick={() => handlePageNumberClick(1)}
                          disabled={pageInfo.currentPageNumber === 1}
                        >
                          <TbPlayerTrackPrev />
                        </button>
                      </li>

                      <li
                        className={`page-item ${pageInfo.leftPageNumber <= 1 ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link border-0"
                          style={{
                            color: "#4a5568",
                            backgroundColor: "transparent",
                            padding: "0.75rem 1rem",
                            borderRadius: "8px",
                            marginRight: "0.25rem",
                          }}
                          onClick={() =>
                            handlePageNumberClick(pageInfo.leftPageNumber - 10)
                          }
                          disabled={pageInfo.leftPageNumber <= 1}
                        >
                          <GrPrevious />
                        </button>
                      </li>

                      {pageNumbers.map((pageNumber) => (
                        <li key={pageNumber} className="page-item">
                          <button
                            className="page-link border-0"
                            style={{
                              color:
                                pageInfo.currentPageNumber === pageNumber
                                  ? "white"
                                  : "#4a5568",
                              backgroundColor:
                                pageInfo.currentPageNumber === pageNumber
                                  ? "#2d3748"
                                  : "transparent",
                              padding: "0.75rem 1rem",
                              borderRadius: "8px",
                              marginRight: "0.25rem",
                              fontWeight:
                                pageInfo.currentPageNumber === pageNumber
                                  ? "600"
                                  : "400",
                            }}
                            onClick={() => handlePageNumberClick(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${pageInfo.rightPageNumber >= pageInfo.totalPages ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link border-0"
                          style={{
                            color: "#4a5568",
                            backgroundColor: "transparent",
                            padding: "0.75rem 1rem",
                            borderRadius: "8px",
                            marginRight: "0.25rem",
                          }}
                          onClick={() =>
                            handlePageNumberClick(pageInfo.rightPageNumber + 1)
                          }
                          disabled={
                            pageInfo.rightPageNumber >= pageInfo.totalPages
                          }
                        >
                          <GrNext />
                        </button>
                      </li>

                      <li
                        className={`page-item ${pageInfo.currentPageNumber === pageInfo.totalPages ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link border-0"
                          style={{
                            color: "#4a5568",
                            backgroundColor: "transparent",
                            padding: "0.75rem 1rem",
                            borderRadius: "8px",
                          }}
                          onClick={() =>
                            handlePageNumberClick(pageInfo.totalPages)
                          }
                          disabled={
                            pageInfo.currentPageNumber === pageInfo.totalPages
                          }
                        >
                          <TbPlayerTrackNext />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
