import axios from "axios";
import { useContext, useEffect, useState } from "react";
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
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";
import "../../css/sale_list.css";
import { IoSearch } from "react-icons/io5";

export function SaleList() {
  const { isAdmin } = useContext(AuthenticationContext);
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
          {isAdmin() && (
            <Button
              className={`btn ${activeCategory === null ? "btn-info" : "btn-info"} rounded-pill px-4 py-2 fw-medium`}
              onClick={() => navigate(`/sale/add`)}
            >
              판매상품 등록
            </Button>
          )}
          {/* 카테고리 버튼 */}
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
          {/* 검색창 */}
          <div className="mb-3">
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
                      className="btn btn-dark  mb-0 px-3"
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

          {/*상품 목록*/}
          {saleList.length > 0 ? (
            <div className="row g-3">
              {saleList.map((sale) => (
                <div key={sale.seq} className="col-6 col-md-4 col-xl-3">
                  <div
                    className="product-card"
                    onClick={() => handleTableRowClick(sale.seq)}
                  >
                    {/* 이미지는 div의 배경으로 처리하여 확대/축소 효과를 깔끔하게 만듭니다. */}
                    <div
                      className="product-card-bg"
                      style={{
                        backgroundImage: `url('${sale.thumbnailPath || "/placeholder.png"}')`,
                      }}
                    ></div>
                    {/* 텍스트 가독성을 위한 반투명 오버레이 */}
                    <div className="product-card-overlay"></div>
                    <div className="product-card-body">
                      <h6 className="product-card-title">{sale.title}</h6>
                      <p className="product-card-price">
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
        </Col>
      </Row>

      {/* PageNation */}
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
