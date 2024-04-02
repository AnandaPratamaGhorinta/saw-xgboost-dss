import { Outlet } from "react-router-dom";
import MenuFooter from "./components/MenuFooter";
import MenuHeader from "./components/MenuHeader";
import SideBarMenu from "./components/SidebarMenu";

export default function AppMenu() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100vh",
        backgroundColor: "DarkGray",
      }}
    >
      <MenuHeader />
      <div
        style={{ display: "flex", flexDirection: "row", flex: 1, flexGrow: 1 }}
      >
        <SideBarMenu />
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "Gainsboro",
          }}
        >
          <Outlet />
        </div>
      </div>
      <MenuFooter />
    </div>
  );
}
