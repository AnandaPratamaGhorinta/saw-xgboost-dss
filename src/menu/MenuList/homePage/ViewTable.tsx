import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

const TableView: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Criteria 1", dataIndex: "criteria1", key: "criteria1" },
    { title: "Criteria 2", dataIndex: "criteria2", key: "criteria2" },
    { title: "Criteria 3", dataIndex: "criteria3", key: "criteria3" },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default TableView;
