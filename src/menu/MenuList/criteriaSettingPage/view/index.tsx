import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import axios from "axios";

export default function CriteriaTable() {
  const [criteria, setCriteria] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [attributeFilter, setAttributeFilter] = useState<string>("");

  useEffect(() => {
    fetchCriteria();
  }, []);

  const fetchCriteria = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/criteria");
      setCriteria(response.data);
    } catch (error) {
      console.error("Error fetching criteria:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleAttributeFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAttributeFilter(e.target.value);
  };

  const filteredCriteria = criteria.filter((item: any) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const attributeMatch = item.attribute
      .toLowerCase()
      .includes(attributeFilter.toLowerCase());
    return nameMatch && attributeMatch;
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
      sorter: (a: any, b: any) => a.attribute.localeCompare(b.attribute),
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      sorter: (a: any, b: any) => a.weight - b.weight,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <span>
          <Button type="link">Edit</Button>
          <Button type="link">Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Filter by name"
          value={nameFilter}
          onChange={handleNameFilterChange}
          style={{ width: 200, marginRight: 8 }}
        />
        <Input
          placeholder="Filter by attribute"
          value={attributeFilter}
          onChange={handleAttributeFilterChange}
          style={{ width: 200, marginRight: 8 }}
        />
        <Button type="primary">Filter</Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredCriteria}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
}
