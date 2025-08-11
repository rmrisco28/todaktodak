import { Button, Col, Pagination, Row, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

export function RentalList() {
  const [rentalList, setRentalList] = useState(null);
  const [pageInfo, setPageInfo] = useState();
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/rental/list?${searchParams}`, {})
      .then((res) => {
        console.log("ok");
        console.log(res.data);
        console.log(res.data.rentalList);
        setRentalList(res.data.rentalList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("always");
      });
  }, [searchParams]);

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

  return (
    <>
      <Row className="justify-content-center">
        <Col md={12} lg={10} className="mb-4">
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
          >
            내 렌탈 현황
          </h2>

          {/* 테이블 */}
          <table className="table table-hover">
            <thead>
              <tr>
                <th>번호</th>
                <th>제품명</th>
                <th>개수</th>
                <th>가격</th>
                <th>대여일시</th>
                <th>반납일시</th>
                <th>상태</th>
                <th>반납하기</th>
                <th>연장하기</th>
              </tr>
            </thead>
            <tbody>
              {rentalList.map((rental) => (
                <tr>
                  <td>{rental.seq}</td>
                  <td>{rental.productNoName}</td>
                  <td>{rental.orderNoOrderCount}</td>
                  <td>{rental.productNoPrice.toLocaleString()}</td>
                  <td>{rental.startDttm}</td>
                  <td>{rental.endDttm}</td>
                  <td>{rental.state}</td>
                  <td>
                    <Button
                      onClick={() => navigate(`/rental/return/${rental.seq}`)}
                      variant="outline-primary"
                      className="mr-2"
                    >
                      반납하기
                    </Button>
                  </td>
                  <td>
                    <Button
                      style={{}}
                      onClick={() => navigate(`/rental/renew/${rental.seq}`)}
                      variant="outline-success"
                    >
                      연장하기
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
      {/* PageNation */}
      <Row>
        <Col>
          <Pagination className="justify-content-center">
            <Pagination.First
              disabled={pageInfo.currentPageNumber === 1}
              onClick={() => handlePageNumberClick(1)}
            ></Pagination.First>
            <Pagination.Prev
              disabled={pageInfo.leftPageNumber <= 1}
              onClick={() =>
                handlePageNumberClick(pageInfo.leftPageNumber - 10)
              }
            ></Pagination.Prev>
            {pageNumbers.map((pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                onClick={() => handlePageNumberClick(pageNumber)}
                active={pageInfo.currentPageNumber === pageNumber}
              >
                {pageNumber}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={pageInfo.rightPageNumber >= pageInfo.totalPages}
              onClick={() =>
                handlePageNumberClick(pageInfo.rightPageNumber + 1)
              }
            ></Pagination.Next>
            <Pagination.Last
              disabled={pageInfo.currentPageNumber === pageInfo.totalPages}
              onClick={() => handlePageNumberClick(pageInfo.totalPages)}
            ></Pagination.Last>
          </Pagination>
        </Col>
      </Row>
    </>
  );
}
