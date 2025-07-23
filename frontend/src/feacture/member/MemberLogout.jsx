import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function MemberLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return <Spinner />;
}
