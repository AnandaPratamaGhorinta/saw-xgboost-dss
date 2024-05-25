import { KosData } from "../../services/dto/SAWXGboostDSS";

interface KosDetailRendererProps {
  data: KosData | null;
}

export default function KosDetailRenderer({ data }: KosDetailRendererProps) {
  return (
    <div>
      {data && (
        <div>
          <p>
            <strong>Nama Kos:</strong> {data.nama_kos}
          </p>
          <p>
            <strong>Harga:</strong> {data.harga}
          </p>
          <p>
            <strong>Alamat:</strong> {data.alamat}
          </p>
          <p>
            <strong>Luas Kamar:</strong> {data.luas_kamar_panjang} x{" "}
            {data.luas_kamar_lebar}
          </p>
          <p>
            <strong>Kamar Mandi Dalam:</strong>{" "}
            {data.kamar_mandi_dalam ? "Yes" : "No"}
          </p>
          <p>
            <strong>Air Panas:</strong> {data.air_panas ? "Yes" : "No"}
          </p>
          <p>
            <strong>AC:</strong> {data.AC ? "Yes" : "No"}
          </p>
          <p>
            <strong>Kasur:</strong> {data.kasur ? "Yes" : "No"}
          </p>
          <p>
            <strong>Meja:</strong> {data.meja ? "Yes" : "No"}
          </p>
          <p>
            <strong>Kursi:</strong> {data.kursi ? "Yes" : "No"}
          </p>
          <p>
            <strong>Lemari:</strong> {data.lemari ? "Yes" : "No"}
          </p>
          <p>
            <strong>Parkir Sepeda Motor:</strong>{" "}
            {data.parkir_sepeda_motor ? "Yes" : "No"}
          </p>
          <p>
            <strong>Parkir Mobil:</strong> {data.parkir_mobil ? "Yes" : "No"}
          </p>
          <p>
            <strong>Wifi:</strong> {data.wifi ? "Yes" : "No"}
          </p>
          <p>
            <strong>Dapur Umum:</strong> {data.dapur_umum ? "Yes" : "No"}
          </p>
          <p>
            <strong>Laundry:</strong> {data.laundry ? "Yes" : "No"}
          </p>
          <p>
            <strong>Kulkas:</strong> {data.kulkas ? "Yes" : "No"}
          </p>
        </div>
      )}
    </div>
  );
}
