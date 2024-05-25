import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./uiComponent/Sidebar";
import WelcomeDashboard from "./menu/dashboard/Dashboard";
import DataKos from "./menu/dataKos/DataKos";
import Kriteria from "./menu/kriteria/Kriteria";
import Penilaian from "./menu/penilaian/Penilaian";
import ProcessXGBOOST from "./menu/processXGBOOST/ProcessXGBOOST";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Routes>
                <Route path="/" element={<WelcomeDashboard />} />
                <Route path="/data-kos" element={<DataKos />} />
                <Route path="/kriteria" element={<Kriteria />} />
                <Route path="/penilaian" element={<Penilaian />} />
                <Route path="/process-xgboost" element={<ProcessXGBOOST />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
