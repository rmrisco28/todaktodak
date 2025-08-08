import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import { UnifiedNavbar } from "./UnifiedNavbar.jsx";
import { ComplexNavbar } from "./ComplexNavbar.jsx";

export function MainLayout() {
  return (
    <div>
      <div className="mb-3 sticky-top">
        {/*<AppNavBar />*/}
        {/*<ComplexNavbar />*/}
        <UnifiedNavbar />
      </div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
