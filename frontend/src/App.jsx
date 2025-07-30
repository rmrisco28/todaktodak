import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./common/MainLayout.jsx";
import { MainView } from "./main/MainView.jsx";
import { MemberLogin } from "./feacture/member/MemberLogin.jsx";
import { MemberLogout } from "./feacture/member/MemberLogout.jsx";
import { MemberSignup } from "./feacture/member/MemberSignup.jsx";
import { MemberList } from "./feacture/member/admin/MemberList.jsx";
import { MemberDetail } from "./feacture/member/admin/MemberDetail.jsx";
import { MemberModify } from "./feacture/member/admin/MemberModify.jsx";
import { MemberAdd } from "./feacture/member/admin/MemberAdd.jsx";
import { ProductList } from "./feacture/product/ProductList.jsx";
import { ProductDetail } from "./feacture/product/ProductDetail.jsx";
import { BuyForm } from "./feacture/order/BuyForm.jsx";
import { BuyAdd } from "./feacture/order/BuyAdd.jsx";
import { ContactAdd } from "./feacture/contact/ContactAdd.jsx";
import { ContactList } from "./feacture/contact/ContactList.jsx";
import { ContactDetail } from "./feacture/contact/ContactDetail.jsx";
import { ContactModify } from "./feacture/contact/ContactModify.jsx";
import { OrderList } from "./feacture/order/OrderList.jsx";
import { OrderDetail } from "./feacture/order/OrderDetail.jsx";
import { ReceiveForm } from "./feacture/order/ReceiveForm.jsx";
import { ReceiveExec } from "./feacture/order/ReceiveExec.jsx";
import { CancelForm } from "./feacture/order/CancelForm.jsx";
import { CancelExec } from "./feacture/order/CancelExec.jsx";
import { ReturnForm } from "./feacture/order/ReturnForm.jsx";
import { ReturnAdd } from "./feacture/order/ReturnAdd.jsx";
import { SaleList } from "./feacture/sale/SaleList.jsx";
import { SaleDetail } from "./feacture/sale/SaleDetail.jsx";
import { ProductAdd } from "./feacture/product/ProductAdd.jsx";
import { SaleAdd } from "./feacture/sale/SaleAdd.jsx";
import { ProductModify } from "./feacture/product/ProductModify.jsx";
import { ContactDeleted } from "./feacture/contact/ContactDeleted.jsx";
import { ContactDeletedDetail } from "./feacture/contact/ContactDeletedDetail.jsx";
import { SaleModify } from "./feacture/sale/SaleModify.jsx";
import { CategoryAdd } from "./feacture/category/CategoryAdd.jsx";
import { CategoryModify } from "./feacture/category/CategoryModify.jsx";
import { CategoryList } from "./feacture/category/CategoryList.jsx";
import { DeliveryAdd } from "./feacture/delivery/DeliveryAdd.jsx";
import { DeliveryDetail } from "./feacture/delivery/DeliveryDetail.jsx";
import { DeliveryList } from "./feacture/delivery/DeliveryList.jsx";
import { DeliveryModify } from "./feacture/delivery/DeliveryModify.jsx";

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
            {/* 카테고리 등록 */}
            <Route path="delivery/add" element={<DeliveryAdd />} />
            {/* 카테고리 목록 */}
            <Route path="delivery/list" element={<DeliveryList />} />
            {/* 카테고리 상세 */}
            <Route path="delivery/detail/:seq" element={<DeliveryDetail />} />
            {/* 카테고리 수정 */}
            <Route path="delivery/modify" element={<DeliveryModify />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
