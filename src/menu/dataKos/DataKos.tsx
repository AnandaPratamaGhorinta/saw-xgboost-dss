import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Space } from "antd";
import axios from "axios";
import Link from "antd/es/typography/Link";
import { KosData } from "../../services/dto/SAWXGboostDSS";
import { endpoints } from "../../services/endpoints/endpoints";
import KosDetailRenderer from "../../uiComponent/detail/KosDetailRenderer";
import MultipleSimpleCheckBoxInput from "../../uiComponent/input/MultipleCheckBoxInput";

export default function DataKos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedKos, setSelectedKos] = useState<any>(null);
  const [filteredKosData, setFilteredKosData] = useState<KosData[]>([]);
  const { Search } = Input;
  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    const searchText = value.toLowerCase();
    const filteredKos = data.filter(
      (kos: KosData) =>
        kos.nama_kos.toLowerCase().includes(searchText) ||
        kos.alamat.toLowerCase().includes(searchText)
    );
    setFilteredKosData(filteredKos);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(endpoints.kos);
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
      await axios.delete(`${endpoints.kos}/${selectedRow.id}`);
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

  const handleNamaKosClick = (kos: any) => {
    setSelectedKos(kos);
    setDetailModalVisible(true);
  };

  const checkBoxInputlabelAndNameList = [
    {
      name: "kamar_mandi_dalam",
      label: "Kamar Mandi Dalam",
    },
    {
      name: "air_panas",
      label: "Air Panas",
    },
    {
      name: "AC",
      label: "AC",
    },
    {
      name: "kasur",
      label: "Kasur",
    },
    {
      name: "meja",
      label: "Meja",
    },
    {
      name: "kursi",
      label: "Kursi",
    },
    {
      name: "lemari",
      label: "Lemari",
    },
    {
      name: "parkir_sepeda_motor",
      label: "Parkir Sepeda Motor",
    },
    {
      name: "parkir_mobil",
      label: "Parkir Mobil",
    },
    {
      name: "wifi",
      label: "Wifi",
    },
    {
      name: "dapur_umum",
      label: "Dapur Umum",
    },
    {
      name: "laundry",
      label: "Laundry",
    },
    {
      name: "kulkas",
      label: "Kulkas",
    },
  ];

  const columns = [
    {
      title: "Nama Kos",
      dataIndex: "nama_kos",
      key: "nama_kos",
      render: (text: string, record: any) => (
        <Link onClick={() => handleNamaKosClick(record)}>{text}</Link>
      ),
    },
    {
      title: "Harga",
      dataIndex: "harga",
      key: "harga",
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
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
      <h2>Data Kos</h2>
      <Space style={{ marginBottom: 20 }}>
        <Search placeholder="Search" enterButton onSearch={handleSearch} />
        <Button type="primary" onClick={handleAdd}>
          Add
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredKosData.length > 0 ? filteredKosData : data}
        loading={loading}
      />
      <Modal
        title="Kos Details"
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <KosDetailRenderer data={selectedKos} />
      </Modal>

      <Modal
        title="Confirmation"
        visible={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>

      <Modal
        title="Submit Kos"
        visible={editModalVisible}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              if (selectedRow) {
                await axios.put(`${endpoints.kos}/${selectedRow.id}`, values);
              } else {
                await axios.post(`${endpoints.kos}`, values);
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
            name="nama_kos"
            label="Nama Kos"
            rules={[{ required: true, message: "Please input Nama Kos!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="harga"
            label="Harga"
            rules={[{ required: true, message: "Please input Harga!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="alamat"
            label="Alamat"
            rules={[{ required: true, message: "Please input Alamat!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Fasilitas">
            <Form.Item
              name="luas_kamar_panjang"
              label="Panjang Kamar"
              rules={[
                { required: true, message: "Please input Panjang Kamar!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="luas_kamar_lebar"
              label="Lebar Kamar"
              rules={[{ required: true, message: "Please input Lebar Kamar!" }]}
            >
              <Input />
            </Form.Item>

            <MultipleSimpleCheckBoxInput
              labelAndNameList={checkBoxInputlabelAndNameList}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
