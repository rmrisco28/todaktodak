import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function MainCategory() {
  const [categoryList, setCategoryList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/category/formSelect`).then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  if (!categoryList) {
    return <Spinner />;
  }

  return (
    <>
      <Row>
        <Col>
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-2">
              {categoryList.map((item) => (
                <Button
                  key={item.seq}
                  variant={"outline-dark"}
                  size="sm"
                  style={{ minWidth: 100, textAlign: "center" }}
                  onClick={() => {
                    navigate("/sale/list?c=" + item.seq);
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
