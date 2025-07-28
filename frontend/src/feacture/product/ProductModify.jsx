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
import { useNavigate, useParams, useSearchParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { TfiTrash } from "react-icons/tfi";

export function ProductModify() {
  const [product, setProduct] = useState(null);

  const [images, setImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);

  const { seq } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/product/detail/${seq}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        toast("해당 상품이 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  if (!product) {
    return <Spinner />;
  }

  function handleSaveButtonClick() {
    setIsProcessing(true);
    // console.log(product);
    axios
      .putForm(`/api/product/modify/${seq}`, {
        // ...product,
        category: product.category,
        brand: product.brand,
        name: product.name,
        standard: product.standard,
        stock: product.stock,
        price: product.price,
        note: product.note,
        images: images,
        deleteImages: deleteImages,
      })
      .then((res) => {
        const message = res.data.message;
        toast(message.text, { type: message.type });
        navigate(`/product/detail/${seq}`);
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        } else {
          toast("상품 수정 시 오류가 발생하였습니다.", { type: "warning" });
        }
      })
      .finally(() => {
        console.log("always");
        setModalShow(false);
        setIsProcessing(false);
      });
  }

  if (!product) {
    return <Spinner />;
  }

  let validate = true;
  if (
    product.category.trim() === "" ||
    product.brand.trim() === "" ||
    product.name.trim() === "" ||
    product.standard.trim() === "" ||
    product.stock < 0 ||
    product.price < 0 ||
    product.note.trim() === ""
  ) {
    validate = false;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">관리 상품 수정</h2>
        <div>
          {/* TODO Selectbox + 카테고리 관리DB 추가 */}
          <FormGroup className="mb-3" controlId="formCategory">
            <FormLabel>분류</FormLabel>
            <FormControl
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel>상품명</FormLabel>
            <FormControl
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formBrand">
            <FormLabel>브랜드명</FormLabel>
            <FormControl
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formStandard">
            <FormLabel>규격</FormLabel>
            <FormControl
              value={product.standard}
              onChange={(e) =>
                setProduct({ ...product, standard: e.target.value })
              }
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
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
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
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
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
              onChange={(e) => setProduct({ ...product, note: e.target.value })}
            />
          </FormGroup>
        </div>

        <div>
          <FormGroup className="mb-3" controlId="formState">
            <FormLabel>상품등록상태</FormLabel>
            <FormControl
              value={product.state || "상태값 없음"}
              onChange={(e) =>
                setProduct({ ...product, state: e.target.value })
              }
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
            <FormLabel>상품 이미지 추가</FormLabel>
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
            {isProcessing || "수정"}
          </Button>
        </div>
      </Col>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>상품 수정 확인</Modal.Title>
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
            {isProcessing || "수정"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
