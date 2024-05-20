import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import api from "../services/api";

interface PenilaianData {
  id: number;
  id_kos: number;
  id_kriteria: number;
  nilai: number;
}

interface Kos {
  id: number;
  nama_kos: string;
}

interface Kriteria {
  id: number;
  nama: string;
}

export const Penilaian: React.FC = () => {
  const [penilaianList, setPenilaianList] = useState<PenilaianData[]>([]);
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [kriteriaList, setKriteriaList] = useState<Kriteria[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPenilaianData();
    fetchKosData();
    fetchKriteriaData();
  }, []);

  const fetchPenilaianData = async () => {
    try {
      const response = await api.get("/penilaian");
      setPenilaianList(response.data);
    } catch (error) {
      console.error("Failed to fetch penilaian data:", error);
    }
  };

  const fetchKosData = async () => {
    try {
      const response = await api.get("/kos");
      setKosList(response.data);
    } catch (error) {
      console.error("Failed to fetch kos data:", error);
    }
  };

  const fetchKriteriaData = async () => {
    try {
      const response = await api.get("/kriteria");
      setKriteriaList(response.data);
    } catch (error) {
      console.error("Failed to fetch kriteria data:", error);
    }
  };

  const handleCreatePenilaian = async (values: any) => {
    try {
      await api.post("/penilaian", values);
      fetchPenilaianData();
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to create penilaian:", error);
    }
  };

  const columns = [
    {
      title: "Kos",
      dataIndex: "id_kos",
      key: "id_kos",
      render: (id_kos: number) =>
        kosList.find((kos) => kos.id === id_kos)?.nama_kos,
    },
    {
      title: "Kriteria",
      dataIndex: "id_kriteria",
      key: "id_kriteria",
      render: (id_kriteria: number) =>
        kriteriaList.find((kriteria) => kriteria.id === id_kriteria)?.nama,
    },
    { title: "Nilai", dataIndex: "nilai", key: "nilai" },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add Penilaian
      </Button>
      <Table columns={columns} dataSource={penilaianList} rowKey="id" />
      <Modal
        title="Add Penilaian"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleCreatePenilaian}>
          <Form.Item name="id_kos" label="Kos" rules={[{ required: true }]}>
            <Select>
              {kosList.map((kos) => (
                <Select.Option key={kos.id} value={kos.id}>
                  {kos.nama_kos}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="id_kriteria"
            label="Kriteria"
            rules={[{ required: true }]}
          >
            <Select>
              {kriteriaList.map((kriteria) => (
                <Select.Option key={kriteria.id} value={kriteria.id}>
                  {kriteria.nama}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="nilai" label="Nilai" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
