import { MainBanner } from "./MainBanner.jsx";
import { MainCategory } from "./MainCategory.jsx";
import { MainSaleList } from "./MainSaleList.jsx";

export function MainView() {
  return (
    <div>
      <div className="mb-3">
        {/* TODO [@MINKI] 메인배너: 배너관리CRUD 추가, 배너이미지 변경, 링크 적용 */}
        <MainBanner />
        {/* TODO [@MINKI] 카테고리: 버튼 디자인 변경 (icon-img 또는 깔끔한디자인) */}
        <MainCategory />
        {/* TODO [@MINKI] 판매상품목록: 스크롤 내렸을 때 추가 조회 */}
        <MainSaleList />
      </div>
    </div>
  );
}
