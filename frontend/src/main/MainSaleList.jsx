import { useCallback, useEffect, useRef, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import axios from "axios";
import "../css/main_salelist.css";
import * as PropTypes from "prop-types";
import { ProductCard } from "./ProductCard.jsx"; // 아래에 제공될 CSS 파일 임포트

ProductCard.propTypes = { sale: PropTypes.any };

export function MainSaleList() {
  const [saleList, setSaleList] = useState([]);
  const [page, setPage] = useState(1); // 페이지 번호 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const observer = useRef(); // Intersection Observer를 위한 ref

  // 데이터 로딩 함수
  const loadMoreSales = useCallback(async () => {
    setIsLoading(true);
    try {
      // 페이지 번호와 페이지 사이즈를 기반으로 데이터 요청
      const res = await axios.get(`/api/sale/list?p=${page}&s=10`);
      const newSales = res.data.saleList;

      setSaleList((prevSales) => [...prevSales, ...newSales]); // 기존 리스트에 새 데이터 추가
      setHasMore(newSales.length > 0); // 새로 불러온 데이터가 없으면 hasMore를 false로 설정
      setPage((prevPage) => prevPage + 1); // 다음 페이지 번호로 업데이트
    } catch (err) {
      console.error("판매상품 목록 조회 오류:", err);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  // 컴포넌트 마운트 시 첫 데이터 로딩
  useEffect(() => {
    loadMoreSales();
  }, []); // 최초 1회만 실행

  // 무한 스크롤을 위한 Intersection Observer 설정
  const lastSaleElementRef = useCallback(
    (node) => {
      if (isLoading) return; // 로딩 중이면 중복 실행 방지
      if (observer.current) observer.current.disconnect(); // 기존 observer 연결 해제

      observer.current = new IntersectionObserver((entries) => {
        // 마지막 요소가 보이고, 더 불러올 데이터가 있을 때
        if (entries[0].isIntersecting && hasMore) {
          loadMoreSales();
        }
      });

      if (node) observer.current.observe(node); // 새 마지막 요소에 observer 연결
    },
    [isLoading, hasMore, loadMoreSales],
  );

  return (
    <div className="mt-4">
      <Row xs={2} sm={2} md={3} lg={5}>
        {saleList.map((sale, index) => {
          // 마지막 상품 카드에 ref를 연결하여 감시 대상으로 지정
          if (saleList.length === index + 1) {
            return (
              <div ref={lastSaleElementRef} key={sale.seq} className="col">
                <ProductCard sale={sale} />
              </div>
            );
          } else {
            return <ProductCard key={sale.seq} sale={sale} />;
          }
        })}
      </Row>
      {/* 로딩 중일 때 스피너 표시 */}
      {isLoading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" />
        </div>
      )}
      {/* 더 이상 데이터가 없을 때 메시지 표시 */}
      {!hasMore && saleList.length > 0 && (
        <p className="text-center my-3">모든 상품을 불러왔습니다.</p>
      )}
    </div>
  );
}
