import React from 'react'

interface PemeriksaanItem {
  noRawat: string
  noRegis: string
  tanggalRegis: string
  unitPoliklinik: string
  dokter: string
  penjamin: string
  status: string
  pemeriksaan: string
}

interface RenderDataProps {
  values: PemeriksaanItem[]
}

const RenderDataRiwayat: React.FC<RenderDataProps> = ({ values }) => {
  const labelDataRiwayat = [
    'NO.RAWAT',
    'NO.REGISTRASI',
    'TANGGAL REGISTRASI',
    'UNIT/POLIKLINIK',
    'DOKTER',
    'PENJAMIN',
    'STATUS',
    'PEMERIKSAAN',
  ]

  const mapLabelToProperty = (label) => {
    // Add your label to property name mappings here
    const labelMappings = {
      'NO.RAWAT': 'noRawat',
      'NO.REGISTRASI': 'noRegis',
      'TANGGAL REGISTRASI': 'tanggalRegis',
      'UNIT/POLIKLINIK': 'umurPoliklinik',
      DOKTER: 'dokter',
      PENJAMIN: 'penjamin',
      STATUS: 'status',
      PEMERIKSAAN: 'pemeriksaan',
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
      {values.map((data, index) => (
        <div key={index}>
          <label className='label-text-alt font-light'>{labelDataRiwayat[index]}</label>
          <p className='font-bold'>
            {data[mapLabelToProperty(labelDataRiwayat[index]).toLowerCase()]}
          </p>
        </div>
      ))}
    </div>
  )
}

export default RenderDataRiwayat
