import { NavLink, useLocation, useParams } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb/Breadcrumb'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { ROUTES } from '../../routes'

export default function PageRalanRME() {
  const idParams = useParams().id
  console.log('param', idParams)

  const links = [
    {
      name: 'Elektronik Rekam Medis',
      link: `/rawat-jalan/rme/${idParams}`,
      to: ROUTES.PAGE_RALAN_RME,
    },
    {
      name: 'SOAP & Pemeriksaan',
      link: `/rawat-jalan/soap/${idParams}`,
      to: ROUTES.PAGE_SOAP_RALAN,
    },
    {
      name: 'Layanan & Obat',
      link: '/rawat-jalan/layanan-obat/1',
      to: ROUTES.PAGE_SOAP_RALAN,
    },
    {
      name: 'Berkas Digital',
      link: '/rawat-jalan/berkas-digital/1',
      to: ROUTES.PAGE_SOAP_RALAN,
    },
  ]

  const location = useLocation()

  return (
    <div className='p-2'>
      <div className='navbar rounded-xl bg-white '>
        <div className='navbar-center hidden lg:flex'>
          <div className='menu menu-horizontal px-1 flex gap-4 '>
            {links.map((link) => (
              <NavLink key={link.to} to={link.link}>
                <a
                  href={link.link}
                  className={`text-disabled text-base font-sans font-bold ${
                    location.pathname === link.link ? 'text-primary' : ''
                  }`}
                >
                  {link.name}
                </a>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className='p-3'>
        <div className='flex text-disabled mt-4'>
          <ArrowLeftIcon className='w-4 mr-1' />
          <p className=' font-sans'>Kembali</p>
        </div>
        <Breadcrumb />
        {links.map((link, index) => (
          <div key={index}>
            <a
              key={index}
              href={link.link}
              className={` text-[#121713] text-2xl font-sans font-bold mb-4 ${
                location.pathname === link.link ? '' : 'hidden'
              }`}
            >
              {link.name}
            </a>
          </div>
        ))}
      </div>
      <div className='w-full h-full bg-white p-3 rounded-xl shadow-soft'>
        <p className='text text-lg font-bold pb-3'>Riwayat Perawatan</p>
        <p className='font-light'>Data Riwayat Perawatan Pasien</p>
        <div>
          <div className='grid grid-cols-4 gap-2'>
            <div>
              <label className='font-bold text-gray-400 text-xs'>NO.RM</label>
              <p className='text font-bold'>165647</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>UMUR</label>
              <p className='text font-bold'>19 Th 10 Bl 18 Hr Tahun</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>GOLONGAN DARAH</label>
              <p className='text font-bold'>-</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>AGAMA</label>
              <p className='text font-bold'>Kristen</p>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-2'>
            <div>
              <label className='font-bold text-gray-400 text-xs'>NAMA PASIEN</label>
              <p className='text font-bold'>Ranomerut</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>JENIS KELAMIN</label>
              <p className='text font-bold'>Perempuan</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>IBU KANDUNG</label>
              <p className='text font-bold'>-</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>PENDIDIKAN TERAKHIR</label>
              <p className='text font-bold'>-</p>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-2'>
            <div>
              <label className='font-bold text-gray-400 text-xs'>ALAMAT</label>
              <p className='text font-bold'>Ranomerut</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>TANGGAL LAHIR</label>
              <p className='text font-bold'>2003-11-15</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>STATUS MENIKAH</label>
              <p className='text font-bold'>Menikah</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>PERTAMA DAFTAR</label>
              <p className='text font-bold'>2023-10-23</p>
            </div>
          </div>
          {/*  */}
          <div className='pt-3'>
            <label className='text font-light'>Data Riwayat</label>
          </div>
          <div className='flex gap-16'>
            <div>
              <label className='font-bold text-gray-400 text-xs'>NO RAWAT</label>
              <p className='text font-bold'>2023/10/03/000374</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>NO REGISTRASI</label>
              <p className='text font-bold'>020</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>TANGGAL REGISTRASI</label>
              <p className='text font-bold'>2023-10-23</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>UNIT POLIKLINIK</label>
              <p className='text font-bold'>2023-10-23</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>DOKTER</label>
              <p className='text font-bold'>DR. JANE DOE</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>PENJAMIN</label>
              <p className='text font-bold'>BPJS</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>STATUS</label>
              <p className='text font-bold'>RAWAT INAP</p>
            </div>
            <div>
              <label className='font-bold text-gray-400 text-xs'>PEMERIKSAAN</label>
              <p className='text font-bold'>-</p>
            </div>
          </div>
          <div className='pt-3'>
            <label className='label-text font-light'>DIAGNOSA/PENYAKIT/ICD 10</label>
          </div>
          <div className='w-full h-36  outline outline-1 rounded-xl outline-slate-400'>
            <div className='overflow-x-auto'>
              <table className='table'>
                {/* head */}
                <thead>
                  <tr>
                    <th>Kode</th>
                    <th>Nama Penyakit</th>
                    <th>Prioritas</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <label className='label-text font-light'>PEMERIKSAAN</label>
          </div>
          {/* Bisa lebih dari dua, map lagi */}
          <div>
            <div className='flex gap-8 text-sm mb-5'>
              <div>
                <label className='label-text font-light'>Rawat Jalan</label>
              </div>
              <div className='grid'>
                <div className='flex gap-8'>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Jam</label>
                    <p className='font-bold'>020</p>
                  </div>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Suhu(C)</label>
                    <p className='font-bold'>36</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Tensi(mmHg)</label>
                    <p className='font-bold'>121///78</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Nadi(/menit)</label>
                    <p className='font-bold'>69</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>RR(/menit)</label>
                    <p className='font-bold'>-</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Tinggi(Cm)</label>
                    <p className='font-bold'>-</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Berat(/Kg)</label>
                    <p className='font-bold'>-</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>GCS(E,V,M)</label>
                    <p className='font-bold'>3, 5, 6</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>SPO2</label>
                    <p className='font-bold'>90</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Alergi</label>
                    <p className='font-bold'>-</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Kesadaran</label>
                    <p className='font-bold'>Compos Mentis</p>
                  </div>
                </div>
                <div className='flex gap-8 mt-3'>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Subjek</label>
                    <p className='font-bold'>Nyeri +</p>
                  </div>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Objek</label>
                    <p className='font-bold'>-</p>
                  </div>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Assessment</label>
                    <p className='font-bold'>Post Herpetika</p>
                  </div>
                </div>
                <div className='flex gap-8 mt-3'>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Plan</label>
                    <p className='font-bold'>
                      Ibuprofen 3x400 mg Omeprazole 2x20 mg ac Lapibal 1x500 ug Gabapentin 3x300
                      Resep : Ibuprofen 400 mg Jumlah 21 Aturan Pakai 3x1 tab Omeprazole 20 mg tab
                      Jumlah 14 Aturan Pakai 2x1 kaps Lapibal 500 mg Kapsul* Jumlah 7 Aturan Pakai
                      1x1 kaps GABAPENTIN 300 MG Jumlah 21 Aturan Pakai
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='pb-6'>
            <div className='flex gap-8 text-sm mb-5'>
              <div>
                <label className='label-text font-light'>Rawat Jalan</label>
              </div>
              <div className='grid'>
                <div className='flex gap-8'>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Jam</label>
                    <p className='font-bold'>020</p>
                  </div>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Suhu(C)</label>
                    <p className='font-bold'>36</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Tensi(mmHg)</label>
                    <p className='font-bold'>121///78</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Nadi(/menit)</label>
                    <p className='font-bold'>69</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>RR(/menit)</label>
                    <p className='font-bold'>-</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Tinggi(Cm)</label>
                    <p className='font-bold'>-</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Berat(/Kg)</label>
                    <p className='font-bold'>-</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>GCS(E,V,M)</label>
                    <p className='font-bold'>3, 5, 6</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>SPO2</label>
                    <p className='font-bold'>90</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Alergi</label>
                    <p className='font-bold'>-</p>
                  </div>
                  <div>
                    <label className='font-bold text-gray-400 text-xs'>Kesadaran</label>
                    <p className='font-bold'>Compos Mentis</p>
                  </div>
                </div>
                <div className='flex gap-8 mt-3'>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Subjek</label>
                    <p className='font-bold'>Nyeri +</p>
                  </div>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Objek</label>
                    <p className='font-bold'>-</p>
                  </div>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Assessment</label>
                    <p className='font-bold'>Post Herpetika</p>
                  </div>
                </div>
                <div className='flex gap-8 mt-3'>
                  <div className='col-span-1'>
                    <label className='font-bold text-gray-400 text-xs'>Plan</label>
                    <p className='font-bold'>
                      Ibuprofen 3x400 mg Omeprazole 2x20 mg ac Lapibal 1x500 ug Gabapentin 3x300
                      Resep : Ibuprofen 400 mg Jumlah 21 Aturan Pakai 3x1 tab Omeprazole 20 mg tab
                      Jumlah 14 Aturan Pakai 2x1 kaps Lapibal 500 mg Kapsul* Jumlah 7 Aturan Pakai
                      1x1 kaps GABAPENTIN 300 MG Jumlah 21 Aturan Pakai
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <label className='font-bold text-gray-400 text-xs'>TINDAKAN PERAWATAN</label>
          <div className='w-full h-full p-1 outline outline-1 rounded-xl outline-slate-400 mb-5'>
            <div className='flex'>
              <div className='w-24 font-light text-xs font-inter'>
                <p>TINDAKAN RAWAT JALAN DOKTER</p>
              </div>
              <div className='flex justify-between w-full'>
                <div className='flex gap-7'>
                  <div className='space-y-5'>
                    <label className='label-text'>Tanggal</label>
                    <p className='font-bold'>2023-10-03 06:32:02</p>
                  </div>
                  <div className='space-y-5'>
                    <label className='label-text'>KODE</label>
                    <p className='font-bold'>J9080R3</p>
                  </div>
                  <div className='space-y-5'>
                    <label className='label-text'>NAMA TINDAKAN PERAWATAN</label>
                    <p className='font-bold'>Periksa Poliklinik Syaraf</p>
                  </div>
                </div>
                <div className='space-y-5'>
                  <label className='label-text'>DOKTER</label>
                  <p className='font-bold'>Dr. Leonard Petter</p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-full p-1 outline outline-1 rounded-xl outline-slate-400 mb-3'>
            <div className='flex'>
              <div className='w-24 font-light text-xs font-inter'>
                <p>TINDAKAN RAWAT JALAN DOKTER</p>
              </div>
              <div className='flex justify-between w-full'>
                <div className='flex gap-7'>
                  <div className='space-y-5'>
                    <label className='label-text'>Tanggal</label>
                    <p className='font-bold'>2023-10-03 06:32:02</p>
                  </div>
                  <div className='space-y-5'>
                    <label className='label-text'>KODE</label>
                    <p className='font-bold'>J9080R3</p>
                  </div>
                  <div className='space-y-5'>
                    <label className='label-text'>NAMA TINDAKAN PERAWATAN</label>
                    <p className='font-bold'>Periksa Poliklinik Syaraf</p>
                  </div>
                </div>
                <div className='space-y-5'>
                  <label className='label-text'>DOKTER</label>
                  <p className='font-bold'>Dr. Leonard Petter</p>
                </div>
              </div>
            </div>
          </div>

          <label className='font-bold text-gray-400 text-xs'>TINDAKAN PERAWATAN</label>
          <div className='w-full h-full outline outline-1 rounded-xl outline-slate-400 '>
            <div className='flex'>
              <div className='flex w-full'>
                <div className='flex min-w-max gap-56'>
                  <div className=''>
                    <label className='label-text-alt'>Tanggal</label>
                    <p className='font-bold'>2023-10-03 06:32:02 Ralan</p>
                  </div>
                  <div className=''>
                    <label className='label-text-alt'>Detail resep</label>
                    <p className='font-semibold'>NAMA OBAT</p>
                    <p>LOREM 1</p>
                    <p>LOREM 2</p>
                    <p>LOREM 3</p>
                    <p>LOREM 4</p>
                  </div>
                  <div className=''>
                    <label className='label-text-alt'>.</label>
                    <p className='font-bold'>JUMLAH</p>
                    <p>5</p>
                    <p>3</p>
                    <p>8</p>
                    <p>10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
