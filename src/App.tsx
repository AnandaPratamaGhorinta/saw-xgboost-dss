import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import { DataKos } from "./components/DataKos";
import { Kriteria } from "./components/Kriteria";
import { Penilaian } from "./components/Penilaian";
import { ProcessXGBOOST } from "./components/ProcessXGBOOST";
import WelcomeDashboard from "./components/Dashboard";

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
