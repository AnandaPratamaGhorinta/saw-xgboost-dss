import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const menuItems: MenuItem[] = [
    {
      label: "Home",
      key: "/",
      children:[{
        label:"homeReview",
        key:"/home-review"
      }]
    },
    {
      label: "Training Playground",
      key: "/training-section",
    },
  ];