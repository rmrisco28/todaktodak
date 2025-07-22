import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./common/MainLayout.jsx";
import { MainView } from "./main/MainView.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<MainView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
