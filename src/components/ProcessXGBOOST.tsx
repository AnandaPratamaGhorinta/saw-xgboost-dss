import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import api from "../services/api";

interface XGBOOSTData {
  id: number;
  result: string;
}

export const ProcessXGBOOST: React.FC = () => {
  const [xgboostList, setXgboostList] = useState<XGBOOSTData[]>([]);

  useEffect(() => {
    fetchXGBOOSTData();
  }, []);

  const fetchXGBOOSTData = async () => {
    try {
      const response = await api.get("/xgboost");
      setXgboostList(response.data);
    } catch (error) {
      console.error("Failed to fetch XGBOOST data:", error);
    }
  };

  const handleProcessXGBOOST = async () => {
    try {
      await api.post("/xgboost");
      fetchXGBOOSTData();
    } catch (error) {
      console.error("Failed to process XGBOOST:", error);
    }
  };

  const columns = [{ title: "Result", dataIndex: "result", key: "result" }];

  return (
    <div>
      <Button type="primary" onClick={handleProcessXGBOOST}>
        Process XGBOOST
      </Button>
      <Table columns={columns} dataSource={xgboostList} rowKey="id" />
    </div>
  );
};
