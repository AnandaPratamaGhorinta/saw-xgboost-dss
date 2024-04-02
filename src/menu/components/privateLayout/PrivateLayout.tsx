import MenuFooter from "../MenuFooter";
import MenuHeader from "../MenuHeader";
import SideBarMenu from "../SidebarMenu";

export default function PrivateLayout() {
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          flexGrow: 1,
        }}
      >
        <SideBarMenu />
      </div>
      <MenuFooter />
    </div>
  );
}
