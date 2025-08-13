import React from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function ProductCard({ sale }) {
  const navigate = useNavigate();

  // 가격을 콤마 포맷으로 변경하는 함수
  const formatPrice = (price) => {
    return price ? `${price.toLocaleString()}원` : "가격 미정";
  };

  return (
    // Bootstrap의 Col을 사용하여 그리드 아이템을 구성합니다.
    <Col className="mb-4" onClick={() => navigate(`/sale/detail/${sale.seq}`)}>
      <div className="product-card">
        {/* 이미지는 div의 배경으로 처리하여 확대/축소 효과를 깔끔하게 만듭니다. */}
        <div
          className="product-card-bg"
          style={{
            backgroundImage: `url('${sale.thumbnailPath || "/placeholder.png"}')`,
          }}
        ></div>
        {/* 텍스트 가독성을 위한 반투명 오버레이 */}
        <div className="product-card-overlay"></div>
        <div className="product-card-body">
          <h5 className="product-card-title">{sale.title}</h5>
          <p className="product-card-price">{formatPrice(sale.salePrice)}</p>
        </div>
      </div>
    </Col>
  );
}
