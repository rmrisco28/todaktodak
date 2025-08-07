import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Pagination,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { GrNext, GrPrevious } from "react-icons/gr";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaRegPenToSquare, FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";

export function BannerList() {
  const [deleteTarget, setDeleteTarget] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [bannerList, setBannerList] = useState(null);
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
      .get(`/api/banner/list?${searchParams}`)
      .then((res) => {
        setBannerList(res.data.bannerList);
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
    navigate("/banner/list?q=" + keyword);
  }

  if (!bannerList) {
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

  function handleDeleteCategoryModalShow(seq) {
    setDeleteTarget(seq);
    return setModalShow(true);
  }

  function handleDeleteButtonClick() {
    axios
      .put(`/api/banner/${deleteTarget}`)
      .then((res) => {
        const message = res.data.message;
        console.log(message);
        if (message) {
          toast(message.text, { type: message.type, autoClose: 1500 });
        }
        setTimeout(() => {
          navigate(0);
        }, 1500);
      })
      .catch((err) => {
        console.log("동작 오류");
        toast("배너가 삭제되지 않았습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
    return null;
  }

  return (
    <>
      <Row>
        <Col>
          <h2 className="mb-4">메인 배너 목록</h2>
          <Button variant="primary" onClick={() => navigate(`/banner/add`)}>
            배너 등록
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

          {bannerList.length > 0 ? (
            <Table striped={true} hover={true}>
              <thead>
                <tr>
                  <th style={{ width: "70px" }}>번호</th>
                  <th>배너 제목</th>
                  <th style={{ width: "100px" }}>사용여부</th>
                  <th
                    className="d-none d-lg-table-cell"
                    style={{ width: "200px" }}
                  >
                    등록일시
                  </th>
                  <th
                    className="d-none d-lg-table-cell"
                    style={{ width: "200px" }}
                  >
                    수정일시
                  </th>
                  <th style={{ width: "70px" }}>수정</th>
                  <th style={{ width: "70px" }}>삭제</th>
                </tr>
              </thead>
              <tbody>
                {bannerList.map((banner) => (
                  <tr key={banner.seq}>
                    <td>{banner.seq}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <span>{banner.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <span>{banner.useYn ? "사용중" : "미사용"}</span>
                      </div>
                    </td>
                    <td className="d-none d-lg-table-cell">
                      {banner.timesAgo}
                    </td>
                    <td className="d-none d-lg-table-cell">
                      {banner.updateTimesAgo}
                    </td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        onClick={() => navigate(`/banner/modify/${banner.seq}`)}
                      >
                        {/*수정*/}
                        <FaRegPenToSquare />
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="me-2"
                        variant="outline-danger"
                        onClick={() =>
                          handleDeleteCategoryModalShow(banner.seq)
                        }
                      >
                        {/*삭제*/}
                        <FaXmark />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>등록된 배너가 존재하지 않습니다.</p>
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

        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>배너 삭제 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>{deleteTarget} 번 배너를 삭제하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setModalShow(false)}>
              취소
            </Button>
            <Button variant="danger" onClick={handleDeleteButtonClick}>
              삭제
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}
