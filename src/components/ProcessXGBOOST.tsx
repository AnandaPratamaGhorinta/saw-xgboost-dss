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
  luas_kamar_panjang: number;
  luas_kamar_lebar: number;
  kamar_mandi_dalam: number;
  air_panas: number;
  AC: number;
  kasur: number;
  meja: number;
  kursi: number;
  lemari: number;
  parkir_sepeda_motor: number;
  parkir_mobil: number;
  wifi: number;
  dapur_umum: number;
  laundry: number;
  kulkas: number;
}

interface KriteriaData {
  kode: string;
  nama: string;
  bobot: number;
  active_flag: string;
}

export const ProcessXGBOOST: React.FC = () => {
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
  const [bobotPrediksiHarga, setBobotPrediksiHarga] = useState<number>(0);
  const [filteredKosData, setFilteredKosData] = useState<KosData[]>([]);

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
      const activeKriteria = kriteriaResponse.data.filter(
        (kriteria: KriteriaData) => kriteria.active_flag === "ACTIVE"
      );
      setKriteriaData(activeKriteria);
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

  const handleProceed = async () => {
    let xgboostRequest: any[] = [];

    selectedRowKeys.map((key: React.Key) => {
      const row = kosData.find((item: KosData) => item.id === key);
      const rowData: any = {
        key: key,
        "Nama Kos": row?.nama_kos || "",
        data: {
          luas_kamar_panjang: row?.luas_kamar_panjang,
          luas_kamar_lebar: row?.luas_kamar_lebar,
          kamar_mandi_dalam: row?.kamar_mandi_dalam,
          air_panas: row?.air_panas,
          AC: row?.AC,
          kasur: row?.kasur,
          meja: row?.meja,
          kursi: row?.kursi,
          lemari: row?.lemari,
          parkir_sepeda_motor: row?.parkir_sepeda_motor,
          parkir_mobil: row?.parkir_mobil,
          wifi: row?.wifi,
          dapur_umum: row?.dapur_umum,
          laundry: row?.laundry,
          kulkas: row?.kulkas,
        },
      };

      xgboostRequest.push(rowData.data);

      kriteriaData.forEach((kriteria: KriteriaData) => {
        rowData[kriteria.nama] = "";
      });
      return rowData;
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        xgboostRequest
      );

      const enhancedProceedData = selectedRowKeys.map(
        (key: React.Key, index: number) => {
          const row = kosData.find((item: KosData) => item.id === key);
          const rowData: any = {
            key: key,
            predicted_price: response.data.predicted_price[index],
            "Nama Kos": row?.nama_kos || "",
            data: {
              luas_kamar_panjang: row?.luas_kamar_panjang,
              luas_kamar_lebar: row?.luas_kamar_lebar,
              kamar_mandi_dalam: row?.kamar_mandi_dalam,
              air_panas: row?.air_panas,
              AC: row?.AC,
              kasur: row?.kasur,
              meja: row?.meja,
              kursi: row?.kursi,
              lemari: row?.lemari,
              parkir_sepeda_motor: row?.parkir_sepeda_motor,
              parkir_mobil: row?.parkir_mobil,
              wifi: row?.wifi,
              dapur_umum: row?.dapur_umum,
              laundry: row?.laundry,
              kulkas: row?.kulkas,
            },
          };

          kriteriaData.forEach((kriteria: KriteriaData) => {
            rowData[kriteria.nama] = "";
          });
          return rowData;
        }
      );

      setProceedTableData(enhancedProceedData);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  const handleProcess = async () => {
    let rankResultCriteria: any[] = [];
    const requestData = proceedTableData.map((row: any, index: number) => {
      const data_kriteria = kriteriaData.map((kriteria: KriteriaData) => ({
        kode_kriteria: kriteria.kode,
        nama_kriteria: kriteria.nama,
        isi_kriteria: parseInt(row[kriteria.nama]),
        bobot: kriteria.bobot,
      }));

      const predictionContent = {
        kode_kriteria: "PP01",
        nama_kriteria: "Prediksi Harga",
        isi_kriteria: proceedTableData[index].predicted_price,
        bobot: bobotPrediksiHarga,
      };

      data_kriteria.push(predictionContent);
      rankResultCriteria.push(data_kriteria);
      return {
        nama_kos: row["Nama Kos"],
        data_kriteria: data_kriteria,
      };
    });
    const payload = { data: requestData };
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
    {
      title: "Prediksi Harga",
      key: "Prediksi Harga",
      render: (record: any) => record.kriteria["Prediksi Harga"],
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

  const handleSearch = (value: string) => {
    const searchText = value.toLowerCase();
    const filteredKos = kosData.filter(
      (kos: KosData) =>
        kos.nama_kos.toLowerCase().includes(searchText) ||
        kos.alamat.toLowerCase().includes(searchText)
    );
    setFilteredKosData(filteredKos);
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
            <p>
              <strong>Nama Kos:</strong> {selectedKos.nama_kos}
            </p>
            <p>
              <strong>Harga:</strong> {selectedKos.harga}
            </p>
            <p>
              <strong>Alamat:</strong> {selectedKos.alamat}
            </p>
            <p>
              <strong>Luas Kamar:</strong> {selectedKos.luas_kamar_panjang} x{" "}
              {selectedKos.luas_kamar_lebar}
            </p>
            <p>
              <strong>Kamar Mandi Dalam:</strong>{" "}
              {selectedKos.kamar_mandi_dalam ? "Yes" : "No"}
            </p>
            <p>
              <strong>Air Panas:</strong> {selectedKos.air_panas ? "Yes" : "No"}
            </p>
            <p>
              <strong>AC:</strong> {selectedKos.AC ? "Yes" : "No"}
            </p>
            <p>
              <strong>Kasur:</strong> {selectedKos.kasur ? "Yes" : "No"}
            </p>
            <p>
              <strong>Meja:</strong> {selectedKos.meja ? "Yes" : "No"}
            </p>
            <p>
              <strong>Kursi:</strong> {selectedKos.kursi ? "Yes" : "No"}
            </p>
            <p>
              <strong>Lemari:</strong> {selectedKos.lemari ? "Yes" : "No"}
            </p>
            <p>
              <strong>Parkir Sepeda Motor:</strong>{" "}
              {selectedKos.parkir_sepeda_motor ? "Yes" : "No"}
            </p>
            <p>
              <strong>Parkir Mobil:</strong>{" "}
              {selectedKos.parkir_mobil ? "Yes" : "No"}
            </p>
            <p>
              <strong>Wifi:</strong> {selectedKos.wifi ? "Yes" : "No"}
            </p>
            <p>
              <strong>Dapur Umum:</strong>{" "}
              {selectedKos.dapur_umum ? "Yes" : "No"}
            </p>
            <p>
              <strong>Laundry:</strong> {selectedKos.laundry ? "Yes" : "No"}
            </p>
            <p>
              <strong>Kulkas:</strong> {selectedKos.kulkas ? "Yes" : "No"}
            </p>
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
        <Search placeholder="Search" enterButton onSearch={handleSearch} />
      </Space>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={kosColumns}
        dataSource={filteredKosData.length > 0 ? filteredKosData : kosData}
        loading={loading}
        rowKey="id"
      />
      <Button type="primary" onClick={handleProceed} style={{ marginTop: 16 }}>
        Proceed
      </Button>
      <h2>Proceeded Data</h2>
      <div style={{ marginTop: 16 }}>
        <h1>Bobot Prediksi Harga</h1>
        <Input
          type="number"
          value={bobotPrediksiHarga}
          onChange={(e) => setBobotPrediksiHarga(Number(e.target.value))}
          placeholder="Bobot Prediksi Harga"
        />
      </div>
      <Table
        columns={[
          {
            title: "Nama Kos",
            dataIndex: "Nama Kos",
            key: "Nama Kos",
          },
          {
            title: "Prediksi Harga Kos",
            dataIndex: "predicted_price",
            key: "predicted_price",
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

export default ProcessXGBOOST;
