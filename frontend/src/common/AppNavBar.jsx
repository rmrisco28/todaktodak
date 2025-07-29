import { Link, NavLink, Route } from "react-router";
import { Container, Nav, Navbar } from "react-bootstrap";
import { CancelExec } from "../feacture/order/CancelExec.jsx";

export function AppNavBar() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            토닥토닥
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link as={NavLink} to="/">
                HOME
              </Nav.Link>
              <Nav.Link as={NavLink} to="/sale/list">
                {/* 판매상품조회 목록 */}
                판매상품조회
              </Nav.Link>
              <Nav.Link as={NavLink} to="/return">
                {/* 반납신청 상세 */}
                반납신청
              </Nav.Link>
              <Nav.Link as={NavLink} to="/order/list">
                {/* 주문배송조회 목록 */}
                주문배송조회
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact/list">
                {/* 문의게시판 목록 */}
                문의게시판
              </Nav.Link>
            </Nav>

            <Nav className="order-lg-3">
              <Nav.Link as={NavLink} to="/signup">
                가입
              </Nav.Link>
              <Nav.Link as={NavLink} to="/member/list">
                회원목록
              </Nav.Link>
              <Nav.Link as={NavLink} to="/login">
                로그인
              </Nav.Link>
              <Nav.Link as={NavLink} to="/logout">
                로그아웃
              </Nav.Link>
              {/*  결제화면 추후 삭제 필수!!!! 이동하기 편하게 적어놓은 것*/}
              <Nav.Link as={NavLink} to="/buy">
                결제화면(임시)
              </Nav.Link>
              {/*  관리자 게시판 목록 추후 삭제 필수!!!! 이동하기 편하게 적어놓은 것*/}
              <Nav.Link as={NavLink} to="/contact/deleted/list">
                관리자/ 문의게시판 삭제 임시 생성/ 추후 삭제
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
