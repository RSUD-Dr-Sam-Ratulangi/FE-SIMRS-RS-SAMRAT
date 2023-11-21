import TabelObat from '../Table/tableObat'
import TabelTindakanPerawatan from '../Table/tabelTindakanPerawatanObat'
import TabelTindakanPerawatanDokterPerawat from '../Table/tabelTindakanPerawatanDokterPerawat'

type templateObject = {
  [key: string]: any
}

type Props = {
  dataDokter: templateObject[]
  dataPerawat: templateObject[]
  dataTindakan: templateObject[]
}

// type templateObject = {
//   [key: string]: any
// }

// type Props = {
//   data: templateObject[]
//   columns: any[]
// }

// const dataPemeriksaan = [
//   {
//     id: 1,

//     date: '2023-10-10',
//     kode: 'jj009192',
//     namaTindakan: 'Anemia',
//     pemeriksa: 'Dr. Aglesia Aguiero Gonzales',
//   },
// ]

// const dataObat = [
//   {
//     id: 1,
//     date: '2023-10-10',
//     detailObat: [
//       { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
//       { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
//       { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
//       { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
//     ],
//   },
//   {
//     id: 2,
//     date: '2023-09-10',
//     detailObat: [
//       { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
//       { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
//       { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
//       { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
//       { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
//       { namaObat: 'Dextamine 200 mg', jumlahObat: '31' },
//       { namaObat: 'Ibuprofen 400 mg', jumlahObat: '21' },
//     ],
//   },
// ]

const columnObat = [
  {
    name: 'Date',
    selector: 'date',
    width: '35%',
    conditionalCellStyles: [
      {
        when: (row) => row.detailObat.length > 0,
        style: (row) => ({ marginBottom: `${row.detailObat.length * 1.875}rem` }),
      },
    ],
  },
  {
    name: 'Detail Resep',
    cell: (row) => {
      const nameData = row.detailObat.map((detail, index) => ({
        id: index + 1,
        namaObat: detail.namaObat,
        jumlahObat: detail.jumlahObat,
      }))

      const nameColumns = [
        {
          name: 'Nama Obat',
          selector: 'namaObat',
          sortable: false,
          width: '130px',
        },
        {
          name: 'Jumlah',
          selector: 'jumlahObat',
          sortable: false,
          width: '130px',
        },
      ]

      return (
        <div>
          <TabelObat columns={nameColumns} data={nameData} />
        </div>
      )
    },
  },
]

const columnsPemeriksaan = [
  {
    name: 'Date',
    selector: 'date',

    width: '7rem',
  },
  {
    name: 'Kode',
    selector: 'kode',
    width: '6rem',
  },
  {
    name: 'Name Tindakan/Perawatan',
    selector: 'namaTindakan',

    width: '10rem',
  },
  {
    name: 'Pemeriksa',
    selector: 'pemeriksa',
    style: { marginLeft: '7.1rem' },

    width: '50%',
    grow: 1,
    right: true,
  },
]

const TindakanPerawatan = ({ dataDokter, dataPerawat, dataTindakan }: Props) => {
  return (
    <div>
      <label className='label-text-alt font-light text-disabled'>TINDAKAN PERAWATAN</label>
      <TabelTindakanPerawatanDokterPerawat
        dataDokter={dataDokter}
        dataPerawat={dataPerawat}
        columns={columnsPemeriksaan}
      />

      <label className='label-text-alt font-light text-disabled'>TINDAKAN PERAWATAN</label>
      <TabelTindakanPerawatan data={dataTindakan} columns={columnObat} />
    </div>
  )
}

export default TindakanPerawatan
