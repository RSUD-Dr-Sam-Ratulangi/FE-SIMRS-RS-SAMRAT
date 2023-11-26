import TabelDiagnosaPenyakit from '../../components/Table/tableDiagnosaPenyakit'
import RenderDataPemeriksaan from '../../components/RalanEdit/pemeriksaanComponent'
import TindakanPerawatan from '../../components/RalanEdit/tindakanPerawatanComponent'
import { Props } from 'react-apexcharts'

const columnDiagnosa = [
  { name: 'Kode', selector: (row: DataItem) => row.kdPenyakit, sortable: true, width: '5%' },
  {
    name: 'Nama Penyakit',
    selector: (row: DataItem) => row.nmPenyakit,
    sortable: true,
    right: false,
  },
  { name: 'Prioritas', selector: (row: DataItem) => row.prioritas, sortable: true, right: true },
]

type DataItem = {
  kdPenyakit: string
  nmPenyakit: string
  prioritas: string
}

const RenderDataRiwayatRalan = ({ mergedData }: Props) => {
  return (
    <div className='flex gap-3 flex-col'>
      {mergedData.map((data, index) => (
        <div key={index} className='bg-white p-3 rounded-xl'>
          <p className='text text-lg font-bold'>Riwayat Perawatan</p>
          <div className='flex gap-16'>
            <div>
              <label className='label-text-alt text-[12px] font-bold text-disabled'>NO RAWAT</label>
              <p className='text'>{data.noRawat}</p>
            </div>
            <div>
              <label className='label-text-alt text-[12px] font-bold text-disabled'>
                NO REGISTRASI
              </label>
              <p className='text'>{data.noRegis}</p>
            </div>
            <div>
              <label className='label-text-alt text-[12px] font-bold text-disabled'>
                TANGGAL REGISTRASI
              </label>
              <p className='text'>{data.tglRegistrasi}</p>
            </div>
            <div>
              <label className='label-text-alt text-[12px] font-bold text-disabled'>
                UNIT POLIKLINIK
              </label>
              <p className='text'>{data.unitPoli}</p>
            </div>
            <div>
              <label className='label-text-alt text-[12px] font-bold text-disabled'>DOKTER</label>
              <p className='text'>{data.nmDokter}</p>
            </div>
            <div>
              <label className='label-text-alt text-[12px] text-disabled font-bold'>PENJAMIN</label>
              <p className='text'>{data.penjamin}</p>
            </div>
            <div>
              <label className='label-text-alt text-[12px]  text-disabled font-bold'>STATUS</label>
              <p className='text'>{data.status}</p>
            </div>
            <div>
              <label className='label-text-alt text-[12px] text-disabled font-bold'>
                PEMERIKSAAN
              </label>
              <p className='text'>{data.pemeriksaan}</p>
            </div>
          </div>
          <div className='pt-3'>
            <label className='label-text text-[12px] font-bold text-disabled'>
              DIAGNOSA/PENYAKIT/ICD 10
            </label>
          </div>
          <div className='w-full  outline outline-1 rounded-xl outline-disabled'>
            <TabelDiagnosaPenyakit columns={columnDiagnosa} data={data.icd10} />
          </div>
          <div>
            <label className='label-text text-[12px] font-bold text-disabled'>PEMERIKSAAN</label>
          </div>

          <div className='flex flex-col'>
            <RenderDataPemeriksaan values={data.pemeriksaanRawatJalan} />
          </div>
          <TindakanPerawatan
            dataDokter={data?.diagnosa}
            dataPerawat={data?.tindakanRalanPerawat}
            dataTindakan={data?.dataObat}
          />
        </div>
      ))}
    </div>
  )
}

export default RenderDataRiwayatRalan
