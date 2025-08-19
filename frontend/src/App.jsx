import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/astro-ecommerce.scss";

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
import { DeliveryList } from "./feature/delivery/DeliveryList.jsx";
import { DeliveryModify } from "./feature/delivery/DeliveryModify.jsx";
import { MemberMyInfo } from "./feature/member/MemberMyInfo.jsx";
import { MemberMyInfoModify } from "./feature/member/MemberMyInfoModify.jsx";

import { AuthenticationContextProvider } from "./common/AuthenticationContextProvider.jsx";
import { ResetPassword } from "./feature/member/ResetPassword.jsx";
import { PasswordEmailAuth } from "./feature/member/PasswordEmailAuth.jsx";
import { RentalList } from "./feature/rental/RentalList.jsx";
import { BannerAdd } from "./feature/banner/BannerAdd.jsx";
import { BannerList } from "./feature/banner/BannerList.jsx";
import { BannerModify } from "./feature/banner/BannerModify.jsx";
import { OrderAdminList } from "./feature/order/admin/OrderAdminList.jsx";
import { RentalRenew } from "./feature/rental/RentalRenew.jsx";
import { RentalReturn } from "./feature/rental/RentalReturn.jsx";
import { RentalListAdmin } from "./feature/rental/RentalListAdmin.jsx";
import { FullWidthLayout } from "./common/FullWidthLayout.jsx";
import { ProtectedRoute } from "./common/ProtectedRoute.jsx";
import { ComingSoon } from "./ComingSoon.jsx";
import { MemberWithdrawPage } from "./feature/member/MemberWithdrawPage.jsx";
import { PasswordCheck } from "./feature/member/PasswordCheck.jsx";
import { TrackingDetail } from "./feature/delivery/TrackingDetail.jsx";
import { PaymentSuccess } from "./feature/order/PaymentSuccess.jsx";
import { PaymentFail } from "./feature/order/PaymentFail.jsx";

function App() {
  return (
    <AuthenticationContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Route 분리 (배너 영역 Container 제거) */}
          <Route element={<FullWidthLayout />}>
            {/* 사용자 메인 화면 (배너 + 카테고리메뉴 + 상품목록 */}
            <Route index element={<MainView />} />
          </Route>
          {/* 상단 공통 메뉴 */}
          <Route path="/" element={<MainLayout />}>
            {/*
            --- 비로그인 사용자도 접근 가능한 페이지 ---
          */}
            {/* 준비중 */}
            <Route path="comingsoon" element={<ComingSoon />} />

            {/* 로그인 */}
            <Route path="login" element={<MemberLogin />} />
            {/* 로그아웃 */}
            <Route path="logout" element={<MemberLogout />} />
            {/* 회원가입 */}
            <Route path="signup" element={<MemberSignup />} />
            {/* 비밀번호 찾기-이메일인증 */}
            <Route
              path="member/password/email_auth"
              element={<PasswordEmailAuth />}
            />
            {/* 비밀번호 재설정*/}
            <Route path="member/resetPassword" element={<ResetPassword />} />
            {/* 판매상품조회 목록 */}
            <Route path="sale/list" element={<SaleList />} />
            {/* 판매상품조회 상세 */}
            <Route path="sale/detail/:seq" element={<SaleDetail />} />
            {/* 문의게시판 목록 */}
            <Route path="contact/list" element={<ContactList />} />

            {/* 회원탈퇴 */}
            <Route path="member/withdraw" element={<MemberWithdrawPage />} />
            {/*
            --- 로그인 사용자만 접근 가능한 페이지 ---
          */}
            <Route element={<ProtectedRoute />}>
              {/* 배송조회 TEST */}
              <Route path="testTracking" element={<TrackingDetail />} />
              {/* 카카오페이 API */}
              <Route path="payment/success" element={<PaymentSuccess />} />
              <Route path="payment/fail" element={<PaymentFail />} />
              <Route path="payment/cancel" element={<ComingSoon />} />

              {/* 회원목록(관리자) */}
              <Route path="member/list" element={<MemberList />} />
              {/* 회원상세(관리자) */}
              <Route path="member" element={<MemberDetail />} />
              {/* 회원수정(관리자) */}
              <Route path="member/modify" element={<MemberModify />} />
              {/* 회원등록(관리자) */}
              <Route path="member/add" element={<MemberAdd />} />
              {/* 회원상세(회원) */}
              <Route path="member/myinfo" element={<MemberMyInfo />} />
              {/* 회원정보변경(회원) */}
              <Route
                path="member/myinfo/modify"
                element={<MemberMyInfoModify />}
              />
              {/* 변경 전 비밀번호 확인*/}
              <Route path="member/passwordCheck" element={<PasswordCheck />} />

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
              {/* 판매상품 수정 */}
              <Route path="sale/modify/:seq" element={<SaleModify />} />

              {/* 판매상품구매 상세 */}
              <Route path="buy/:seq" element={<BuyForm />} />
              {/* 판매상품구매 등록 */}
              <Route path="buy/add" element={<BuyAdd />} />

              {/* 반납신청 상세 */}
              <Route path="return" element={<ReturnForm />} />
              {/* 반납신청 등록 */}
              <Route path="return/add" element={<ReturnAdd />} />

              {/* 문의게시판 등록 */}
              <Route path="contact/add" element={<ContactAdd />} />
              {/* 문의게시판 관리자 목록 */}
              <Route path="contact/list/isAdmin" element={<ContactList />} />
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
              <Route path="order/:seq" element={<OrderDetail />} />
              {/* 주문배송조회 목록 (관리자) */}
              <Route path="order/admin/list" element={<OrderAdminList />} />

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
              <Route path="category/modify/:seq" element={<CategoryModify />} />

              {/* 배송업체 등록 */}
              <Route path="delivery/add" element={<DeliveryAdd />} />
              {/* 배송업체 목록 */}
              <Route path="delivery/list" element={<DeliveryList />} />
              {/* 배송업체 수정 */}
              <Route path="delivery/modify/:seq" element={<DeliveryModify />} />

              {/* 대여 현황 */}
              <Route path="rental/list" element={<RentalList />} />
              {/* 대여 연장 */}
              <Route path="rental/renew/:seq" element={<RentalRenew />} />
              {/* 대여 반납 */}
              <Route path="rental/return/:seq" element={<RentalReturn />} />
              {/* 대여 관리자 */}
              <Route path="rental/list/admin" element={<RentalListAdmin />} />

              {/* 메인 배너 이미지 등록  */}
              <Route path="banner/add" element={<BannerAdd />} />
              {/* 메인 배너 이미지 목록 */}
              <Route path="banner/list" element={<BannerList />} />
              {/* 메인 배너 이미지 수정 */}
              <Route path="banner/modify/:seq" element={<BannerModify />} />

              {/* 관심상품 */}
              <Route path="want/list" element={<ComingSoon />} />

              {/* 장바구니 */}
              <Route path="cart/list" element={<ComingSoon />} />

              {/* 관리자 대시보드 */}
              <Route path="admin" element={<ComingSoon />} />

              {/* 관리자 통계현황 */}
              <Route path="chart/list" element={<ComingSoon />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthenticationContextProvider>
  );
}

export default App;
