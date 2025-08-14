import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  InputGroup,
  Form,
  Image,
} from "react-bootstrap";
import { IoSettingsSharp, IoNotifications, IoSearch } from "react-icons/io5"; // Ionicons 5
import { FaClock } from "react-icons/fa"; // Font Awesome
import { BsChevronDown } from "react-icons/bs"; // Bootstrap Icons

import "../css/navbar.css";
import { AuthenticationContext } from "./AuthenticationContextProvider.jsx";
import { Link, useNavigate, useSearchParams } from "react-router";

export function UnifiedNavbar() {
  // 로그인 상태 / 권한
  const { user, isAdmin } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  // 드롭다운 메뉴들의 열림 상태 관리
  const [openDropdowns, setOpenDropdowns] = useState({});
  // 모바일 햄버거 메뉴의 열림 상태 관리
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 드롭다운 토글 시 상태 업데이트 함수
  const handleToggle = (dropdownId, isOpen) => {
    setOpenDropdowns((prev) => ({ ...prev, [dropdownId]: isOpen }));
  };

  // 드롭다운 제목과 회전 아이콘을 생성하는 함수
  const getDropdownTitle = (title, dropdownId) => (
    <>
      {title}
      <BsChevronDown
        className={`ms-2 dropdown-toggle-icon ${
          openDropdowns[dropdownId] ? "rotate-180" : ""
        }`}
      />
    </>
  );

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setKeyword(q);
  }, []);

  function handleSearchFormSubmit(e) {
    if (keyword.trim() !== "") {
      e.preventDefault();
      navigate("/sale/list?q=" + keyword);
    }
  }

  return (
    <Navbar
      expand="lg" // lg 사이즈 이상에서 메뉴가 펼쳐지도록 설정 (반응형의 핵심)
      className="sticky-top navbar-translucent blur shadow-sm"
      expanded={isMobileMenuOpen}
      onToggle={(expanded) => setMobileMenuOpen(expanded)}
      style={{ zIndex: 1030 }} // z-index 통일
    >
      <Container fluid className="px-3">
        {/* 1. 브랜드 로고 */}
        <Navbar.Brand href="/" className="text-dark font-weight-bold me-4">
          토닥토닥
        </Navbar.Brand>

        {/* 2. 모바일용 햄버거 토글 버튼 */}
        <Navbar.Toggle
          aria-controls="unified-navbar-nav"
          className={isMobileMenuOpen ? "toggled" : ""}
        >
          {/* 아이콘이 보이도록 span 태그들을 유지하는 것이 중요합니다. */}
          <span className="navbar-toggler-icon">
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </span>
        </Navbar.Toggle>

        {/* 3. 네비게이션 메뉴 (데스크탑: 수평, 모바일: 수직) */}
        <Navbar.Collapse id="unified-navbar-nav">
          {/* 주요 메뉴 (상품, 반납신청, 문의) */}
          <Nav className="me-auto">
            <Nav.Link href="/sale/list" className="py-2 px-3">
              상품
            </Nav.Link>

            <Nav.Link as={Link} to="/rental/list" className="py-2 px-3">
              대여 현황
            </Nav.Link>

            <Nav.Link href="/contact/list" className="py-2 px-3">
              문의
            </Nav.Link>
          </Nav>

          {/* 검색창 (데스크탑에서는 중앙, 모바일에서는 메뉴 하단) */}
          <div className="d-flex align-items-center my-2 my-lg-0 mx-lg-auto">
            <Form onSubmit={handleSearchFormSubmit}>
              <InputGroup>
                <InputGroup.Text type="submit">
                  <IoSearch className="opacity-8" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="상품 검색"
                  className="max-width-200"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </InputGroup>
            </Form>
          </div>

          {/* 사용자/관리자 메뉴 (오른쪽 정렬) */}
          <Nav className="align-items-lg-center">
            {user === null && (
              <Nav.Link href="/login" className="py-2 px-3">
                로그인/회원가입
              </Nav.Link>
            )}
            <Nav.Link href="/order/list" className="py-2 px-3">
              주문내역
            </Nav.Link>
            {user !== null && (
              <Nav.Link href="/logout" className="py-2 px-3">
                로그아웃
              </Nav.Link>
            )}

            <NavDropdown
              title={getDropdownTitle("mypage", "member-menu")}
              id="member-dropdown"
              align={{ lg: "end" }} // 데스크탑에서 오른쪽 정렬
              className="py-2 px-lg-2"
              onToggle={(isOpen) => handleToggle("member-menu", isOpen)}
            >
              <NavDropdown.Item href="/member/myinfo">내 정보</NavDropdown.Item>
              <NavDropdown.Item href="/order/list">주문내역</NavDropdown.Item>
              <NavDropdown.Item href="/rental/list">대여현황</NavDropdown.Item>
              <NavDropdown.Item href="/want/list">관심상품</NavDropdown.Item>
              <NavDropdown.Item href="/cart/list">장바구니</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={getDropdownTitle("관리자", "admin-menu")}
              id="admin-dropdown"
              align={{ lg: "end" }}
              className="py-2 px-lg-2"
              onToggle={(isOpen) => handleToggle("admin-menu", isOpen)}
            >
              <NavDropdown.Item href="/admin">대시보드</NavDropdown.Item>
              <NavDropdown.Item href="/member/list">회원관리</NavDropdown.Item>
              <NavDropdown.Item href="/product/list">상품관리</NavDropdown.Item>
              <NavDropdown.Item href="/sale/list">판매상품</NavDropdown.Item>
              <NavDropdown.Item href="/order/admin/list">
                주문관리
              </NavDropdown.Item>
              <NavDropdown.Item href="/rental/list/admin">
                대여관리
              </NavDropdown.Item>
              <NavDropdown.Item href="/contact/list">문의관리</NavDropdown.Item>
              <NavDropdown.Item href="/chart/list">통계현황</NavDropdown.Item>
              <NavDropdown.Item href="/category/list">
                카테고리
              </NavDropdown.Item>
              <NavDropdown.Item href="/banner/list">배너관리</NavDropdown.Item>
              <NavDropdown.Item href="/delivery/list">
                배송업체
              </NavDropdown.Item>
            </NavDropdown>
            {/*
            <Nav.Link href="#settings" className="py-2 px-3">
              <IoSettingsSharp size={16} />
            </Nav.Link>

            <NavDropdown
              title={<IoNotifications size={16} />}
              id="notification-dropdown"
              align={{ lg: "end" }}
              className="py-2 px-lg-2"
            >
            */}
            {/* 알림 드롭다운 내용 ... */}
            {/*
            </NavDropdown>

            <Nav.Link href="#profile" className="py-2 ps-2">
              <div className="avatar avatar-sm position-relative">
                <Image
                  src={`/vite.svg`} // public 폴더의 내용은 / 부터 시작
                  alt="profile_image"
                  className="w-100 border-radius-md"
                />
              </div>
            </Nav.Link>
            */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
