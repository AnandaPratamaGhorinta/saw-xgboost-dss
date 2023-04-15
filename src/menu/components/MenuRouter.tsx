import { Routes, Route } from "react-router-dom";
import HomePage from "../MenuList/HomePage/HomePage";

function MenuRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={HomePage()} />
        <Route path="/home-review" element={<>Test ChildMenu</>} />
        <Route path="training-section" element={""} />
      </Routes>
    </div>
  );
}

export default MenuRouter;
