import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function MainSaleList() {
  const [pageSize, setPageSize] = useState(10);
  const [saleList, setSaleList] = useState(null);

  const navigate = useNavigate();

  // 판매상품 목록 조회
  useEffect(() => {
    axios
      .get(`/api/sale/list`)
      .then((res) => {
        setSaleList(res.data.saleList);
      })
      .catch((err) => {
        console.log("오류 발생");
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  if (!saleList) {
    return <Spinner />;
  }

  function handleTableRowClick(seq) {
    // 판매상품 상세 보기 이동
    navigate(`/sale/detail/${seq}`);
  }

  function handleAddListButtonClick() {
    axios
      .get(`/api/sale/list?s=` + (pageSize + 10))
      .then((res) => {
        setPageSize(pageSize + 10);
        setSaleList(res.data.saleList);
      })
      .catch((err) => {
        console.log("오류 발생");
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }

  return (
    <>
      <Row>
        <Col>
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
          )}
        </Col>
        <Button variant="primary" onClick={handleAddListButtonClick}>
          더보기
        </Button>
      </Row>
    </>
  );
}
