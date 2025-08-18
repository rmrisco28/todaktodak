import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// 만료된 JWT 토큰 삭제 (유효성 확인 후)
const token = localStorage.getItem("token");
if (token) {
  const decoded = jwtDecode(token);
  const exp = decoded.exp;
  if (exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  }
}

// Axios Interceptor
// Axios 요청 시 자동으로 Authorization 헤더에 Bearer 토큰 추가 (토큰 유무 확인)
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// step1. create context (토큰 인증 Context)
const AuthenticationContext = createContext(null);

export function AuthenticationContextProvider({ children }) {
  // 토큰 사용자 정보 : member_id + name + scope
  // login + logout
  // hasAccess
  // isAdmin
  const [user, setUser] = useState(null);
  // [추가] 최초 인증 상태 확인이 완료되었는지 추적하는 상태
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // 최초 로딩 시 토큰이 존재하면 사용자 정보 요청(get / jwt decode)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = jwtDecode(token);
      // 토큰 정보의 memberId를 추출하여 회원정보 요청,
      axios
        .get("/api/member?memberId=" + payload.sub)
        .then((res) => {
          setUser({
            memberId: res.data.memberId,
            name: res.data.name,
            scope: payload.scp.split(","), // 토큰 scope (ex: ROLE_USER, ROLE_ADMIN)
          });
        })
        .finally(() => {
          // [추가] API 요청 성공/실패 여부와 관계없이 확인 작업이 끝났음을 표시
          setIsAuthChecked(true);
        });
    } else {
      // [추가] 토큰이 없는 경우에도 확인 작업이 끝났음을 바로 표시
      setIsAuthChecked(true);
    }
  }, []);

  // 로그인 시 호출되는 함수
  // - 토큰 저장(Browser Local Storage)
  // - 토큰의 사용자 정보를 상태값(user)에 저장
  function login(token) {
    localStorage.setItem("token", token);

    const payload = jwtDecode(token);
    // [수정] axios Promise를 반환하도록 return 추가
    return axios.get("/api/member?memberId=" + payload.sub).then((res) => {
      setUser({
        memberId: res.data.memberId,
        name: res.data.name,
        scope: payload.scp.split(","),
      });
    });
  }

  // 로그아웃: 토큰 삭제, 상태값(user) 초기화
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  // 현재 로그인한 사용자가 특정 memberId에 접근 권한이 있는지 확인 (ex. 본인 작성 게시글)
  function hasAccess(memberId) {
    return user && user.memberId === memberId;
  }

  // 현재 사용자가 관리자 권한을 갖고 있는지 확인
  function isAdmin() {
    return user && user.scope && user.scope.includes("ROLE_ADMIN");
  }

  // step3. provide context (token Context 값 전달)
  return (
    <AuthenticationContext
      value={{
        user: user,
        login: login,
        logout: logout,
        hasAccess: hasAccess,
        isAdmin: isAdmin,
        isAuthChecked: isAuthChecked, // [추가] isAuthChecked 값을 context를 통해 전달
      }}
    >
      {children}
    </AuthenticationContext>
  );
}

export { AuthenticationContext };
