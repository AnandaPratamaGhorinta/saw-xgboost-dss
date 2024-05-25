import {
  CalculatorOutlined,
  FunctionOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/data-kos">Data Kos</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<SettingOutlined />}>
          <Link to="/kriteria">Kriteria</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<CalculatorOutlined />}>
          <Link to="/penilaian">Penilaian</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FunctionOutlined />}>
          <Link to="/process-xgboost">Penilaian XGBOOST</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
