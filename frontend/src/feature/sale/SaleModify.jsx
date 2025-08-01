import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Image,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { TfiTrash } from "react-icons/tfi";

export function SaleModify() {
  const [productList, setProductList] = useState([]);
  const [productNo, setProductNo] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");

  const [sale, setSale] = useState(null);

  const [thumbnails, setThumbnails] = useState([]);
  const [deleteThumbnails, setDeleteThumbnails] = useState([]);
  const [contentImages, setContentImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { seq } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/sale/detail/${seq}`)
      .then((res) => {
        setSale(res.data);
        setCategory(res.data.category);
        setProductNo(res.data.productNo);
      })
      .catch((err) => {
        toast("해당 판매상품이 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

  useEffect(() => {
    axios.get(`/api/category/formSelect`).then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("category", category);
    axios
      .get(`/api/product/formSelect`, { params: searchParams })
      .then((res) => {
        setProductList(res.data);
      });
  }, [category]);

  if (!sale) {
    return <Spinner />;
  }

  function handleSaveButtonClick() {
    setIsProcessing(true);
    // console.log(product);
    axios
      .putForm(`/api/sale/modify/${seq}`, {
        // ...product,
        category: sale.category,
        productNo: sale.productNo,
        title: sale.title,
        quantity: sale.quantity,
        salePrice: sale.salePrice,
        deliveryFee: sale.deliveryFee,
        content: sale.content,
        thumbnails: thumbnails,
        deleteThumbnails: deleteThumbnails,
        contentImages: contentImages,
        deleteImages: deleteImages,
      })
      .then((res) => {
        const message = res.data.message;
        toast(message.text, { type: message.type });
        navigate(`/sale/detail/${seq}`);
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        } else {
          toast("판매상품 수정 시 오류가 발생하였습니다.", { type: "warning" });
        }
      })
      .finally(() => {
        console.log("always");
        setModalShow(false);
        setIsProcessing(false);
      });
  }

  if (!sale) {
    return <Spinner />;
  }

  let validate = true;
  if (
    sale.category.trim() === "" ||
    sale.title.trim() === "" ||
    sale.quantity < 0 ||
    sale.salePrice < 0 ||
    sale.deliveryFee < 0 ||
    sale.content.trim() === ""
  ) {
    validate = false;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">판매 상품 수정</h2>
        <div>
          <FormGroup className="mb-3" controlId="formCategory">
            <FormLabel>카테고리</FormLabel>
            <FormSelect
              className="mb-3"
              value={sale.category}
              onChange={(e) => {
                setSale({ ...sale, category: e.target.value });
                setCategory(e.target.value);
              }}
            >
              <option>카테고리 선택</option>
              {categoryList.map((item) => (
                <option value={item.name} key={item.seq}>
                  {item.name}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formProduct">
            <FormLabel>상품</FormLabel>
            <FormSelect
              className="mb-3"
              value={productNo}
              onChange={(e) => {
                setSale({ ...sale, productNo: e.target.value });
                setProductNo(e.target.value);
              }}
            >
              <option>상품 선택</option>
              {productList.map((item) => (
                <option value={item.productNo} key={item.seq}>
                  {item.name}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formTitle">
            <FormLabel>제목</FormLabel>
            <FormControl
              value={sale.title}
              onChange={(e) => setSale({ ...sale, title: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formQuantity">
            <FormLabel>판매건당수량</FormLabel>
            <FormControl
              type="number"
              step={1}
              value={sale.quantity}
              onChange={(e) => setSale({ ...sale, quantity: e.target.value })}
            ></FormControl>
            {/* TODO [@minki] 상품 테이블의 stock 출력 */}
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formSalePrice">
            <FormLabel>판매건당가격</FormLabel>
            <FormControl
              type="number"
              step={10}
              value={sale.salePrice}
              onChange={(e) => setSale({ ...sale, salePrice: e.target.value })}
            ></FormControl>
            {/* TODO [@minki] 상품 테이블의 price 출력 */}
          </FormGroup>
        </div>
        <div>
          {/* TODO [@minki] 배달업체 데이터 조회  */}
          <FormGroup className="mb-3" controlId="formDeliveryFee">
            <FormLabel>배송비</FormLabel>
            <FormControl
              type="number"
              step={10}
              value={sale.deliveryFee}
              onChange={(e) =>
                setSale({ ...sale, deliveryFee: e.target.value })
              }
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formContent">
            <FormLabel>본문내용</FormLabel>
            <FormControl
              as="textarea"
              rows={6}
              value={sale.content}
              onChange={(e) => setSale({ ...sale, content: e.target.value })}
            />
          </FormGroup>
        </div>

        <div className="mb-3">
          {/*  썸네일 이미지, 저장된 파일 목록 (+ 삭제 기능) */}
          <ListGroup>
            {sale.thumbnails.map((image, index) => (
              <ListGroupItem key={image.name}>
                <Stack direction="horizontal" gap={3}>
                  <div>
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={"btn-check-thumb-" + index}
                      value={image.name}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDeleteThumbnails([
                            ...deleteThumbnails,
                            e.target.value,
                          ]);
                        } else {
                          setDeleteThumbnails(
                            deleteThumbnails.filter(
                              (item) => item !== e.target.value,
                            ),
                          );
                        }
                      }}
                    />
                    <label
                      className="btn btn-outline-danger btn-sm"
                      htmlFor={"btn-check-thumb-" + index}
                    >
                      <TfiTrash />
                    </label>
                  </div>
                  <div>
                    <Image
                      style={{
                        filter: deleteThumbnails.includes(image.name)
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
          <FormGroup className="mb-3" controlId="formThumbnails">
            <FormLabel>판매상품 썸네일 추가</FormLabel>
            <FormControl
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setThumbnails(e.target.files)}
            />
          </FormGroup>
        </div>

        <div className="mb-3">
          {/*  본문이미지, 저장된 파일 목록 (+ 삭제 기능) */}
          <ListGroup>
            {sale.contentImages.map((image, index) => (
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
              onChange={(e) => setContentImages(e.target.files)}
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
        <Modal.Body>{sale.seq} 번 상품을 수정하시겠습니까?</Modal.Body>
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
