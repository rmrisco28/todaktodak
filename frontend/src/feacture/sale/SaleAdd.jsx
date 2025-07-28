import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function SaleAdd() {
  const [category, setCategory] = useState("");
  // const [brand, setBrand] = useState("");
  // const [name, setName] = useState("");
  // const [standard, setStandard] = useState("");
  // const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  // const [note, setNote] = useState("");
  // const [images, setImages] = useState([]);

  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [content, setContent] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [contentImages, setContentImages] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  let validate = true;
  if (
    category.trim() === "" ||
    title.trim() === "" ||
    quantity < 0 ||
    price < 0 ||
    deliveryFee < 0 ||
    content.trim() === ""
  ) {
    validate = false;
  }

  function handleSaveButtonClick() {
    setIsProcessing(true);
    axios
      .postForm("/api/sale/add", {
        category: category,
        title: title,
        quantity: quantity,
        price: price,
        deliveryFee: deliveryFee,
        content: content,
        thumbnails: thumbnails,
        contentImages: contentImages,
      })
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate("/sale/list");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">판매 상품 등록</h2>
        <div>
          {/* TODO Selectbox + 카테고리 관리DB 추가 */}
          <FormGroup className="mb-3" controlId="formCategory">
            <FormLabel>분류</FormLabel>
            <FormControl
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        {/* TODO 상품 테이블 조회 */}
        {/*
        <div>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel>상품명</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        */}
        <div>
          <FormGroup className="mb-3" controlId="formTitle">
            <FormLabel>제목</FormLabel>
            <FormControl
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        {/*
        <div>
          <FormGroup className="mb-3" controlId="formBrand">
            <FormLabel>브랜드명</FormLabel>
            <FormControl
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formStandard">
            <FormLabel>규격</FormLabel>
            <FormControl
              value={standard}
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
              value={stock}
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
              value={price}
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
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          {/* 판매건당가격 price 용어 변경(판매가격 중복방지) */}
          <FormGroup className="mb-3" controlId="formPrice">
            <FormLabel>판매건당가격</FormLabel>
            <FormControl
              type="number"
              step={10}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          {/* 배달업체 데이터 조회  */}
          <FormGroup className="mb-3" controlId="formDeliveryFee">
            <FormLabel>배송비</FormLabel>
            <FormControl
              type="number"
              step={10}
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formContent">
            <FormLabel>본문내용</FormLabel>
            <FormControl
              as="textarea"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formThumbnails">
            <FormLabel>판매상품 썸네일</FormLabel>
            <FormControl
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setThumbnails(e.target.files)}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formContentImages">
            <FormLabel>판매상품 본문이미지</FormLabel>
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
            onClick={handleSaveButtonClick}
            disabled={isProcessing || !validate}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
        </div>
      </Col>
    </Row>
  );
}
