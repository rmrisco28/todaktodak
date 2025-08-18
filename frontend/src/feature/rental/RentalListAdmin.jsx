import {
  Button,
  Col,
  FormGroup,
  FormLabel,
  FormSelect,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

export function RentalListAdmin() {
  const [rentalList, setRentalList] = useState(null);
  const [pageInfo, setPageInfo] = useState();
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/rental/list/admin?${searchParams}`, {})
      .then((res) => {
        console.log("ok");
        console.log("data received: ", res.data);
        setRentalList(res.data.rentalAdminList);
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

  // 페이지네이션
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

  // 상태 변경 함수
  const handleStateChange = (rentalNo, newState) => {
    setRentalList((prevList) =>
      prevList.map((rental) =>
        rental.rentalNo === rentalNo ? { ...rental, state: newState } : rental,
      ),
    );
  };

  const handleSaveButtonClick = (rental) => {
    axios
      .put(`/api/rental/list/update/${rental.rentalNo}`, {
        rentalNo: rental.rentalNo,
        orderNo: rental.orderNoOrderNo,
        orderNoState: rental.state,
        state: rental.state,
        orderNoOrderCount: rental.orderNoOrderCount,
        productNo: rental.productNoProductNo,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        navigate(`/rental/list/admin`);
      })
      .catch((err) => {
        console.log("실패");
        alert("값 저장에 실패하였습니다.");
      })
      .finally(() => {
        console.log("always");
      });
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col md={8} lg={12} className="mb-4">
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
                <th>이용자</th>
                <th>이용자 전화번호</th>
                <th>제품명</th>
                <th>개수</th>
                <th>가격</th>
                <th>대여일자</th>
                <th>반납일자</th>
                <th>상태</th>
                <th>저장</th>
              </tr>
            </thead>
            <tbody>
              {rentalList.map((rental) => (
                <tr key={rental.rentalNo}>
                  <td>{rental.seq}</td>
                  <td>{rental.orderNoName}</td>
                  <td>{rental.orderNoPhone}</td>
                  <td>{rental.productNoName}</td>
                  <td>{rental.orderNoOrderCount}</td>
                  <td>{rental.productNoPrice.toLocaleString()}</td>
                  <td>{formatDate(rental.startDttm)}</td>
                  <td>{formatDate(rental.endDttm)}</td>
                  <td>
                    <FormGroup>
                      <FormSelect
                        className="mb-3"
                        style={{ width: "120px" }}
                        value={rental.state}
                        onChange={(e) =>
                          handleStateChange((rental.state = e.target.value))
                        } // 상태값을 갱신
                      >
                        <option value={"대여중"}>대여중</option>
                        <option value={"반납 확인중"}>반납 확인중</option>
                        <option value={"반납 배송중"}>반납 배송중</option>
                        <option value={"반납 완료"}>반납 완료</option>
                      </FormSelect>
                    </FormGroup>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="mr-2"
                      onClick={() => handleSaveButtonClick(rental)}
                    >
                      저장하기
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

      {/* 페에에이이이이지이이 네에에이이이셔셔어어언*/}
      {/* 페에에이이이이지이이 네에에이이이셔셔어어언*/}
      {/* 페에에이이이이지이이 네에에이이이셔셔어어언*/}
      {/* 페에에이이이이지이이 네에에이이이셔셔어어언*/}
      {/* 페에에이이이이지이이 네에에이이이셔셔어어언*/}
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
