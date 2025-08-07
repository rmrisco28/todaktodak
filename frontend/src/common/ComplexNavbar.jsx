import React, { useState } from "react";

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  InputGroup,
  Form,
  Image,
} from "react-bootstrap";

import { IoSettingsSharp, IoNotifications, IoSearch } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import "../css/navbar.css";

export function ComplexNavbar() {
  // 여러 드롭다운의 열림 상태를 관리하기 위한 state
  const [openDropdowns, setOpenDropdowns] = useState({});

  // 모바일 메뉴(햄버거) 열림/닫힘 상태 추가
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 드롭다운이 토글될 때 호출되는 함수
  const handleToggle = (dropdownId, isOpen) => {
    setOpenDropdowns((prev) => ({ ...prev, [dropdownId]: isOpen }));
  };

  // 각 드롭다운의 제목을 동적으로 생성하는 함수
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

  return (
    <div
    // className="position-fixed "
    // expand="lg"
    // className="top-0 d-none d-lg-block shadow-sm py-0 sticky-top navbar-translucent blur"
    // style={{ zIndex: 1032 }} // 하단 Navbar보다 높은 z-index 부여
    >
      {/**************************************************
       데스크탑용 Navbar (d-none d-lg-block)
       - navbar 2단 구조
       ***************************************************/}
      {/* 상단 네비게이션 */}
      <Navbar
        expand="lg"
        className="top-0 d-none d-lg-block shadow-sm py-0 sticky-top navbar-translucent blur"
        style={{ zIndex: 1031 }} // 하단 Navbar보다 높은 z-index 부여
      >
        <Container fluid className="py-2">
          <Navbar.Brand
            href="/"
            className="text-dark text-lg font-weight-bold me-10"
          >
            토닥토닥
          </Navbar.Brand>
          <Nav className="ms-auto justify-content-end align-items-center">
            <Nav.Link href="/login" className="px-3">
              로그인
            </Nav.Link>
            <Nav.Link href="/order/list" className="px-3">
              주문내역
            </Nav.Link>
            <Nav.Link href="/logout" className="px-3">
              로그아웃
            </Nav.Link>

            <NavDropdown
              title={getDropdownTitle("_회원명_", "member-desktop")}
              id="member-dropdown-desktop"
              align="end"
              className="px-2"
              onToggle={(isOpen) => handleToggle("member-desktop", isOpen)}
            >
              <NavDropdown.Item href="/member/detail" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    내 정보
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/order/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    주문내역
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/rental/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    대여현황
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/want/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    관심상품
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/cart/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    장바구니
                  </h6>
                </div>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={getDropdownTitle("관리자", "admin-desktop")}
              id="admin-dropdown-desktop"
              align="end"
              className="px-2"
              onToggle={(isOpen) => handleToggle("admin-desktop", isOpen)}
            >
              <NavDropdown.Item href="/admin" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    대시보드
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/member/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    회원관리
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/product/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    상품관리
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/sale/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    판매상품
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/order/admin/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    주문관리
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/retal/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    대여관리
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/receive/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    반납관리
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/contact/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    문의관리
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/chart" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    통계현황
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/category/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    카테고리
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/banner/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    배너관리
                  </h6>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="/delivery/list" className="mb-2">
                <div className="d-flex py-1 flex-column justify-content-center">
                  <h6 className="text-sm font-weight-normal mb-1 font-weight-bold">
                    배송업체
                  </h6>
                </div>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#settings" className="px-3">
              <IoSettingsSharp size={16} />
            </Nav.Link>

            <NavDropdown
              title={<IoNotifications size={16} />}
              id="notification-dropdown-desktop"
              align="end"
              className="px-2"
            >
              <NavDropdown.Item href="#action/3.1" className="mb-2">
                <div className="d-flex py-1">
                  <Image
                    src={`/public/vite.svg`}
                    className="avatar avatar-sm me-3"
                    alt="user image"
                  />
                  <div className="d-flex flex-column justify-content-center">
                    <h6 className="text-sm font-weight-normal mb-1">
                      <span className="font-weight-bold">New message</span>
                      from Laur
                    </h6>
                    <p className="text-xs text-secondary mb-0">
                      <FaClock className="me-1" />
                      13 minutes ago
                    </p>
                  </div>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className="mb-2">
                <div className="d-flex py-1">
                  <div className="my-auto">
                    <Image
                      src={`/public/vite.svg`}
                      className="avatar avatar-sm bg-gradient-dark me-3"
                      alt="logo spotify"
                    />
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <h6 className="text-sm font-weight-normal mb-1">
                      <span className="font-weight-bold">New album</span>
                      by Travis Scott
                    </h6>
                    <p className="text-xs text-secondary mb-0">
                      <FaClock className="me-1" />1 day
                    </p>
                  </div>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                <div className="d-flex py-1">
                  <div className="avatar avatar-sm bg-gradient-secondary me-3 my-auto">
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 43 36"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>credit-card</title>
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          transform="translate(-2169.000000, -745.000000)"
                          fill="#FFFFFF"
                          fillRule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(453.000000, 454.000000)">
                              <path
                                d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                opacity="0.593633743"
                              ></path>
                              <path d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="d-flex flex-column justify-content-center">
                    <h6 className="text-sm font-weight-normal mb-1">
                      Payment successfully completed
                    </h6>
                    <p className="text-xs text-secondary mb-0">
                      <FaClock className="me-1" />2 days
                    </p>
                  </div>
                </div>
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#profile" className="ps-2">
              <div className="avatar avatar-sm position-relative">
                <Image
                  src={`/public/vite.svg`}
                  alt="profile_image"
                  className="w-100 border-radius-md"
                />
              </div>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/*<hr className="horizontal dark my-0 w-100 d-none d-lg-block" />*/}

      {/* 하단 네비게이션 (Mega Menu 포함) */}
      <Navbar
        expand="lg"
        className="d-none d-lg-block pt-3 pb-3 sticky-top navbar-translucent-bottom"
        style={{ zIndex: 1030 }} // 상단 Navbar보다 낮은 z-index 부여
      >
        <Container>
          <Nav>
            <Nav.Link href="/sale/list" className="px-3">
              상품
            </Nav.Link>
            <Nav.Link href="/return" className="px-3">
              반납신청
            </Nav.Link>
            <Nav.Link href="/contact/list" className="px-3">
              문의
            </Nav.Link>
          </Nav>

          <div className="ms-md-auto d-flex align-items-center">
            <InputGroup>
              <InputGroup.Text>
                <IoSearch className="opacity-8" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search"
                className="max-width-200"
              />
            </InputGroup>
          </div>
        </Container>
      </Navbar>

      {/**************************************************
       모바일용 Navbar (d-lg-none)
       - 햄버거 아이콘 메뉴
       ***************************************************/}
      <Navbar
        expand="lg"
        className="top-0 z-index-3 shadow start-0 end-0 d-lg-none sticky-top navbar-translucent blur"
        expanded={isMobileMenuOpen} // Navbar의 열림 상태를 state와 동기화
        onToggle={(expanded) => setMobileMenuOpen(expanded)} // 토글 시 state 변경
      >
        <Container className="px-1">
          <Navbar.Brand href="/" className="font-weight-bolder ms-lg-0">
            토닥토닥
          </Navbar.Brand>

          <div className="ms-md-auto d-flex align-items-center">
            <InputGroup>
              <InputGroup.Text>
                <IoSearch className="opacity-8" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search"
                className="max-width-200"
              />
            </InputGroup>
          </div>

          {/* [수정] 햄버거 아이콘 X자 변환을 위해 className 동적 적용 */}
          <Navbar.Toggle
            aria-controls="mobile-navigation"
            className={isMobileMenuOpen ? "toggled" : ""}
          >
            <span className="navbar-toggler-icon mt-2">
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </span>
          </Navbar.Toggle>

          <Navbar.Collapse id="mobile-navigation">
            <Nav className="ms-auto">
              <Nav.Link
                href="/sale/list"
                className="text-dark font-weight-bold"
              >
                상품
              </Nav.Link>
              <Nav.Link href="/return" className="text-dark font-weight-bold">
                반납신청
              </Nav.Link>
              <Nav.Link
                href="/contact/list"
                className="text-dark font-weight-bold"
              >
                문의
              </Nav.Link>

              <hr className="horizontal dark my-0 w-100 d-block" />

              <Nav.Link href="/login" className="text-dark font-weight-bold">
                로그인
              </Nav.Link>
              <Nav.Link
                href="/order/list"
                className="text-dark font-weight-bold"
              >
                주문내역
              </Nav.Link>
              <Nav.Link href="/logout" className="text-dark font-weight-bold">
                로그아웃
              </Nav.Link>

              <NavDropdown
                title={getDropdownTitle("_회원명_", "member-mobile")}
                id="member-dropdown-mobile"
                onToggle={(isOpen) => handleToggle("member-mobile", isOpen)}
              >
                <NavDropdown.Item href="/member/detail">
                  내 정보
                </NavDropdown.Item>
                <NavDropdown.Item href="/order/list">주문내역</NavDropdown.Item>
                <NavDropdown.Item href="/retal/list">대여현황</NavDropdown.Item>
                <NavDropdown.Item href="/want/list">관심상품</NavDropdown.Item>
                <NavDropdown.Item href="/cart/list">장바구니</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={getDropdownTitle("관리자", "admin-mobile")}
                id="admin-dropdown-mobile"
                onToggle={(isOpen) => handleToggle("admin-mobile", isOpen)}
              >
                <NavDropdown.Item href="/admin">대시보드</NavDropdown.Item>
                <NavDropdown.Item href="/member/list">
                  회원관리
                </NavDropdown.Item>
                <NavDropdown.Item href="/product/list">
                  상품관리
                </NavDropdown.Item>
                <NavDropdown.Item href="/sale/list">판매상품</NavDropdown.Item>
                <NavDropdown.Item href="/order/admin/list">
                  주문관리
                </NavDropdown.Item>
                <NavDropdown.Item href="/retal/list">대여관리</NavDropdown.Item>
                <NavDropdown.Item href="/receive/list">
                  반납관리
                </NavDropdown.Item>
                <NavDropdown.Item href="/contact/list">
                  문의관리
                </NavDropdown.Item>
                <NavDropdown.Item href="/chart">통계현황</NavDropdown.Item>
                <NavDropdown.Item href="/category/list">
                  카테고리
                </NavDropdown.Item>
                <NavDropdown.Item href="/banner/list">
                  배너관리
                </NavDropdown.Item>
                <NavDropdown.Item href="/delivery/list">
                  배송업체
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
