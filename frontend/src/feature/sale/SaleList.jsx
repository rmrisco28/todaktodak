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
} from "react-bootstrap";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BiSearchAlt2 } from "react-icons/bi";

export function SaleList() {
  const [keyword, setKeyword] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [saleList, setSaleList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(null);

  // 카테고리 목록 조회
  useEffect(() => {
    axios.get(`/api/category/formSelect`).then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  // 판매상품 목록 조회
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const category = searchParams.get("c");

    setKeyword(q);
    setActiveCategory(category ? parseInt(category) : null);

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

          {/* 카테고리 버튼 */}
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-2">
              <Button
                variant={activeCategory === null ? "dark" : "outline-dark"}
                size="sm"
                style={{ minWidth: 100, textAlign: "center" }}
                onClick={() => {
                  setActiveCategory(null);
                  const params = new URLSearchParams(searchParams);
                  params.delete("c");
                  setSearchParams(params);
                }}
              >
                전체
              </Button>
              {categoryList.map((item) => (
                <Button
                  key={item.seq}
                  variant={
                    activeCategory === item.seq ? "dark" : "outline-dark"
                  }
                  size="sm"
                  style={{ minWidth: 100, textAlign: "center" }}
                  onClick={() => {
                    setActiveCategory(item.seq);
                    const params = new URLSearchParams(searchParams);
                    params.set("c", item.seq);
                    setSearchParams(params);
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>

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
                        {sale.salePrice
                          ? sale.salePrice.toLocaleString() + "원"
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
