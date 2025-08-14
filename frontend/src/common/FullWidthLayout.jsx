import { Outlet } from "react-router";
import { UnifiedNavbar } from "./UnifiedNavbar.jsx";
import { MainFooter } from "../main/MainFooter.jsx";
import { ScrollToTopButton } from "../main/ScrollToTopButton.jsx";

export function FullWidthLayout() {
  return (
    <div>
      <div className="sticky-top">
        <UnifiedNavbar />
      </div>
      <Outlet />
      <ScrollToTopButton />
      <MainFooter />
    </div>
  );
}
