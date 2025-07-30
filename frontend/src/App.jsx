import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./common/MainLayout.jsx";
import { MainView } from "./main/MainView.jsx";
import { MemberLogin } from "./feature/member/MemberLogin.jsx";
import { MemberLogout } from "./feature/member/MemberLogout.jsx";
import { MemberSignup } from "./feature/member/MemberSignup.jsx";
import { MemberList } from "./feature/member/admin/MemberList.jsx";
import { MemberDetail } from "./feature/member/admin/MemberDetail.jsx";
import { MemberModify } from "./feature/member/admin/MemberModify.jsx";
import { MemberAdd } from "./feature/member/admin/MemberAdd.jsx";
import { ProductList } from "./feature/product/ProductList.jsx";
import { ProductDetail } from "./feature/product/ProductDetail.jsx";
import { BuyForm } from "./feature/order/BuyForm.jsx";
import { BuyAdd } from "./feature/order/BuyAdd.jsx";
import { ContactAdd } from "./feature/contact/ContactAdd.jsx";
import { ContactList } from "./feature/contact/ContactList.jsx";
import { ContactDetail } from "./feature/contact/ContactDetail.jsx";
import { ContactModify } from "./feature/contact/ContactModify.jsx";
import { OrderList } from "./feature/order/OrderList.jsx";
import { OrderDetail } from "./feature/order/OrderDetail.jsx";
import { ReceiveForm } from "./feature/order/ReceiveForm.jsx";
import { ReceiveExec } from "./feature/order/ReceiveExec.jsx";
import { CancelForm } from "./feature/order/CancelForm.jsx";
import { CancelExec } from "./feature/order/CancelExec.jsx";
import { ReturnForm } from "./feature/order/ReturnForm.jsx";
import { ReturnAdd } from "./feature/order/ReturnAdd.jsx";
import { SaleList } from "./feature/sale/SaleList.jsx";
import { SaleDetail } from "./feature/sale/SaleDetail.jsx";
import { ProductAdd } from "./feature/product/ProductAdd.jsx";
import { SaleAdd } from "./feature/sale/SaleAdd.jsx";
import { ProductModify } from "./feature/product/ProductModify.jsx";
import { ContactDeleted } from "./feature/contact/ContactDeleted.jsx";
import { ContactDeletedDetail } from "./feature/contact/ContactDeletedDetail.jsx";
import { SaleModify } from "./feature/sale/SaleModify.jsx";
import { CategoryAdd } from "./feature/category/CategoryAdd.jsx";
import { CategoryModify } from "./feature/category/CategoryModify.jsx";
import { CategoryList } from "./feature/category/CategoryList.jsx";
import { DeliveryAdd } from "./feature/delivery/DeliveryAdd.jsx";
import { DeliveryDetail } from "./feature/delivery/DeliveryDetail.jsx";
import { DeliveryList } from "./feature/delivery/DeliveryList.jsx";
import { DeliveryModify } from "./feature/delivery/DeliveryModify.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 상단 공통 메뉴 */}
          <Route path="/" element={<MainLayout />}>
            {/* 사용자 메인 화면 */}
            <Route index element={<MainView />} />
            {/* 로그인 */}
            <Route path="login" element={<MemberLogin />} />
            {/* 로그아웃 */}
            <Route path="logout" element={<MemberLogout />} />
            {/* 회원가입 */}
            <Route path="signup" element={<MemberSignup />} />
            {/* 회원목록 */}
            <Route path="member/list" element={<MemberList />} />
            {/* 회원상세 */}
            <Route path="member" element={<MemberDetail />} />
            {/* 회원수정 */}
            <Route path="member/modify" element={<MemberModify />} />
            {/* 회원등록 */}
            <Route path="member/add" element={<MemberAdd />} />
            {/* 상품 등록 */}
            <Route path="product/add" element={<ProductAdd />} />
            {/* 상품조회 목록 */}
            <Route path="product/list" element={<ProductList />} />
            {/* 상품조회 상세 */}
            <Route path="product/detail/:seq" element={<ProductDetail />} />
            {/* 상품 수정 */}
            <Route path="product/modify/:seq" element={<ProductModify />} />
            {/* 판매상품 등록 */}
            <Route path="sale/add" element={<SaleAdd />} />
            {/* 판매상품조회 목록 */}
            <Route path="sale/list" element={<SaleList />} />
            {/* 판매상품조회 상세 */}
            <Route path="sale/detail/:seq" element={<SaleDetail />} />
            {/* 판매상품 수정 */}
            <Route path="sale/modify/:seq" element={<SaleModify />} />
            {/* 상품구매 상세 */}
            <Route path="buy" element={<BuyForm />} />
            {/* 상품구매 등록 */}
            <Route path="buy/add" element={<BuyAdd />} />
            {/* 반납신청 상세 */}
            <Route path="return" element={<ReturnForm />} />
            {/* 반납신청 등록 */}
            <Route path="return/add" element={<ReturnAdd />} />
            {/* 문의게시판 등록 */}
            <Route path="contact/add" element={<ContactAdd />} />
            {/* 문의게시판 목록 */}
            <Route path="contact/list" element={<ContactList />} />
            {/* 문의게시판 상세 */}
            <Route path="contact/detail/:seq" element={<ContactDetail />} />
            {/* 문의게시판 수정 */}
            <Route path="contact/modify/:seq" element={<ContactModify />} />
            {/* 문의게시판 삭제목록 */}
            <Route path="contact/deleted/list" element={<ContactDeleted />} />
            {/* 문의게시판 삭제 상세 */}
            <Route
              path="contact/deleted/detail/:seq"
              element={<ContactDeletedDetail />}
            />

            {/* 주문배송조회 목록 */}
            <Route path="order/list" element={<OrderList />} />
            {/* 주문배송조회 상세 */}
            <Route path="order/:orderId" element={<OrderDetail />} />
            {/* 상품수령 상세 */}
            <Route path="receive/:orderId" element={<ReceiveForm />} />
            {/* 상품수령 업데이트 */}
            <Route path="receive/exec" element={<ReceiveExec />} />
            {/* 상품취소 상세 */}
            <Route path="cancel/:orderId" element={<CancelForm />} />
            {/* 상품취소 업데이트 */}
            <Route path="cancel/exec" element={<CancelExec />} />
            {/* 카테고리 등록 */}
            <Route path="category/add" element={<CategoryAdd />} />
            {/* 카테고리 목록 */}
            <Route path="category/list" element={<CategoryList />} />
            {/* 카테고리 수정 */}
            <Route path="category/modify" element={<CategoryModify />} />
            {/* 배송업체 등록 */}
            <Route path="delivery/add" element={<DeliveryAdd />} />
            {/* 배송업체 목록 */}
            <Route path="delivery/list" element={<DeliveryList />} />
            {/* 배송업체 상세 */}
            <Route path="delivery/detail/:seq" element={<DeliveryDetail />} />
            {/* 배송업체 수정 */}
            <Route path="delivery/modify" element={<DeliveryModify />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
