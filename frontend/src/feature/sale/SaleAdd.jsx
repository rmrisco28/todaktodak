import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function SaleAdd() {
  const [productList, setProductList] = useState([]);
  const [productNo, setProductNo] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [salePrice, setSalePrice] = useState(0);

  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [content, setContent] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [contentImages, setContentImages] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

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

  let validate = true;
  if (
    category.trim() === "" ||
    title.trim() === "" ||
    quantity < 0 ||
    salePrice < 0 ||
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
        productNo: productNo,
        title: title,
        quantity: quantity,
        salePrice: salePrice,
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
          <FormGroup className="mb-3" controlId="formCategory">
            <FormLabel>카테고리</FormLabel>
            <FormSelect
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
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
            <FormLabel>판매상품 선택</FormLabel>
            <FormSelect
              className="mb-3"
              onChange={(e) => setProductNo(e.target.value)}
            >
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="formQuantity">
            <FormLabel>판매건당수량</FormLabel>
            <FormControl
              type="number"
              step={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
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
