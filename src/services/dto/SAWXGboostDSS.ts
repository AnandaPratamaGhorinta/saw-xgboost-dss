export interface KosData {
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

  export  interface KriteriaData {
    kode: string;
    nama: string;
    bobot: number;
    active_flag: string;
  }
  