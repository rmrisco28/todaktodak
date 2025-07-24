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

export function ProductAdd() {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [standard, setStandard] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [note, setNote] = useState("");
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  let validate = true;
  if (name.trim() === "") {
    validate = false;
  }
  if (note.trim() === "") {
    validate = false;
  }

  function handleSaveButtonClick() {
    setIsProcessing(true);
    axios
      .postForm("/api/product/add", {
        category: category,
        brand: brand,
        name: name,
        standard: standard,
        stock: stock,
        price: price,
        note: note,
        images: images,
      })
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate("/product/list");
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
        <h2 className="mb-4">관리 상품 등록</h2>
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
        <div>
          <FormGroup className="mb-3" controlId="formName">
            <FormLabel>상품명</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
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
