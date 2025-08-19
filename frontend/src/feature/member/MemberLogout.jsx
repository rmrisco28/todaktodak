import { Spinner } from "react-bootstrap";
import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

export function MemberLogout() {
  // step2. Use the context (토큰 인증 context 호출)
  const { logout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const toastShownRef = useRef();

  useEffect(() => {
    if (toastShownRef.current) {
      return;
    }
    toastShownRef.current = true;

    alert("로그아웃 되었습니다.");
    logout();

    navigate("/");
  }, []);

  return <Spinner />;
}
