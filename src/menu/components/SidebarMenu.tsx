import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { menuItems } from "./menu";

export default function SideBarMenu() {
  const navigate = useNavigate();
  const handleOnMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key) {
      navigate(key);
    }
  };
  return (
    <div style={{ width: 256 }}>
      <Menu
        defaultSelectedKeys={["/home"]}
        defaultOpenKeys={["/home"]}
        mode={"inline"}
        theme={"light"}
        items={menuItems}
        onClick={handleOnMenuClick}
      />
    </div>
  );
}
