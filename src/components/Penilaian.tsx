import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Modal } from "antd";
import axios from "axios";
import Link from "antd/es/typography/Link";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RankDocument from "./document/RankDocument";

const { Search } = Input;

interface KosData {
  id: number;
  nama_kos: string;
  harga: number;
  alamat: string;
}

interface KriteriaData {
  kode: string;
  nama: string;
  bobot: number; // Added bobot property to KriteriaData
}

export const Penilaian: React.FC = () => {
  const [kriteriaData, setKriteriaData] = useState<KriteriaData[]>([]);
  const [kosData, setKosData] = useState<KosData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedKos, setSelectedKos] = useState<KosData | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [proceedTableData, setProceedTableData] = useState<any[]>([]);
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [rankingModalVisible, setRankingModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const kriteriaResponse = await axios.get(
        "http://localhost:5000/kriteria"
      );
      const kosResponse = await axios.get("http://localhost:5000/kos");
      setKriteriaData(kriteriaResponse.data);
      setKosData(kosResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSelectChange = (
    selectedRowKeys: React.Key[],
    selectedRows: KosData[]
  ) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleNamaKosClick = (kos: KosData) => {
    setSelectedKos(kos);
    setDetailModalVisible(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowKey: string,
    columnKey: string
  ) => {
    const newData = proceedTableData.map((item) => {
      if (item.key === rowKey) {
        return {
          ...item,
          [columnKey]: e.target.value,
        };
      }
      return item;
    });
    setProceedTableData(newData);
  };

  const handleProceed = () => {
    const proceedData = selectedRowKeys.map((key: React.Key) => {
      const row = kosData.find((item: KosData) => item.id === key);
      const rowData: any = {
        key: key,
        "Nama Kos": row?.nama_kos || "",
      };
      kriteriaData.forEach((kriteria: KriteriaData) => {
        rowData[kriteria.nama] = "";
      });
      return rowData;
    });
    setProceedTableData(proceedData);
  };

  const handleProcess = async () => {
    const requestData = proceedTableData.map((row: any) => {
      const data_kriteria = kriteriaData.map((kriteria: KriteriaData) => ({
        kode_kriteria: kriteria.kode,
        nama_kriteria: kriteria.nama,
        isi_kriteria: parseInt(row[kriteria.nama]),
        bobot: kriteria.bobot,
      }));

      return {
        nama_kos: row["Nama Kos"],
        data_kriteria: data_kriteria,
      };
    });

    const payload = { data: requestData };
    console.log("Processed Data:", payload);

    try {
      const response = await axios.post("http://localhost:5000/saw", payload);
      setRankingData(response.data);
      setRankingModalVisible(true);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  const kriteriaColumns = kriteriaData.map((kriteria: KriteriaData) => ({
    title: `${kriteria.nama} (${kriteria.kode})`,
    dataIndex: kriteria.nama,
    key: kriteria.nama,
    render: (text: any, record: any) => (
      <Input
        value={text}
        onChange={(e) => handleInputChange(e, record.key, kriteria.nama)}
      />
    ),
  }));

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
      title: "status",
      key: "active_flag",
      render: (_text: any, record: any) =>
        record.active_flag === "ACTIVE" ? <>Active</> : <>Inactive</>,
    },
  ];

  const kosColumns = [
    {
      title: "Nama Kos",
      dataIndex: "nama_kos",
      key: "nama_kos",
      render: (text: string, record: KosData) => (
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
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const rankingColumns = [
    {
      title: "Nama Kos",
      dataIndex: "nama_kos",
      key: "nama_kos",
    },
    ...kriteriaData.map((kriteria: KriteriaData) => ({
      title: kriteria.nama,
      dataIndex: ["kriteria", kriteria.nama],
      key: kriteria.nama,
    })),
    {
      title: "Total Score",
      dataIndex: "total_score",
      key: "total_score",
    },
  ];

  // Client-side code

  const handleDownload = () => {
    return (
      <PDFDownloadLink
        document={<RankDocument rankingData={rankingData} />}
        fileName="ranking.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    );
  };
  return (
    <div>
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
        {selectedKos && (
          <div>
            <p>Nama Kos: {selectedKos.nama_kos}</p>
            <p>Harga: {selectedKos.harga}</p>
            <p>Alamat: {selectedKos.alamat}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </Modal>
      <h2>Kriteria Aktif</h2>
      <Table
        columns={columns}
        dataSource={kriteriaData}
        loading={loading}
        rowKey="kode"
      />
      <h2>All Kos Data</h2>
      <Space style={{ marginBottom: 16 }}>
        <Search placeholder="Search" enterButton />
      </Space>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={kosColumns}
        dataSource={kosData}
        loading={loading}
        rowKey="id"
      />
      <Button type="primary" onClick={handleProceed} style={{ marginTop: 16 }}>
        Proceed
      </Button>
      <h2>Proceeded Data</h2>
      <Table
        columns={[
          {
            title: "Nama Kos",
            dataIndex: "Nama Kos",
            key: "Nama Kos",
          },
          ...kriteriaColumns,
        ]}
        dataSource={proceedTableData}
        rowKey="key"
      />
      <Button type="primary" onClick={handleProcess} style={{ marginTop: 16 }}>
        Process
      </Button>
      <Modal
        title="Rangking"
        visible={rankingModalVisible}
        width={1000}
        onCancel={() => setRankingModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setRankingModalVisible(false)}>
            Close
          </Button>,
          <Button key="download" onClick={() => handleDownload()}>
            Download
          </Button>,
        ]}
      >
        <Table
          columns={rankingColumns}
          dataSource={rankingData}
          rowKey="nama_kos"
          scroll={{ x: true }}
        />
      </Modal>
    </div>
  );
};

export default Penilaian;
