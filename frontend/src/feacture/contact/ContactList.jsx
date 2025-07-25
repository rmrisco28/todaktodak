import { useNavigate, useSearchParams } from "react-router";
import { Button, Col, Pagination, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { GrNext, GrPrevious } from "react-icons/gr";

export function ContactList() {
  const [contactList, setContactList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  let navigate = useNavigate();

  useEffect(() => {
    console.log("aaa");
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
  }, [setSearchParams]);

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

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="mb-4">문의게시판</h2>

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
          <Button onClick={() => navigate("/contact/add")}>글쓰기</Button>
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
