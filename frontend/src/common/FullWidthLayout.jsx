import { Outlet } from "react-router";
import { UnifiedNavbar } from "./UnifiedNavbar.jsx";

export function FullWidthLayout() {
  return (
    <div>
      <div className="sticky-top">
        <UnifiedNavbar />
      </div>
      <Outlet />
    </div>
  );
}
