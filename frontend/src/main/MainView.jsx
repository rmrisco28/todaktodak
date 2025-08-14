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
        <MainSaleList />
      </Container>
    </div>
  );
}
