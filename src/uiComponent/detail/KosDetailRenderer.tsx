import { CheckSquareTwoTone, CloseSquareFilled } from "@ant-design/icons";
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
            {data.kamar_mandi_dalam ? (
              <CheckSquareTwoTone />
            ) : (
              <CloseSquareFilled />
            )}
          </p>
          <p>
            <strong>Air Panas:</strong>{" "}
            {data.air_panas ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
          <p>
            <strong>AC:</strong>{" "}
            {data.AC ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
          <p>
            <strong>Kasur:</strong>{" "}
            {data.kasur ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
          <p>
            <strong>Meja:</strong>{" "}
            {data.meja ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
          <p>
            <strong>Kursi:</strong>{" "}
            {data.kursi ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
          <p>
            <strong>Lemari:</strong>{" "}
            {data.lemari ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
          <p>
            <strong>Parkir Sepeda Motor:</strong>{" "}
            {data.parkir_sepeda_motor ? (
              <CheckSquareTwoTone />
            ) : (
              <CloseSquareFilled />
            )}
          </p>
          <p>
            <strong>Parkir Mobil:</strong>{" "}
            {data.parkir_mobil ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
          <p>
            <strong>Wifi:</strong>{" "}
            {data.wifi ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
          <p>
            <strong>Dapur Umum:</strong>{" "}
            {data.dapur_umum ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
          <p>
            <strong>Laundry:</strong>{" "}
            {data.laundry ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
          <p>
            <strong>Kulkas:</strong>{" "}
            {data.kulkas ? <CheckSquareTwoTone /> : <CloseSquareFilled />}
          </p>
        </div>
      )}
    </div>
  );
}
