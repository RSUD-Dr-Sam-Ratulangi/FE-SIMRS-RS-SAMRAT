export interface DataRiwayatSoapResume {
    jam_rawat: string
    kd_penyakit: string
    nm_penyakit: string
    ciri_ciri: string
    keterangan: string
    kd_ktg: string
    status: string
    // soap data
    noRawat: string
    suhu_tubuh: string
    tensi: string
    nadi: string
    respirasi: string
    tinggi: string
    berat: string
    spo2: string
    gcs: string
    kesadaran: string
    keluhan: string
    pemeriksaan: string
    alergi: string
    lingkar_perut: string
    rtl: string
    penilaian: string
    instruksi: string
    evaluasi: string
    nip: string
  }

export interface RiwayatRadiologiResume {
    no_rawat: string,
    tgl_periksa: string,
    jam: string,
    hasil: string
}

export interface RiwayatLaborResume {
  tgl_periksa?: string;
  jam?: string;
  id_template?: number;
  nilai: string;
  nilai_rujukan: string;
  keterangan: string;
  Pemeriksaan: string;
  satuan: string;
  nilai_rujukan_ld: string;
  nilai_rujukan_la: string;
  nilai_rujukan_pd: string;
  nilai_rujukan_pa: string;
  nm_perawatan: string;
  no_reg: string;
  no_rkm_medis: string;
  kd_dokter: string;
  kd_poli: string
  id? : number
  pemeriksaan: string
}

export interface PemeriksaanLabor {
  id: number
  pemeriksaan: string
  value: string
}

export interface RiwayatDiagnosaResume {
  no_rawat: string;
  kd_penyakit: string;
  status: string;
  prioritas: number;
  status_penyakit: string;
  nm_penyakit: string;
  tgl_registrasi: string;
  nm_pasien: string;
  no_rkm_medis: string;
  kd_dokter: string;
  nm_dokter: string;
}

export interface RiwayatProsedur {
  prioritas: number;
  status: string;
  kode: string;
  tgl_registrasi: string;
  kd_dokter: string;
  no_rkm_medis: string;
  kd_poli: string;
  no_rawat: string;
  deskripsi_panjang: string;
  deskripsi_pendek: string;
  nm_pasien: string;
  nm_poli: string;
}

export enum KondisiPulangResume {
  Hidup = 'Hidup',
  Mati = 'Mati'
}

