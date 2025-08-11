import { MainBanner } from "./MainBanner.jsx";
import { MainCategory } from "./MainCategory.jsx";
import { MainSaleList } from "./MainSaleList.jsx";
import { Container } from "react-bootstrap";

export function MainView() {
  return (
    <div className="mb-3">
      <MainBanner />
      <Container>
        <MainCategory />
        {/* TODO [@MINKI] 판매상품목록: 스크롤 내렸을 때 추가 조회 */}
        <MainSaleList />
      </Container>
    </div>
  );
}
