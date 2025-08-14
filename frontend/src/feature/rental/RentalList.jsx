import { Button, Col, Pagination, Row, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

export function RentalList() {
  const [rentalList, setRentalList] = useState(null);
  const [pageInfo, setPageInfo] = useState();
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { user, hasAccess, isAdmin, isLoading } = useContext(
    AuthenticationContext,
  );

  useEffect(() => {
    if (user === null) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    axios
      .get(`/api/rental/list?${searchParams}`, {})
      .then((res) => {
        setRentalList(res.data.rentalList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("always");
        console.log("Context user:", user);
      });
  }, [searchParams, isLoading]);

  if (!rentalList) {
    return <Spinner />;
  }

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handlePageNumberClick(pageNumber) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("p", pageNumber);
    setSearchParams(nextSearchParams);
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
        className="container-fluid py-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {/* 상단 제목 */}
            <div className="mb-5">
              <h2
                className="fw-bold mb-2"
                style={{
                  color: "#2d3748",
                  fontSize: "2rem",
                }}
              >
                내 렌탈 현황
              </h2>
              <p className="text-muted mb-0">
                현재 대여 중인 제품들을 확인하고 관리하세요.
              </p>
            </div>

            {/* 렌탈 카드들 */}
            <div className="row g-4 mb-5">
              {rentalList.map((rental) => (
                <div key={rental.seq} className="col-12">
                  <div
                    className="card border-0 shadow-sm h-100"
                    style={{
                      borderRadius: "16px",
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
                        <div className="col-md-9">
                          <h5
                            className="fw-semibold mb-1"
                            style={{ color: "#4a5568" }}
                          >
                            {rental.productNoName}
                          </h5>
                          <div className="d-flex align-items-center gap-3">
                            <h6
                              className="fw-bold mb-1 me-5"
                              style={{ color: "#2d3748" }}
                            >
                              대여 번호: {rental.seq}
                            </h6>
                            <span
                              className="text-muted me-5"
                              style={{ fontSize: "1rem" }}
                            >
                              수량: {rental.orderNoOrderCount}개
                            </span>
                            <span style={{ fontSize: "0.875rem" }}>
                              대여 상태:{" "}
                            </span>
                            <span
                              className=" px-3 py-1 justify-content-center text-center"
                              style={{
                                backgroundColor:
                                  rental.state === "대여중"
                                    ? "#48bb78"
                                    : rental.state === "연체"
                                      ? "#f56565"
                                      : rental.state === "반납 완료"
                                        ? "#2d3748"
                                        : "#ed8936",
                                color: "white",
                                borderRadius: "8px",
                                fontSize: "0.75rem",
                              }}
                            >
                              {rental.state}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-3 text-md-end">
                          <h5
                            className="fw-bold mb-1"
                            style={{ color: "#2d3748" }}
                          >
                            {rental.productNoPrice.toLocaleString()}원
                          </h5>
                          <p
                            className="text-muted mb-0"
                            style={{ fontSize: "0.875rem" }}
                          >
                            반납일: {formatDate(rental.endDttm)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 카드 바디 */}
                    <div className="card-body pt-0 pb-4">
                      <div className="row g-3">
                        {/* 대여 정보 테이블 */}
                        <div className="col-12">
                          <div
                            className="p-4 rounded-3"
                            style={{ backgroundColor: "#f7fafc" }}
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <span
                                    className="fw-medium text-muted d-block mb-1"
                                    style={{ fontSize: "0.875rem" }}
                                  >
                                    대여 시작일
                                  </span>
                                  <span style={{ color: "#4a5568" }}>
                                    {formatDate(rental.startDttm)}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <span
                                    className="fw-medium text-muted d-block mb-1"
                                    style={{ fontSize: "0.875rem" }}
                                  >
                                    반납 예정일
                                  </span>
                                  <span style={{ color: "#4a5568" }}>
                                    {formatDate(rental.endDttm)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 액션 버튼들 */}
                        <div className="col-12">
                          <div className="d-flex gap-3 justify-content-end">
                            <button
                              className="btn px-4 py-2 fw-medium"
                              style={{
                                backgroundColor: "transparent",
                                color: "#4299e1",
                                border: "2px solid #4299e1",
                                borderRadius: "10px",
                                fontSize: "0.875rem",
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#4299e1";
                                e.target.style.color = "white";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#4299e1";
                              }}
                              onClick={() =>
                                navigate(`/rental/renew/${rental.seq}`)
                              }
                            >
                              <i className="fas fa-clock"></i>
                              연장하기
                            </button>

                            <button
                              className="btn px-4 py-2 fw-medium"
                              style={{
                                backgroundColor: "transparent",
                                color: "#1a202c",
                                border: "2px solid #1a202c",
                                borderRadius: "10px",
                                fontSize: "0.875rem",
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#1a202c";
                                e.target.style.color = "white";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#1a202c";
                              }}
                              onClick={() =>
                                navigate(`/rental/return/${rental.seq}`)
                              }
                            >
                              <i className="fas fa-undo"></i>
                              반납하기
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
                        <i className="fas fa-angle-double-left"></i>
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
                        <i className="fas fa-angle-left"></i>
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
                        <i className="fas fa-angle-right"></i>
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
                        <i className="fas fa-angle-double-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
