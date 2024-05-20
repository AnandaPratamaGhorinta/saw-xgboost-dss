import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";

export const Kriteria: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/kriteria");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row: any) => {
    try {
      setSelectedRow(row); // Set the selected row when clicking the delete button
      setDeleteModalVisible(true); // Show the delete confirmation modal
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Function to handle the actual deletion after confirmation
  const confirmDelete = async () => {
    try {
      // Perform the deletion using Axios
      await axios.delete(`http://localhost:5000/kriteria/${selectedRow.id}`);

      // Filter out the deleted row from the data array
      const newData = data.filter((item: any) => item.id !== selectedRow.id);
      setData(newData);

      // Reset selectedRow and close the modal
      setSelectedRow(null);
      setDeleteModalVisible(false);

      message.success("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
      message.error("Failed to delete data");
    }
  };
  const handleEdit = (record: any) => {
    setSelectedRow(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleAdd = () => {
    setSelectedRow(null);
    form.resetFields();
    setEditModalVisible(true);
  };

  const columns = [
    {
      title: "Kode",
      dataIndex: "kode",
      key: "kode",
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Bobot",
      dataIndex: "bobot",
      key: "bobot",
    },
    {
      title: "Tipe",
      dataIndex: "tipe",
      key: "tipe",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: any, record: any) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>{" "}
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add
      </Button>
      <Table columns={columns} dataSource={data} loading={loading} />

      <Modal
        title="Confirmation"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>

      <Modal
        title="Submit Kriteria"
        visible={editModalVisible}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              console.log(values);
              // Send edited data to backend
              if (selectedRow) {
                await axios.put(
                  `http://localhost:5000/kriteria/${selectedRow.id}`,
                  values
                );
              } else {
                await axios.post(`http://localhost:5000/kriteria`, values);
              }
              fetchData();
              form.resetFields();
              setEditModalVisible(false);
              message.success("Data updated successfully");
            })
            .catch((errorInfo) => {
              console.log("Failed:", errorInfo);
            });
        }}
        onCancel={() => {
          form.resetFields();
          setEditModalVisible(false);
        }}
      >
        <Form form={form} layout="vertical" initialValues={selectedRow}>
          <Form.Item
            name="kode"
            label="Kode"
            rules={[{ required: true, message: "Please input Kode!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nama"
            label="Nama"
            rules={[{ required: true, message: "Please input Nama!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="bobot"
            label="Bobot"
            rules={[{ required: true, message: "Please input Bobot!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tipe"
            label="Tipe"
            rules={[{ required: true, message: "Please input Tipe!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Kriteria;
