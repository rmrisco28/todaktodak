import axios from "axios";
import { useEffect, useState } from "react";
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

export function CategoryList() {
  const [keyword, setKeyword] = useState("");
  const [categoryList, setCategoryList] = useState(null);
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
      .get(`/api/category/list?${searchParams}`)
      .then((res) => {
        setCategoryList(res.data.categoryList);
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
    navigate("/category/list?q=" + keyword);
  }

  if (!categoryList) {
    return <Spinner />;
  }

  function handleTableRowClick(seq) {
    // 게시물 상세 보기 이동
    navigate(`/category/detail/${seq}`);
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

  function handleDeleteCategoryButton(seq) {
    return undefined;
  }

  return (
    <>
      <Row>
        <Col>
          <h2 className="mb-4">카테고리 목록</h2>
          <Button variant="primary" onClick={() => navigate(`/category/add`)}>
            카테고리 등록
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

          {categoryList.length > 0 ? (
            <Table striped={true} hover={true}>
              <thead>
                <tr>
                  <th style={{ width: "70px" }}>번호</th>
                  <th>카테고리명</th>
                  <th
                    className="d-none d-lg-table-cell"
                    style={{ width: "200px" }}
                  >
                    등록일시
                  </th>
                  <th style={{ width: "70px" }}>수정</th>
                  <th style={{ width: "70px" }}>삭제</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((category) => (
                  <tr
                    key={category.seq}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTableRowClick(category.seq)}
                  >
                    <td>{category.seq}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <span>{category.name}</span>
                      </div>
                    </td>
                    <td className="d-none d-lg-table-cell">
                      {category.timesAgo}
                    </td>
                    <td>
                      <Button
                        variant="outline-info"
                        onClick={() =>
                          navigate(`/category/modify/${category.seq}`)
                        }
                      >
                        수정
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="me-2"
                        variant="outline-danger"
                        onClick={handleDeleteCategoryButton(category.seq)}
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>등록된 카테고리가 존재하지 않습니다.</p>
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
