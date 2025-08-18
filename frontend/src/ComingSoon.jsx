import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/coming_soon.css"; // 아래에서 생성할 CSS 파일을 임포트합니다.

// 페이지의 핵심이 되는 귀여운 SVG 아이콘입니다.
const UnderConstructionIcon = () => (
  <svg
    className="coming-soon-svg"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow
          dx="1"
          dy="2"
          stdDeviation="1"
          floodColor="#000000"
          floodOpacity="0.15"
        />
      </filter>
    </defs>
    {/* Teddy Bear Body */}
    <circle cx="50" cy="60" r="25" fill="#E0BBAA" filter="url(#shadow)" />
    <circle cx="50" cy="65" r="18" fill="#F5DBCB" />

    {/* Ears */}
    <circle cx="33" cy="40" r="8" fill="#C4A38F" />
    <circle cx="67" cy="40" r="8" fill="#C4A38F" />
    <circle cx="33" cy="40" r="5" fill="#E0BBAA" />
    <circle cx="67" cy="40" r="5" fill="#E0BBAA" />

    {/* Face */}
    <circle cx="45" cy="58" r="1.5" fill="#5C3D2E" />
    <circle cx="55" cy="58" r="1.5" fill="#5C3D2E" />
    <path
      d="M 48 65 Q 50 68 52 65"
      stroke="#5C3D2E"
      strokeWidth="0.8"
      fill="none"
      strokeLinecap="round"
    />

    {/* Construction Hat */}
    <path
      d="M 35 35 Q 50 20 65 35 L 68 38 L 32 38 Z"
      fill="#FFD700"
      filter="url(#shadow)"
    />
    <rect x="30" y="38" width="40" height="4" fill="#FFD700" rx="2" />
  </svg>
);

export function ComingSoon() {
  const navigate = useNavigate();

  return (
    <Container className="coming-soon-container">
      <Row>
        <Col className="text-center">
          <UnderConstructionIcon />
          <h1 className="coming-soon-title">페이지 준비중입니다</h1>
          <p className="coming-soon-text">
            더 나은 서비스를 제공하기 위해 열심히 준비하고 있어요.
            <br />
            조금만 기다려주시면 멋진 모습으로 찾아올게요!
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/")}
            className="coming-soon-button"
          >
            홈으로 돌아가기
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
