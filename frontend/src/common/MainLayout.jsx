import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import { AppNavbar } from "./AppNavbar.jsx";
import { Footer } from "./Footer.jsx";
import { ScrollToTopButton } from "./ScrollToTopButton.jsx";

export function MainLayout() {
  return (
    <div>
      <div className="mb-3 sticky-top">
        <AppNavbar />
      </div>
      <Container>
        <Outlet />
      </Container>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
