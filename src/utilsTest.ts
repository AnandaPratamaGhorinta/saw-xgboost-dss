
export function bagiBilangan(bilangan1: number, bilangan2: number): number {
    let bagi = bilangan1 / bilangan2;
    return bagi;
  }

export function kaliBilangan(bilangan1X: number, bilangan2X: number): number {
    let hasilKali = bilangan1X * bilangan2X;
    return hasilKali;
  }

  export function tambahBilangan(bilangan1T: number, bilangan2T: number) {
    let hasilTambah = bilangan1T + bilangan2T;
    return hasilTambah;
  }

  export function test3(nama: string, umur: number, kota: string, nomor_ktp: number) {
    return `nama gw ${nama} umur gw ${umur} gw tinggal di ${kota} nomor ktp gw ${nomor_ktp}`;
  }
  console.log(test3("arif", 17, "depok", 127302010123123));