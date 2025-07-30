import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Pagination, Row, Spinner, Table } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";

export function MemberList() {
  const [memberList, setMemberList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/member/list?${searchParams}`)
      .then((res) => {
        console.log("응답 데이터:", res.data);
        setMemberList(res.data.memberList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.log("에러:", err);
      })
      .finally(() => {});
  }, [searchParams]);

  if (!memberList) {
    return <Spinner />;
  }

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handlePageNumberClick(pageNumber) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", pageNumber);
    setSearchParams(nextSearchParams);
  }

  return (
    <>
      <Row>
        <Col>
          <h2>회원목록</h2>
          {memberList.length > 0 ? (
            <Table hover={true} striped={true}>
              <thead>
                <tr>
                  <th>시퀀스</th>
                  <th>ID</th>
                  <th>고객명</th>
                  <th>등록일시</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => (
                  <tr
                    key={member.seq}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/member?seq=${member.seq}`)}
                  >
                    <td>{member.seq}</td>
                    <td>{member.memberId}</td>
                    <td>{member.name}</td>
                    <td>{member.insertDttm}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>회원이 없습니다.</p>
          )}
        </Col>
      </Row>

      {/* 페이지네이션 */}
      <Row className="my-3">
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
