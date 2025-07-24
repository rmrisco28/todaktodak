import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { TfiTrash } from "react-icons/tfi";

export function ProductModify() {
  const [product, setProduct] = useState(null);

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [standard, setStandard] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [note, setNote] = useState("");
  const [images, setImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/product/detail/${searchParams.get("seq")}`)
      .then((res) => {
        console.log("동작 성공");
        setProduct(res.data);
      })
      .catch((err) => {
        console.log("동작 오류");
        toast("해당 상품이 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  if (!product) {
    return <Spinner />;
  }

  function handleSaveButtonClick() {}

  let validate = true;
  if (
    category.trim() === "" ||
    brand.trim() === "" ||
    name.trim() === "" ||
    standard.trim() === "" ||
    stock < 0 ||
    price < 0 ||
    note.trim() === ""
  ) {
    validate = false;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">관리 상품 등록</h2>
        <div>
          {/* TODO Selectbox + 카테고리 관리DB 추가 */}
          <FormGroup className="mb-3" controlId="formCategory">
            <FormLabel>분류</FormLabel>
            <FormControl
              value={product.category}
              onChange={(e) => setCategory(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel>상품명</FormLabel>
            <FormControl
              value={product.name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formBrand">
            <FormLabel>브랜드명</FormLabel>
            <FormControl
              value={product.brand}
              onChange={(e) => setBrand(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formStandard">
            <FormLabel>규격</FormLabel>
            <FormControl
              value={product.standard}
              onChange={(e) => setStandard(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formStock">
            <FormLabel>재고수량</FormLabel>
            <FormControl
              type="number"
              step={1}
              value={product.stock}
              onChange={(e) => setStock(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formPrice">
            <FormLabel>개당 가격</FormLabel>
            <FormControl
              type="number"
              step={10}
              value={product.price}
              onChange={(e) => setPrice(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formNote">
            <FormLabel>비고</FormLabel>
            <FormControl
              as="textarea"
              rows={6}
              value={product.note}
              onChange={(e) => setNote(e.target.value)}
            />
          </FormGroup>
        </div>

        <div className="mb-3">
          {/*  저장된 파일 목록 (+ 삭제 기능) */}
          <ListGroup>
            {product.images.map((image, index) => (
              <ListGroupItem key={image.name}>
                <Stack direction="horizontal" gap={3}>
                  <div>
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={"btn-check-" + index}
                      value={image.name}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDeleteImages([...deleteImages, e.target.value]);
                        } else {
                          setDeleteImages(
                            deleteImages.filter(
                              (item) => item !== e.target.value,
                            ),
                          );
                        }
                      }}
                    />
                    <label
                      className="btn btn-outline-danger btn-sm"
                      htmlFor={"btn-check-" + index}
                    >
                      <TfiTrash />
                    </label>
                  </div>
                  <div>
                    <Image
                      style={{
                        filter: deleteImages.includes(image.name)
                          ? "blur(3px)"
                          : "none",
                      }}
                      fluid
                      src={image.path}
                    />
                  </div>
                </Stack>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formImages">
            <FormLabel>이미지 파일 추가</FormLabel>
            <FormControl
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
            />
          </FormGroup>
        </div>

        <div>
          <FormGroup className="mb-3" controlId="formImages">
            <FormLabel>상품 이미지</FormLabel>
            <FormControl
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
            />
          </FormGroup>
        </div>

        <div className="mb-3">
          <Button
            className="me-2"
            onClick={() => navigate(-1)}
            variant="outline-secondary"
          >
            취소
          </Button>
          <Button
            onClick={() => setModalShow(true)}
            disabled={isProcessing || !validate}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
        </div>
      </Col>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>상품 등록 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>{product.seq} 번 상품을 수정하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
          <Button
            disabled={isProcessing}
            variant="primary"
            onClick={handleSaveButtonClick}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
