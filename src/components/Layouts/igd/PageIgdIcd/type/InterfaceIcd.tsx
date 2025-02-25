export interface DiagnosaIcd {
  kd_penyakit: string
  nm_penyakit: string
  ciri_ciri: string
  keterangan: string
  kd_ktg: string
  status: string
}

export interface ProsedurIcd {
  kode: string
  deskripsi_panjang: string
  deskripsi_pendek: string
}

export interface RiwayatDiagnosaIcd {
  no_rawat: string
  kd_penyakit: string
  status: string
  prioritas: number
  status_penyakit: string
  nm_penyakit: string
  tgl_registrasi: string
  nm_pasien: string
  no_rkm_medis: string
  kd_dokter: string
  nm_dokter: string
}

export interface RiwayatProsedurIcd {
  prioritas: number
  status: string
  kode: string
  tgl_registrasi: string
  kd_dokter: string
  no_rkm_medis: string
  kd_poli: string
  no_rawat: string
  deskripsi_panjang: string
  deskripsi_pendek: string
  nm_pasien: string
  nm_poli: string
}
