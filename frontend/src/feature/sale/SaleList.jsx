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
import "../../css/sale_list.css";

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
          {/* todo gg 0813 판매상품 버튼 프론트엔드 변경*/}
          {/* 판매상품 등록 */}
          {/*          <Button variant="primary" onClick={() => navigate(`/sale/add`)}>
            판매상품 등록
          </Button>*/}
          <Button
            className={`btn ${activeCategory === null ? "btn-info" : "btn-info"} rounded-pill px-4 py-2 fw-medium`}
            onClick={() => navigate(`/sale/add`)}
          >
            판매상품 등록
          </Button>
          {/* 카테고리 버튼 */}
          {/* todo gg 0813 카테고리버튼 프론트엔드 변경*/}
          {/*          <div className="mb-4">
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
          </div>*/}
          {/* todo gg 0813 카테고리 목록 프론트엔드 변경*/}
          {/*          <div className="mb-4">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <button
                className={`btn ${activeCategory === null ? "btn-dark" : "btn-outline-secondary"} rounded-pill px-4 py-2 fw-medium`}
                style={{
                  minWidth: 120,
                  textAlign: "center",
                  border:
                    activeCategory === null ? "none" : "1px solid #dee2e6",
                  transition: "all 0.2s ease",
                }}
                onClick={() => {
                  setActiveCategory(null);
                  const params = new URLSearchParams(searchParams);
                  params.delete("c");
                  setSearchParams(params);
                }}
              >
                전체
              </button>
              {categoryList.map((item) => (
                <button
                  key={item.seq}
                  className={`btn ${activeCategory === item.seq ? "btn-dark" : "btn-outline-secondary"} rounded-pill px-4 py-2 fw-medium`}
                  style={{
                    minWidth: 120,
                    textAlign: "center",
                    border:
                      activeCategory === item.seq
                        ? "none"
                        : "1px solid #dee2e6",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => {
                    setActiveCategory(item.seq);
                    const params = new URLSearchParams(searchParams);
                    params.set("c", item.seq);
                    setSearchParams(params);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <hr />*/}
          <div className="mb-4">
            <ul
              className=" nav nav-pills nav-fill p-1  mx-auto nav-equal"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link mb-0 px-2 py-2 fw-medium ${activeCategory === null ? "active" : ""}`}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onClick={() => {
                    setActiveCategory(null);
                    const params = new URLSearchParams(searchParams);
                    params.delete("c");
                    setSearchParams(params);
                  }}
                  role="tab"
                  aria-selected={activeCategory === null}
                >
                  전체
                </a>
              </li>
              {categoryList.map((item) => (
                <li key={item.seq} className="nav-item" role="presentation">
                  <a
                    className={`nav-link mb-0 px-2 py-2 fw-medium ${activeCategory === item.seq ? "active" : ""}`}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onClick={() => {
                      setActiveCategory(item.seq);
                      const params = new URLSearchParams(searchParams);
                      params.set("c", item.seq);
                      setSearchParams(params);
                    }}
                    role="tab"
                    aria-controls={`category-${item.seq}`}
                    aria-selected={activeCategory === item.seq}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4"></div>
          {/* todo gg 0813 상품 검색창 프론트엔드 변경*/}
          <div className="mb-5">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <Form onSubmit={handleSearchFormSubmit}>
                  <div
                    className="input-group shadow-sm"
                    style={{ borderRadius: "50px", overflow: "hidden" }}
                  >
                    <input
                      type="text"
                      className="form-control border-0 px-4 py-3"
                      placeholder="원하는 상품을 검색해보세요..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      style={{
                        fontSize: "1rem",
                        background: "#f8f9fa",
                      }}
                    />
                    <button
                      type="submit"
                      className="btn btn-dark px-4"
                      style={{ borderRadius: "0 50px 50px 0" }}
                    >
                      <BiSearchAlt2 size={20} />
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="mb-5"></div>
          {/* todo gg 0813 상품 목록 프론트엔드 변경*/}
          {saleList.length > 0 ? (
            <div className="row g-3">
              {saleList.map((sale) => (
                <div key={sale.seq} className="col-6 col-md-4 col-xl-3">
                  <div
                    className="card border-0 h-100"
                    style={{
                      cursor: "pointer",
                      borderRadius: "12px",
                      overflow: "hidden",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onClick={() => handleTableRowClick(sale.seq)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 25px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 2px 10px rgba(0,0,0,0.05)";
                    }}
                  >
                    <img
                      src={sale.thumbnailPath || "/placeholder.png"}
                      className="card-img-top"
                      alt={sale.title}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body p-3">
                      <h6
                        className="fw-semibold mb-1 text-truncate"
                        style={{ fontSize: "0.95rem" }}
                      >
                        {sale.title}
                      </h6>
                      <p
                        className="text-dark fw-bold mb-0"
                        style={{ fontSize: "1rem" }}
                      >
                        {sale.salePrice
                          ? sale.salePrice.toLocaleString() + "원"
                          : "가격 미정"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted mb-0" style={{ fontSize: "1.1rem" }}>
                등록된 판매상품이 존재하지 않습니다
              </p>
            </div>
          )}
          <div className="mb-5"></div>
          {/*          <Form
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
          )}*/}
        </Col>
      </Row>

      {/* PageNation */}
      {/* todo gg 0813 페이지네이션 프론트엔드 변경*/}
      {/*      <Row className={"my-3"}>
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
      </Row>*/}

      <div className="my-5">
        <nav aria-label="Page navigation">
          <div className="d-flex justify-content-center align-items-center gap-1">
            {/* Previous */}
            <button
              className="btn btn-link text-muted p-2"
              style={{
                border: "none",
                background: "none",
                transition: "color 0.2s ease",
              }}
              disabled={pageInfo.currentPageNumber === 1}
              onClick={() =>
                handlePageNumberClick(pageInfo.currentPageNumber - 1)
              }
              onMouseEnter={(e) => (e.target.style.color = "#333")}
              onMouseLeave={(e) =>
                (e.target.style.color =
                  pageInfo.currentPageNumber === 1 ? "#6c757d" : "#6c757d")
              }
            >
              <GrPrevious size={16} />
            </button>

            {/* Page Numbers */}
            <div className="d-flex gap-1 mx-3">
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`btn ${pageInfo.currentPageNumber === pageNumber ? "btn-dark" : "btn-outline-light"} d-flex align-items-center justify-content-center`}
                  style={{
                    width: "45px",
                    height: "32px",
                    borderRadius: "8px",
                    border:
                      pageInfo.currentPageNumber === pageNumber
                        ? "none"
                        : "1px solid #e9ecef",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    padding: "0", // 패딩 제거해서 텍스트 완전 중앙 정렬
                  }}
                  onClick={() => handlePageNumberClick(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              className="btn btn-link text-muted p-2"
              style={{
                border: "none",
                background: "none",
                transition: "color 0.2s ease",
              }}
              disabled={pageInfo.currentPageNumber === pageInfo.totalPages}
              onClick={() =>
                handlePageNumberClick(pageInfo.currentPageNumber + 1)
              }
              onMouseEnter={(e) => (e.target.style.color = "#333")}
              onMouseLeave={(e) =>
                (e.target.style.color =
                  pageInfo.currentPageNumber === pageInfo.totalPages
                    ? "#6c757d"
                    : "#6c757d")
              }
            >
              <GrNext size={16} />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
