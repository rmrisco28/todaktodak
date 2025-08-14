// ProtectedRoute.jsx (새 파일)

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthenticationContext } from "./AuthenticationContextProvider";
import { Spinner } from "react-bootstrap";
import { Outlet } from "react-router";

export function ProtectedRoute({ children }) {
  const { user, isAuthChecked } = useContext(AuthenticationContext);
  const location = useLocation();

  // 1. 최초 인증 확인이 아직 진행 중이면 로딩 스피너를 보여줍니다.
  if (!isAuthChecked) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  // 2. 인증 확인이 끝났는데 user 정보가 없으면 로그인 페이지로 보냅니다.
  if (!user) {
    // 사용자가 원래 가려던 경로를 state에 담아서 전달합니다.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. user 정보가 있으면 요청한 페이지(children)를 보여줍니다. // Outlet을 통해 자식 라우트들을 렌더링
  return <Outlet />;
}
