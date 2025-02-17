export enum KesadaranOptionsCpptRanap {
  defaultValue = 'Pilih Kesadaran',
  ComposMentis = 'Compos Mentis',
  Somnolence = 'Somnolence',
  Sopor = 'Sopor',
  Coma = 'Coma',
  Alert = 'Alert',
  Confusion = 'Confusion',
  Voice = 'Voice',
  Pain = 'Pain',
  Unresponsive = 'Unresponsive',
}

// FORM
export interface FormDataCpptPemeriksaan {
  suhuTubuh: string
  tensi: string
  nadi: string
  respirasi: string
  tinggi: string
  berat: string
  spo2: string
  gcs: string
  kesadaran: string
  alergi: string
  lingkarPerut: string
}

export interface FormDataCpptSoap {
  keluhan: string // subjektif
  pemeriksaan: string // object
  rtl: string // plan
  penilaian: string // Assesmen
  instruksi: string // instuksi
  evaluasi: string // evaluasi
}
