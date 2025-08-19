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
      .get(`/api/order/list/${user.memberId}?${searchParams}`)
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
    navigate(`/order/list/${user.memberId}?q=` + keyword);
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
      <Row>
        <Col>
          <h2 className="mb-4">주문 목록</h2>
          <Form
            inline="true"
            onSubmit={handleSearchFormSubmit}
            className="order-lg-2 mx-lg-auto"
          >
            <InputGroup>
              <FormControl
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button type="submit" className="mb-0">
                <BiSearchAlt2 />
              </Button>
            </InputGroup>
          </Form>

          {orderList.length > 0 ? (
            <Table striped={true} hover={true}>
              <thead>
                <tr>
                  <th
                    className="d-none d-md-table-cell"
                    style={{ width: "100px" }}
                  >
                    주문번호
                  </th>
                  <th>주문상품명</th>
                  <th
                    className="d-none d-md-table-cell"
                    style={{ width: "100px" }}
                  >
                    주문자명
                  </th>
                  <th
                    className="d-none d-md-table-cell"
                    style={{ width: "100px" }}
                  >
                    총 결제금액
                  </th>
                  <th
                    className="d-none d-md-table-cell"
                    style={{ width: "100px" }}
                  >
                    주문상태
                  </th>
                  <th
                    className="d-none d-lg-table-cell"
                    style={{ width: "200px" }}
                  >
                    주문일시
                  </th>
                  <th
                    className="d-none d-lg-table-cell"
                    style={{ width: "200px" }}
                  >
                    배송조회
                  </th>
                  <th
                    className="d-none d-lg-table-cell"
                    style={{ width: "200px" }}
                  >
                    주문처리
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order) => (
                  <tr
                    key={order.seq}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTableRowClick(order.seq)}
                  >
                    <td className="d-none d-md-table-cell">{order.orderNo}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <span>{order.saleTitle}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <span>{order.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <span>{formatPrice(order.totalPrice)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <span>
                          {stateList.map(
                            (item) => item.code === order.state && item.kor,
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="d-none d-lg-table-cell">
                      {order.insertDttm}
                    </td>

                    <td className="d-none d-lg-table-cell">
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
                    </td>
                    <td className="d-none d-lg-table-cell">
                      {setButtonByState(order.state, order.seq)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>등록된 주문이 존재하지 않습니다.</p>
          )}
        </Col>
      </Row>

      {/* PageNation */}
      <Row className={"my-3"}>
        <Col>
          <Pagination className="justify-content-center">
            <Pagination.First
              disabled={pageInfo.currentPageNumber === 1}
              onClick={() => handlePageNumberClick(1)}
            >
              <TbPlayerTrackPrev />
            </Pagination.First>
            <Pagination.Prev
              disabled={pageInfo.leftPageNumber <= 1}
              onClick={() =>
                handlePageNumberClick(pageInfo.leftPageNumber - 10)
              }
            >
              <GrPrevious />
            </Pagination.Prev>
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
              diabled={pageInfo.rightPageNumber >= pageInfo.totalPages}
              onClick={() =>
                handlePageNumberClick(pageInfo.rightPageNumber + 1)
              }
            >
              <GrNext />
            </Pagination.Next>
            <Pagination.Last
              disabled={pageInfo.currentPageNumber === pageInfo.totalPages}
              onClick={() => handlePageNumberClick(pageInfo.totalPages)}
            >
              <TbPlayerTrackNext />
            </Pagination.Last>
          </Pagination>
        </Col>
      </Row>
    </>
  );
}
