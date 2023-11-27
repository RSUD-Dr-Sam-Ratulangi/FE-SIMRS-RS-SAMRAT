import React from 'react'

interface PemeriksaanItem {
  tanggal: string
  jam: string
  suhu: string
  tensi: string
  nadi: string
  rr: string
  tinggi: string
  berat: string
  gcs: string
  spo2: string
  alergi: string
  kesadaran: string
  subjek: string
  objek: string
  assessment: string
  plan: string
}

interface RenderDataProps {
  values: PemeriksaanItem[]
}

const RenderDataPemeriksaan: React.FC<RenderDataProps> = ({ values }) => {
  const staticLabels = [
    'Tanggal',
    'Jam',
    'Suhu(C)',
    'Tensi(mmHg)',
    'Nadi(/menit)',
    'RR(/menit)',
    'Tinggi(Cm)',
    'Berat(/Kg)',
    'GCS(E,V,M)',
    'SPO2',
    'Alergi',
    'Kesadaran',
    'Subjek',
    'Objek',
    'Assessment',
    'Plan',
  ]

  const mapLabelToProperty = (label) => {
    // Add your label to property name mappings here
    const labelMappings = {
      Tanggal: 'tglPerawatan',
      Jam: 'jamRawat',
      'Suhu(C)': 'suhuTubuh',
      'Tensi(mmHg)': 'tensi',
      'Nadi(/menit)': 'nadi',
      'RR(/menit)': 'rr',
      'Tinggi(Cm)': 'tinggi',
      'Berat(/Kg)': 'berat',
      'GCS(E,V,M)': 'gcs',
      SPO2: 'spo2',
      Alergi: 'alergi',
      Kesadaran: 'kesadaran',
      Subjek: 'subjek',
      Objek: 'Objek',
      Assessment: 'asesmen',
      Plan: 'rtl',
    }

    // Use the mapping, or return the original label if not found
    return labelMappings[label] || label
  }

  const sections = [
    { start: 0, end: 12 },
    { start: 12, end: 15 },
    { start: 15, end: 16 },
  ]

  return (
    <div className='flex flex-col text-sm mb-5 gap-6'>
      {values.map((data, dataIndex) => (
        <div className='flex gap-2' key={dataIndex}>
          <div className='flex w-32'>
            <p className='label-text text-[12px] font-bold text-disabled'>Rawat Jalan</p>
          </div>
          <div key={dataIndex} className='flex flex-col'>
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className={`flex gap-8${sectionIndex > 0 ? ' mt-3' : ''}`}>
                {staticLabels.slice(section.start, section.end).map((label, index) => (
                  <div key={index}>
                    <label className='label-text-alt text-[12px] font-bold text-disabled'>
                      {label}
                    </label>
                    <p className=''>{data[mapLabelToProperty(label)]}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RenderDataPemeriksaan
