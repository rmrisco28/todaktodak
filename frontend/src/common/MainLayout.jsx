import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import { ComplexNavbar } from "./ComplexNavbar.jsx";
import { AppNavBar } from "./AppNavBar.jsx";

export function MainLayout() {
  return (
    <div>
      <div className="mb-3">
        {/*<AppNavBar />*/}
        <ComplexNavbar />
      </div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
