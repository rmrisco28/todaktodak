import { MainBanner } from "./MainBanner.jsx";
import { MainCategory } from "./MainCategory.jsx";
import { MainSaleList } from "./MainSaleList.jsx";
import { Container } from "react-bootstrap";

export function MainView() {
  return (
    <div className="mb-3">
      <MainBanner />
      <Container>
        {/* TODO [@MINKI] 카테고리: 버튼 디자인 변경 (icon-img 또는 깔끔한디자인) */}
        <MainCategory />
        {/* TODO [@MINKI] 판매상품목록: 스크롤 내렸을 때 추가 조회 */}
        <MainSaleList />
      </Container>
    </div>
  );
}
