import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./common/MainLayout.jsx";
import { MainView } from "./main/MainView.jsx";
import { MemberLogin } from "./feacture/member/MemberLogin.jsx";
import { MemberLogout } from "./feacture/member/MemberLogout.jsx";
import { MemberSignup } from "./feacture/member/MemberSignup.jsx";
import { MemberList } from "./feacture/member/MemberList.jsx";
import { MemberDetail } from "./feacture/member/MemberDetail.jsx";
import { MemberModify } from "./feacture/member/MemberModify.jsx";
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
            {/* 주문배송조회 목록 */}
            <Route path="order/list" element={<OrderList />} />
            {/* 주문배송조회 상세 */}
            <Route path="order/detail" element={<OrderDetail />} />
            {/* 상품수령 상세 */}
            <Route path="receive" element={<ReceiveForm />} />
            {/* 상품수령 업데이트 */}
            <Route path="receive/exec" element={<ReceiveExec />} />
            {/* 상품취소 상세 */}
            <Route path="cancel" element={<CancelForm />} />
            {/* 상품취소 업데이트 */}
            <Route path="cancel/exec" element={<CancelExec />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
