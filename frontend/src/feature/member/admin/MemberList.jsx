import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  InputGroup,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

export function MemberList() {
  const [memberList, setMemberList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setKeyword(q);
    } else {
      setKeyword("");
    }
    axios
      .get(`/api/member/list?${searchParams}`)
      .then((res) => {
        setMemberList(res.data.memberList);
        setPageInfo(res.data.pageInfo);
      })
      .catch((err) => {
        console.log(err);
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

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    navigate(`/member/list?q=${keyword}`);
  }

  return (
    <>
      {/* 제목과 검색 폼 */}
      <Row className="align-items-center mb-4">
        <Col>
          <h2
            style={{ cursor: "pointer", width: "130px" }}
            onMouseEnter={(e) => (e.target.style.color = "#007bff")}
            onMouseLeave={(e) => (e.target.style.color = "#000")}
            onClick={() => navigate("/member/list")}
          >
            회원목록
          </h2>
        </Col>
        <Col md="auto">
          <Form
            inline="true"
            className="d-flex"
            onSubmit={handleSearchFormSubmit}
          >
            <InputGroup>
              <FormControl
                style={{ width: "200px" }}
                placeholder="검색어 입력"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button type="submit" variant="primary" className="mb-0 px-3">
                <IoSearch className="opacity-8" />
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {memberList.length > 0 ? (
            <Table hover={true} striped={true}>
              <thead>
                <tr>
                  <th>시퀀스</th>
                  <th>ID</th>
                  <th>고객명</th>
                  <th>등록일시</th>
                  <th>사용여부</th>
                  <th>삭제여부</th>
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
                    <td>{member.insertDttm?.replace("T", " ")}</td>
                    <td>
                      <FormCheck
                        type="switch"
                        checked={member.useYn}
                        disabled
                        label={member.useYn ? "사용" : "미사용"}
                      />
                    </td>
                    <td>
                      <FormCheck
                        type="switch"
                        checked={member.delYn}
                        disabled
                        label={member.delYn ? "삭제" : "미삭제"}
                      />
                    </td>
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
      <Row className="my-3" style={{ position: "relative" }}>
        <Button
          variant="outline-primary"
          onClick={() => navigate("/member/add")}
          style={{ position: "absolute", left: 10, bottom: 0, width: "120px" }}
        >
          회원 등록
        </Button>
        <Col className="mb-0">
          <Pagination className="d-flex justify-content-center">
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
