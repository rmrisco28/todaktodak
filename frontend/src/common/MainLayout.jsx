import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import { ComplexNavbar } from "./ComplexNavbar.jsx";
import { AppNavBar } from "./AppNavBar.jsx";

export function MainLayout() {
  return (
    <div>
      <div
        className="mb-3"
        // className="pb-lg-7 pb-md-7 pb-sm-7 pt-xl-7"
      >
        {/*<AppNavBar />*/}
        <ComplexNavbar />
      </div>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
