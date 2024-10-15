export interface ListObat {
  kode_brng: string
  nama_brng: string
  jenis_nama: string
  kode_sat: string
  karyawan: number
  ralan: number
  beliluar: number
  kelas1: number
  kelas2: number
  kelas3: number
  vip?: number
  vvip?: number
  letak_barang?: string
  utama?: boolean
  nama_industri?: string
  h_beli?: number
  stok?: number
  kd_bangsal?: string
}

export interface MedicineObat {
  nama: string
  aturanPakai: any
  jumlahObat: any
  kode: string
}

export interface RiwayatResepObat {
  map(
    arg0: (item: any, idx: any) => import('react/jsx-runtime').JSX.Element,
  ): import('react').ReactNode
  noResep: string
  kodeBrng: string
  jml: number
  aturanPakai: string
  tglPeresepan: string
  kdDokter: string
  nmDokter: string
  tglPerawatan: string
  namaBrng: string
}
