import { Link, NavLink } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";

export function AppNavBar() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* 사이트명 */}
          <Navbar.Brand to="/" as={Link}>
            토닥토닥
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Navbar 상단 우측 정렬 */}
            <Nav className="order-lg-3">
              <Nav.Link as={NavLink} to="/login">
                {/* 로그인 화면 */}
                로그인
              </Nav.Link>
              <Nav.Link as={NavLink} to="/order/list">
                {/* 주문배송조회 목록 */}
                주문내역
              </Nav.Link>
              <Nav.Link as={NavLink} to="/logout">
                로그아웃
              </Nav.Link>

              <Nav.Link as={NavLink} to="#">
                _회원명_
                {/* _회원명_ 드롭다운 메뉴 */}
                <Nav.Link as={NavLink} to="/member/detail">
                  {/* 회원상세 */}
                  마이페이지
                </Nav.Link>
                <Nav.Link as={NavLink} to="/member/order/list">
                  {/* 회원 주문내역 목록 */}
                  주문내역
                </Nav.Link>
                <Nav.Link as={NavLink} to="/member/rental/list">
                  {/* 회원 대여현황 목록 */}
                  대여현황
                </Nav.Link>
                <Nav.Link as={NavLink} to="#/want/list">
                  {/* 회원 관심상품 */}
                  관심상품
                </Nav.Link>
                <Nav.Link as={NavLink} to="#/cart/list">
                  {/* 회원 장바구니 */}
                  장바구니
                </Nav.Link>
              </Nav.Link>
              <Nav.Link as={NavLink} to="#">
                관리자
                {/* 관리자 드롭다운 메뉴 */}
                <Nav.Link as={NavLink} to="/admin">
                  {/* 관리자 메인화면 */}
                  대시보드
                </Nav.Link>
                <Nav.Link as={NavLink} to="/member/list">
                  {/* 회원관리 목록 */}
                  회원
                </Nav.Link>
                <Nav.Link as={NavLink} to="/product/list">
                  {/* 상품관리 목록 */}
                  상품
                </Nav.Link>
                <Nav.Link as={NavLink} to="/sale/list">
                  {/* 판매상품 목록 */}
                  판매상품
                </Nav.Link>
                <Nav.Link as={NavLink} to="/order/list">
                  {/* 주문관리 목록 */}
                  주문
                </Nav.Link>
                <Nav.Link as={NavLink} to="/rental/list">
                  {/* 대여관리 목록 */}
                  대여
                </Nav.Link>
                <Nav.Link as={NavLink} to="/receive/list">
                  {/* 반납관리 목록 */}
                  반납
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact/list">
                  {/* 문의게시판 목록 */}
                  문의
                </Nav.Link>
                <Nav.Link as={NavLink} to="/chart">
                  통계
                </Nav.Link>
                <Nav.Link as={NavLink} to="/category/list">
                  {/* 카테고리관리 목록 */}
                  카테고리
                </Nav.Link>
                <Nav.Link as={NavLink} to="/banner/list">
                  {/* 메인배너관리 목록 */}
                  배너
                </Nav.Link>
                <Nav.Link as={NavLink} to="/delivery/list">
                  {/* 배송업체 목록 */}
                  배송업체
                </Nav.Link>
              </Nav.Link>
            </Nav>

            {/* Navbar 하단 좌측 정렬 */}
            <Nav>
              <Nav.Link as={NavLink} to="/sale/list">
                {/* 판매상품조회 목록 */}
                상품
              </Nav.Link>
              <Nav.Link as={NavLink} to="/return">
                {/* 반납신청 상세 */}
                반납신청
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact/list">
                {/* 문의게시판 목록 */}
                문의
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
