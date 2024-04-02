import { Routes, Route } from "react-router-dom";
import HomePage from "../MenuList/homePage";
import UserCrud from "../MenuList/userCrud";

function MenuRouter() {
  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "Gainsboro",
      }}
    >
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/training-section" element={<>welcome/</>} />
        <Route path="/user-crud" element={UserCrud()} />
      </Routes>
    </div>
  );
}

export default MenuRouter;
