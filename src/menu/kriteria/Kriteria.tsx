import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Select,
  Collapse,
} from "antd";
import axios from "axios";
import { endpoints } from "../../services/endpoints/endpoints";

const { Option } = Select;

export default function Kriteria() {
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
      const response = await axios.get(endpoints.kriteria);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row: any) => {
    try {
      setSelectedRow(row);
      setDeleteModalVisible(true);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${endpoints.kriteria}/${selectedRow.id}`);
      const newData = data.filter((item: any) => item.id !== selectedRow.id);
      setData(newData);
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
      render: (_text: any, record: any) =>
        record.tipe === "COST" ? <>Cost</> : <>Benefit</>,
    },
    {
      title: "Status",
      key: "active_flag",
      render: (_text: any, record: any) =>
        record.active_flag === "ACTIVE" ? <>Active</> : <>Inactive</>,
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

  const { Panel } = Collapse;

  return (
    <div>
      <h2>Kriteria</h2>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Notes" key="1">
          <p>Range Input Untuk Bobot Kriteria Adalah 0 sampai 1.</p>
        </Panel>
      </Collapse>

      <Button
        type="primary"
        onClick={handleAdd}
        style={{ marginBottom: 16, marginTop: 16 }}
      >
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
              if (selectedRow) {
                await axios.put(
                  `${endpoints.kriteria}/${selectedRow.id}`,
                  values
                );
              } else {
                await axios.post(`${endpoints.kriteria}`, values);
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
            <Select placeholder="Select Tipe">
              <Option value="COST">Cost</Option>
              <Option value="BENEFIT">Benefit</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="active_flag"
            label="Status"
            rules={[{ required: true, message: "Please input Status!" }]}
          >
            <Select placeholder="Select Status">
              <Option value="ACTIVE">Active</Option>
              <Option value="INACTIVE">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
