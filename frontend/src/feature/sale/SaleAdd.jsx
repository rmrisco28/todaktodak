import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  FormText,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router";

export function SaleAdd() {
  const [productList, setProductList] = useState([]);
  const [productNo, setProductNo] = useState("");
  const [product, setProduct] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [salePrice, setSalePrice] = useState(0);

  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [content, setContent] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [contentImages, setContentImages] = useState([]);

  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const [params] = useSearchParams();

  // 카테고리 목록 조회
  useEffect(() => {
    axios.get(`/api/category/formSelect`).then((res) => {
      setCategoryList(res.data);
      if (params.get("categoryName")) {
        setCategory(params.get("categoryName"));
      }
    });
  }, []);

  // 상품 목록 조회 by카테고리
  useEffect(() => {
    const paramCategory = new URLSearchParams();
    paramCategory.set("category", category);
    axios
      .get(`/api/product/formSelect`, { params: paramCategory })
      .then((res) => {
        setProductList(res.data);
        if (params.get("productNo")) {
          setProductNo(params.get("productNo"));
        }
      });
  }, [category]);

  // 상품의 데이터(재고,가격) 조회 by상품
  useEffect(() => {
    if (productNo !== null && productNo !== "") {
      const paramProductNo = new URLSearchParams();
      paramProductNo.set("productNo", productNo);
      axios
        .get(`/api/product/detail`, { params: paramProductNo })
        .then((res) => {
          setProduct(res.data);
          setTitle(res.data.name);
          setSalePrice(res.data.price);
        });
    }
  }, [productNo]);

  // 수량을 콤마 포맷으로 변경하는 함수
  const formatCount = (count) => {
    return count ? `${count.toLocaleString()}개` : "수량 없음";
  };

  // 가격을 콤마 포맷으로 변경하는 함수
  const formatPrice = (price) => {
    return price ? `${price.toLocaleString()}원` : "가격 미정";
  };

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
              value={category}
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
            <FormLabel>판매상품</FormLabel>
            <FormSelect
              className="mb-3"
              value={productNo}
              onChange={(e) => setProductNo(e.target.value)}
            >
              <option>판매상품 선택</option>
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
            {product?.stock ? (
              <FormText className="text-danger">
                상품 재고량: {formatCount(product.stock)}
              </FormText>
            ) : null}
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
            {product?.price ? (
              <FormText className="text-danger">
                상품 가격: {formatPrice(product.price)}
              </FormText>
            ) : null}
          </FormGroup>
        </div>
        <div>
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
