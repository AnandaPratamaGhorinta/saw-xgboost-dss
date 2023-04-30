import UserCrud from "./MenuList/userCrud";
import MenuFooter from "./components/MenuFooter";
import MenuHeader from "./components/MenuHeader";
import MenuRouter from "./components/MenuRouter";
import SideBarMenu from "./components/SidebarMenu";

export default function AppMenu() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100vh",
      }}
    >
      <MenuHeader />
      <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
        <SideBarMenu />
        <MenuRouter />
        <UserCrud />
      </div>
      <MenuFooter />
    </div>
  );
}
