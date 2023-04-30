import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const menuItems: MenuItem[] = [
    {
      label: "Home",
      key: "/",
      children:[{
        label:"Home",
        key:"/home"
      }]
    },
    {
      label: "User CRUD",
      key: "/view-user",
    },
  ];