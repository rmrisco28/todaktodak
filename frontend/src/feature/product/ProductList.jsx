import axios from "axios";
import { useContext, useEffect, useState } from "react";
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
import { FaThumbsUp } from "react-icons/fa6";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BiSearchAlt2 } from "react-icons/bi";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";
import { toast } from "react-toastify";

export function ProductList() {
  const { user, isAdmin } = useContext(AuthenticationContext);
  const [keyword, setKeyword] = useState("");
  const [productList, setProductList] = useState(null);
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
      .get(`/api/product/list?${searchParams}`)
      .then((res) => {
        setProductList(res.data.productList);
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
    navigate("/product/list?q=" + keyword);
  }

  // if (!user) {
  //   alert("로그인이 필요합니다.");
  // }
  // if (user && !user.scope.includes("ROLE_ADMIN")) {
  //   alert("권한이 없습니다.");
  // }
  if (!productList) {
    return <Spinner />;
  }

  function handleTableRowClick(seq) {
    navigate(`/product/detail/${seq}`);
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
          <h2 className="mb-4">관리 상품 목록</h2>
          {/* 상품 등록 */}
          <Button variant="primary" onClick={() => navigate(`/product/add`)}>
            상품 등록
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

          {productList.length > 0 ? (
            <Table striped={true} hover={true}>
              <thead>
                <tr>
                  <th style={{ width: "70px" }}>번호</th>
                  <th
                    className="d-none d-md-table-cell"
                    style={{ width: "200px" }}
                  >
                    상품번호
                  </th>
                  <th>상품명</th>
                  <th
                    className="d-none d-lg-table-cell"
                    style={{ width: "200px" }}
                  >
                    등록일시
                  </th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr
                    key={product.seq}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTableRowClick(product.seq)}
                  >
                    <td>{product.seq}</td>
                    <td className="d-none d-md-table-cell">
                      {product.productNo}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td className="d-none d-lg-table-cell">
                      {product.timesAgo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>등록된 상품이 존재하지 않습니다.</p>
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
