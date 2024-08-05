import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Table, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { createUseStyles } from "react-jss";
import { branchData, mockFetchBranches } from "./mockData";

const useStyles = createUseStyles({
  container: {
    padding: "20px",
    background: "#fff",
    minHeight: "100vh",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "50px",
  },
  searchContainer: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: 60,
  },
  addButton: {
    borderColor: "#1890ff",
    color: "#1890ff",
    "&:hover": {
      borderColor: "#40a9ff",
      color: "#40a9ff",
    },
  },
  link: {
    color: "#1890ff",
    cursor: "pointer",
    textDecoration: "underline",
  },
});

export default function BranchSearch() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [data, setData] = useState(branchData);
  const [filterCode, setFilterCode] = useState("");
  const [filterName, setFilterName] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleSearch = useCallback(async () => {
    const result: any = await mockFetchBranches(filterCode, filterName);
    setData(result);
  }, [filterCode, filterName]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text: string) => (
        <span
          className={classes.link}
          onClick={() => navigate(`/branch/detail`)}
        >
          {text}
        </span>
      ),
      sorter: (a: any, b: any) => a.code.localeCompare(b.code),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (isActive ? "YES" : "NO"),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => navigate(`/branch/edit/input/${record.code}`)}
          />
          <DeleteOutlined
            onClick={() => navigate(`/branch/delete/input/${record.code}`)}
          />
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys as string[]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <h2>Branch</h2>
        <Button
          ghost
          onClick={() => navigate("/branch/add/input")}
          className={classes.addButton}
        >
          Add
        </Button>
      </div>
      <div className={classes.searchContainer}>
        <Input
          placeholder="Filter by Code"
          value={filterCode}
          onChange={(e) => setFilterCode(e.target.value)}
        />
        <Input
          placeholder="Filter by Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="code"
        rowSelection={rowSelection}
        pagination={false} // Remove pagination if not needed
      />
    </div>
  );
}
