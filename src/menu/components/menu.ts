import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const menuItems: MenuItem[] = [
    {
      label: "Home",
      key: "/home",
    },
    {
      label : "Criteria",
      key:"/criteria"
    },
    {
      label: "User CRUD",
      key: "/user-crud",
    },
    {
      label: "Test train",
      key: "/training-section",
    },
  ];