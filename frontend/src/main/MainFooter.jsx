import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaGithub } from "react-icons/fa"; // GitHub 아이콘 임포트
import { Link } from "react-router-dom"; // react-router-dom의 Link 사용 권장

export function MainFooter() {
  return (
    <div className="border-top">
      <Container className="py-4">
        <Row className="align-items-center justify-content-lg-between">
          <Col lg={7} className="mb-4 mb-lg-0">
            <div className="copyright text-center text-sm text-muted text-lg-start">
              {/* 왼쪽: 저작권 및 프로젝트 정보 */}
              Copyright © {new Date().getFullYear()}&nbsp;
              <strong className="text-dark">토닥토닥</strong>
              . All rights reserved.
              <br />
              <span className="text-xs">
                본 사이트는 상업적 목적이 아닌 개인 포트폴리오용으로
                제작되었습니다.
              </span>
              <br />
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start mt-2">
                <span className="me-2">Project by</span>
                <a
                  href="https://github.com/kk250639"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted"
                >
                  <FaGithub size={18} /> 라건국 &nbsp;
                </a>
                <a
                  href="https://github.com/jihoon0213"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted"
                >
                  <FaGithub size={18} /> 박지훈 &nbsp;
                </a>
                <a
                  href="https://github.com/minki-jeon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted"
                >
                  <FaGithub size={18} /> 전민기
                </a>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            {/* 오른쪽: 주요 정책 및 링크 */}
            <Nav className="nav-footer justify-content-center justify-content-lg-end">
              <Nav.Item>
                {/* 내부 페이지 이동은 a 태그 대신 Link 컴포넌트 사용 */}
                <Link
                  to="https://github.com/minki-jeon/todak-todak"
                  target="_blank"
                  className="nav-link text-sm text-muted"
                >
                  프로젝트 소개
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="#/terms" className="nav-link text-sm text-muted">
                  이용약관
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="#/privacy" className="nav-link text-sm text-muted">
                  개인정보처리방침
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  to="#/contact/list"
                  className="nav-link text-sm pe-0 text-muted"
                >
                  고객센터
                </Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
