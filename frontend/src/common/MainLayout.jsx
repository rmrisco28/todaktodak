import { AppNavBar } from "./AppNavBar.jsx";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router";

export function MainLayout() {
  return (
    <div>
      <div className="mb-3">
        <AppNavBar />
      </div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
