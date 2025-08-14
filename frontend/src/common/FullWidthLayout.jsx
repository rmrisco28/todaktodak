import { Outlet } from "react-router";
import { AppNavbar } from "./AppNavbar.jsx";
import { Footer } from "./Footer.jsx";
import { ScrollToTopButton } from "./ScrollToTopButton.jsx";

export function FullWidthLayout() {
  return (
    <div>
      <div className="sticky-top">
        <AppNavbar />
      </div>
      <Outlet />
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
