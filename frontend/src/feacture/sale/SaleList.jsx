import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { FaThumbsUp } from "react-icons/fa6";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BiSearchAlt2 } from "react-icons/bi";

export function SaleList() {
  const [keyword, setKeyword] = useState("");
  const [saleList, setSaleList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setKeyword(q);
    } else {
      setKeyword("");
    }

    axios
      .get(`/api/sale/list?${searchParams}`)
      .then((res) => {
        setSaleList(res.data.saleList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.log("오류 발생");
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, [searchParams]);

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    navigate("/sale/list?q=" + keyword);
  }

  if (!saleList) {
    return <Spinner />;
  }

  function handleTableRowClick(seq) {
    // 판매상품 상세 보기 이동
    navigate(`/sale/detail/${seq}`);
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

  return (
    <>
      <Row>
        <Col>
          <h2 className="mb-4">판매 상품 목록</h2>
          {/* 판매상품 등록 */}
          <Button variant="primary" onClick={() => navigate(`/sale/add`)}>
            판매상품 등록
          </Button>

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
              <Button type="submit">
                <BiSearchAlt2 />
              </Button>
            </InputGroup>
          </Form>

          {saleList.length > 0 ? (
            <Row xs={2} sm={3} md={4} lg={5} className="g-4">
              {saleList.map((sale) => (
                <Col key={sale.seq}>
                  <Card
                    style={{ cursor: "pointer", height: "100%" }}
                    onClick={() => handleTableRowClick(sale.seq)}
                  >
                    <Card.Img
                      variant="top"
                      src={sale.thumbnailPath || "/placeholder.png"}
                      style={{
                        height: "180px",
                        objectFit: "cover",
                        borderBottom: "1px solid #eee",
                      }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title
                        style={{ fontSize: "1rem" }}
                        className="text-truncate"
                      >
                        {sale.title}
                      </Card.Title>
                      <Card.Text className="text-muted mb-0">
                        {sale.price
                          ? sale.price.toLocaleString() + "원"
                          : "가격 미정"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>등록된 판매상품이 존재하지 않습니다.</p>
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
