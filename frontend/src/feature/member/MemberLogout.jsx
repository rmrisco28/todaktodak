import { Spinner } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";
import { toast } from "react-toastify";

export function MemberLogout() {
  // step2. Use the context (토큰 인증 context 호출)
  const { logout } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();

    toast("로그아웃 되었습니다.", { type: "success" });
    navigate("/login");
  }, []);

  return <Spinner />;
}
