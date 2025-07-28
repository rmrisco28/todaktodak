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
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

export function ContactDeleted() {
  const [contactDeletedList, setContactDeletedList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [keyword, setKeyword] = useState("");

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
      .get(`/api/contact/deleted/list?${searchParams}`)
      .then((res) => {
        console.log("yes");
        setContactDeletedList(res.data.contactDeletedList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.log("no");
        console.log(err);
      })
      .finally(() => {
        4;

        console.log("always");
      });
  }, [searchParams]);

  if (!contactDeletedList) {
    return <Spinner />; // 로딩 중에는 Spinner를 보여준다
  }

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    navigate(`/contact/deleted/list?q=${keyword}`);
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
        <Col xs={12} md={8} lg={8}>
          <h2>삭제된 게시판</h2>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>삭제/수정일시</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {contactDeletedList &&
                contactDeletedList.length > 0 &&
                contactDeletedList.map((contact) => (
                  <tr
                    key={contact.seq}
                    onClick={() => {
                      navigate(`/contact/deleted/detail/${contact.seq}`);
                    }}
                  >
                    <td>{contact.seq}</td>
                    <td>{contact.title}</td>
                    <td>{contact.name}</td>
                    <td>1</td>
                    <td>{contact.view}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/*검색버튼*/}
          <Form
            inline="true"
            onSubmit={handleSearchFormSubmit}
            className="d-flex justify-content-center mb-2"
          >
            <InputGroup style={{ width: "300px" }} className="mb-3">
              <FormControl
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="검색어를 입력하세요."
              ></FormControl>
              <Button type="submit">검색</Button>
            </InputGroup>
          </Form>
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
