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

export function SaleModify() {
  const [sale, setSale] = useState(null);

  const [thumbnails, setThumbnails] = useState([]);
  const [deleteThumbnails, setDeleteThumbnails] = useState([]);
  const [contentImages, setContentImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);

  const { seq } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/sale/detail/${seq}`)
      .then((res) => {
        setSale(res.data);
      })
      .catch((err) => {
        toast("해당 판매상품이 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상 실행");
      });
  }, []);

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
        title: sale.title,
        quantity: sale.quantity,
        price: sale.price,
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
    sale.price < 0 ||
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
          {/* TODO Selectbox + 카테고리 관리DB 추가 */}
          <FormGroup className="mb-3" controlId="formCategory">
            <FormLabel>분류</FormLabel>
            <FormControl
              value={sale.category}
              onChange={(e) => setSale({ ...sale, category: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        {/* TODO 상품 테이블 조회 */}
        {/*
        <div>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel>상품명</FormLabel>
            <FormControl
              value={sale.name}
              onChange={(e) => setSale({ ...sale, name: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        */}
        <div>
          <FormGroup className="mb-3" controlId="formTitle">
            <FormLabel>제목</FormLabel>
            <FormControl
              value={sale.title}
              onChange={(e) => setSale({ ...sale, title: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        {/*
        <div>
          <FormGroup className="mb-3" controlId="formBrand">
            <FormLabel>브랜드명</FormLabel>
            <FormControl
              value={sale.brand}
              onChange={(e) => setSale({ ...sale, brand: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formStandard">
            <FormLabel>규격</FormLabel>
            <FormControl
              value={sale.standard}
              onChange={(e) => setSale({ ...sale, standard: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formStock">
            <FormLabel>재고수량</FormLabel>
            <FormControl
              type="number"
              step={1}
              value={sale.stock}
              onChange={(e) => setSale({ ...sale, stock: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formPrice">
            <FormLabel>개당 가격</FormLabel>
            <FormControl
              type="number"
              step={10}
              value={sale.price}
              onChange={(e) => setSale({ ...sale, price: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formNote">
            <FormLabel>비고</FormLabel>
            <FormControl
              as="textarea"
              rows={6}
              value={sale.note}
              onChange={(e) => setSale({ ...sale, note: e.target.value })}
            />
          </FormGroup>
        </div>
        */}
        <div>
          <FormGroup className="mb-3" controlId="formQuantity">
            <FormLabel>판매건당수량</FormLabel>
            <FormControl
              type="number"
              step={1}
              value={sale.quantity}
              onChange={(e) => setSale({ ...sale, quantity: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        {/* TODO 판매건당가격 price 용어 변경(판매가격 중복방지) */}
        <div>
          <FormGroup className="mb-3" controlId="formPrice">
            <FormLabel>판매건당가격</FormLabel>
            <FormControl
              type="number"
              step={10}
              value={sale.price}
              onChange={(e) => setSale({ ...sale, price: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
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
