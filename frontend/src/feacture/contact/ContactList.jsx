import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export function ContactList() {
  const [contactList, setContactList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [keyword, setKeyword] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  let navigate = useNavigate();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setKeyword(q);
    } else {
      setKeyword("");
    }
    axios
      .get(`/api/contact/list?${searchParams}`)
      .then((res) => {
        console.log("ok");
        setContactList(res.data.contactList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.log("no");
      })
      .finally(() => {
        console.log("finally");
      });
  }, [searchParams]);

  if (!contactList) {
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

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    navigate(`/contact/list?q=${keyword}`);
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2
            className="mb-4"
            style={{
              // textAlign: "center",
              cursor: "pointer",
              width: "fit-content",
              transition: "coloer 0.2s",
              color: "#000",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#007bff")}
            onMouseLeave={(e) => (e.target.style.color = "#000")}
            onClick={() => navigate("/contact/list")}
          >
            문의게시판
          </h2>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일시</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {contactList.map((contact) => (
                <tr
                  key={contact.seq}
                  onClick={() => {
                    axios
                      .get(`/api/contact/${contact.seq}`) // 조회수 증가
                      .then(() => {
                        navigate(`/contact/detail/${contact.seq}`);
                      })
                      .catch((err) => {
                        console.log("조회수 증가 실패 err");
                      });
                  }}
                >
                  <td>{contact.seq}</td>
                  <td>{contact.title}</td>
                  <td>{contact.name}</td>
                  <td>{contact.insertDttm}</td>
                  <td>{contact.view}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center">
            {/*글 작성 버튼*/}
            <Button className="mb-2" onClick={() => navigate("/contact/add")}>
              글쓰기
            </Button>

            {/*검색버튼*/}
            <Form
              inline="true"
              onSubmit={handleSearchFormSubmit}
              className="d-flex justify-content-center mb-2"
            >
              <InputGroup style={{ width: "300px" }}>
                <FormControl
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="검색어를 입력하세요."
                ></FormControl>
                <Button type="submit">검색</Button>
              </InputGroup>
            </Form>
          </div>
          <hr />
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
