import { Routes, Route } from "react-router-dom";
import LoginPage from "./login/loginPage";
import AppMenu from "./menu";
import HomePage from "./menu/MenuList/homePage";
import UserCrud from "./menu/MenuList/userCrud";
import CriteriaSetting from "./menu/MenuList/criteriaSettingPage";

function AppRoute() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AppMenu />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/criteria" element={<CriteriaSetting />} />
        <Route path="training-section" element={<>welcome/</>} />
        <Route path="user-crud" element={<UserCrud />} />
      </Route>
    </Routes>
  );
}

export default AppRoute;
