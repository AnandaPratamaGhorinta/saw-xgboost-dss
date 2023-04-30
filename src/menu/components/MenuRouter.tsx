import { Routes, Route } from "react-router-dom";
import HomePage from "../MenuList/homePage";

function MenuRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<>welcome </>} />
        <Route path="/home" element={HomePage()} />
        <Route path="/training-section" element={<>welcome/</>} />
      </Routes>
    </div>
  );
}

export default MenuRouter;
