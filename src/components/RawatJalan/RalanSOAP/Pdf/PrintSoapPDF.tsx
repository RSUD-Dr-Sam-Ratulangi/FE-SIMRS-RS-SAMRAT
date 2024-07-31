import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import logo from '../../../../assets/img/LOGORSREVISI4.png'
import QRCode from 'react-qr-code'
import { renderToString } from 'react-dom/server'
import { Canvg } from 'canvg'
import { api } from '../../../../services/api/config.api'

const PdfComponent = async (noRawat: any, id: any, kdPoli: any, nmPoli: any, dokterNames: any) => {
  let existLab = false
  let existRadiologi = false
  let nmrResep = null
  let obatData = []
  let combinedTableRowsObat = []
  let labData = []
  let combinedTableRowsPenunjang = []
  let tindakanTableRows = []

  try {
    const noResep = await api.get(
      `/api/v1/getPrescriptionNumbers?noRkmMedis=${id}&noRawat=${noRawat}`,
    )

    try {
      const tindakanPasien = await api.get(
        `/api/v1/getRawatJlDrDetailsByNoRawat?noRawat=${noRawat}`,
      )
      console.log('tindakan', tindakanPasien.data)
      tindakanTableRows = [
        `${tindakanPasien.data[0].kd_jenis_prw}`,
        `${tindakanPasien.data[0].nm_perawatan}`,
        '-',
      ]
    } catch (error) {
      console.log('tindakan error', error)
    }

    // cek lab
    try {
      const dataLab = await api.get(`/api/v1/detailPeriksaLab?noRawat=${noRawat}`)
      const dataLabor = dataLab.data

      labData = dataLabor.map((item) => `${item.Pemeriksaan} / ${item.nilai} `)

      if (labData.length > 0) {
        existLab = true
        const labList = labData.length > 0 ? labData.join('\n') : '-'
        console.log('lab', labList)

        combinedTableRowsPenunjang = [['Laboratorium', `Pemeriksaan: \n${labList}`]]
      } else (combinedTableRowsPenunjang = []), (existLab = false)
    } catch (error) {
      console.log('error lab', error)
      existLab = false
    }
    // cek radiologi
    try {
      const checkExistRadiologi = await api.get(`/api/v1/radiology-results?noRawat=${noRawat}`)
      console.log('radiologi', checkExistRadiologi.data)
      if (checkExistRadiologi.data) {
        try {
          const dataRadiologi = await api.get(`/api/v1/radiology-results?noRawat=${noRawat}`)
          const hasilRadiolog = dataRadiologi.data.hasil
          if (hasilRadiolog) {
            combinedTableRowsPenunjang = [['Radiologi', `Pemeriksaan: \n${hasilRadiolog}`]]
          } else {
            combinedTableRowsPenunjang = []
          }
        } catch (error) {
          console.log('error taking data hasil radiologi', error)
        }
        existRadiologi = true
      } else {
        existRadiologi = false
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Resource not found (404). Radiologi')
        existRadiologi = false
      } else {
        console.error('Radiologi, An error occurred:', error)
        existRadiologi = false
      }
    }
    nmrResep = noResep.data[0]
    if (nmrResep) {
      try {
        const dataObat = await api.get(`/api/v1/getResepDokterDetails?noResep=${nmrResep}`)
        console.log('data obat', dataObat.data)
        const obatD = dataObat.data

        obatData = obatD.map((item) => item.nama_brng)

        const obatList = obatData.length > 0 ? obatData.join('\n') : '-'

        combinedTableRowsObat = [[`Nomor Resep : ${nmrResep}`, `List obat: \n${obatList}`]]

        console.log(combinedTableRowsObat)
      } catch (error) {
        console.error('Error fetching medication details:', error)
      }
    } else {
      const combinedTableRows = [['Nomor Resep : -', 'List obat: -']]
      console.log(combinedTableRows)
    }
  } catch (error) {
    console.log('No Resep', error)
  }

  try {
    const data = await api.get(`/api/v1/RiwayatSoapByNoRawat?noRkmMedis=${id}&noRawat=${noRawat}`)
    const dataDiagnosa = await api.get(`/api/v1/getDiagnosaPasien?noRawat=${noRawat}`)
    console.log('data', data.data[0].tgl_perawatan)

    if (data) {
      try {
        const dataId = await api.get(`/api/v1/getPatientData?noRkmMedis=${id}`)
        console.log(dataId)
        if (dataId) {
          const addTitleHead = (doc: any, img: any) => {
            const pageWidth = doc.internal.pageSize.getWidth()
            const namePlace = 'RSUD SAM RATULANGI TONDANO'
            const address = 'JL. SUPRAPTO LUAAN TONDANO TIMUR, Telp: Hp: 0431321171 E-mail: -'
            const location = 'TONDANO, SULAWESI UTARA'

            const textWidth = doc.getTextWidth(namePlace)
            const locationWidth = doc.getTextWidth(location)

            const xOffset = (pageWidth - textWidth) / 1.9
            const addressOffset = (pageWidth - textWidth) / 2.5
            const locationOffset = (pageWidth - locationWidth) / 1.7

            const logoWidth = 30
            const logoHeight = 25
            const logoX = 8
            const logoY = 5.5
            const textY = logoY + logoHeight / 4
            const addressY = textY + 6
            const locationY = addressY + 6

            doc.addImage(img, 'PNG', logoX, logoY, logoWidth, logoHeight)
            doc.text(namePlace, xOffset, textY)
            doc.setFontSize(10)
            doc.text(address, addressOffset, addressY)
            doc.text(location, locationOffset, locationY)

            const lineY = locationY + 10
            doc.setLineWidth(1)
            doc.line(10, lineY, pageWidth - 10, lineY)

            return lineY
          }

          // Below Header
          const belowHeader = (doc, lineY, offset = 10) => {
            doc.setFontSize(15)
            doc.setFont('helvetica', 'bold')
            doc.text('SURAT BUKTI PELAYANAN KESEHATAN (SBPK)', 39, lineY + offset)

            doc.setFontSize(12)
            doc.setFont('helvetica', 'normal')

            const details = [
              `1. Nama Pasien : ${dataId.data.nm_pasien}`,
              `2. No. Rekam Medis : ${dataId.data.no_rkm_medis} `,
              `3. Tanggal Lahir : ${dataId.data.tgl_lahir}`,
              `4. Jenis Kelamin : ${
                dataId.data.jk === 'L'
                  ? 'Laki-Laki'
                  : dataId.data.jk === 'P'
                  ? 'Perempuan'
                  : 'Unknown'
              }`,
              `5. Tanggal Masuk RS : ${data.data[0].tgl_perawatan}`,
              `6. Jam Masuk : ${data.data[0].jam_rawat} `,
            ]

            let yOffset = lineY + offset + 10
            details.forEach((detail) => {
              doc.text(detail, 10, yOffset)
              yOffset += 8
            })

            const pageWidth = doc.internal.pageSize.getWidth()
            const marginRight = 10
            const labelWidth = 40
            const lineMargin = 10

            const labelX = pageWidth - labelWidth - marginRight

            doc.text('Cara Pulang :', labelX, lineY + offset + 10)
            doc.text('-', labelX, lineY + offset + 15)

            doc.text('Jenis Kunjungan :', labelX, lineY + offset + 23)
            doc.text('-', labelX, lineY + offset + 28)

            const squareX = lineMargin
            const squareY = yOffset
            const squareWidth = pageWidth - 2 * lineMargin

            const anamnesaText = `ANAMNESA : ${data.data[0].penilaian}`
            const wrappedText = doc.splitTextToSize(anamnesaText, squareWidth - 6)
            doc.setFontSize(10)

            const lineHeight = 6
            const squareHeight = wrappedText.length * lineHeight + 12

            doc.setDrawColor(0, 0, 0)
            doc.setLineWidth(0.2)
            doc.rect(squareX, squareY, squareWidth, squareHeight)

            let textYOffset = squareY + 6
            wrappedText.forEach((line) => {
              doc.text(line, squareX + 3, textYOffset)
              textYOffset += lineHeight
            })
            doc.setFontSize(12)

            yOffset = squareY + squareHeight + 5

            const firstTableColumns = ['POLIKLINIK', 'DIAGNOSA', 'ICD X']
            const firstTableRows = [
              [
                `${nmPoli}`,
                `${dataDiagnosa.data[0].nm_penyakit ? dataDiagnosa.data[0].nm_penyakit : '-'}`,
                `${dataDiagnosa.data[0].kd_penyakit ? dataDiagnosa.data[0].kd_penyakit : '-'}`,
              ],
            ]

            doc.autoTable({
              startY: yOffset,
              head: [firstTableColumns],
              body: firstTableRows,
              theme: 'grid',
              columnStyles: {
                0: { cellWidth: 30 },
                2: { cellWidth: 70 },
                3: { cellWidth: 20 },
              },
            })

            yOffset = squareY + squareHeight + 35

            if (existLab) {
              const tableColumnsPenunjang = ['PENUNJANG', 'KODE/HASIL']

              doc.autoTable({
                startY: yOffset,
                head: [tableColumnsPenunjang],
                body: combinedTableRowsPenunjang,
                theme: 'grid',
                columnStyles: {
                  0: { cellWidth: 30 },
                  2: { cellWidth: 70 },
                  3: { cellWidth: 20 },
                },
              })

              yOffset = doc.lastAutoTable.finalY + 5
            } else if (existRadiologi) {
              const tableColumnsPenunjang = ['PENUNJANG', 'KODE/HASIL']

              doc.autoTable({
                startY: yOffset,
                head: [tableColumnsPenunjang],
                body: combinedTableRowsPenunjang,
                theme: 'grid',
                columnStyles: {
                  0: { cellWidth: 30 },
                  2: { cellWidth: 70 },
                  3: { cellWidth: 20 },
                },
              })

              yOffset = doc.lastAutoTable.finalY + 5
            } else null

            if (tindakanTableRows.length > 0) {
              const tindakanTableColumns = ['KODE', 'NAMA', 'ICD IX']

              doc.autoTable({
                startY: yOffset,
                head: [tindakanTableColumns],
                body: [tindakanTableRows],
                theme: 'grid',
                columnStyles: {
                  0: { cellWidth: 20 },
                  2: { cellWidth: 70 },
                  3: { cellWidth: 10 },
                },
              })

              yOffset = doc.lastAutoTable.finalY + 5
            } else null

            const secondTableColumns = ['DIAGNOSA', 'KODE ICD X']
            const secondTableRows = dataDiagnosa.data.map((diagnosa: any) => [
              diagnosa.nm_penyakit,
              diagnosa.kd_penyakit,
            ])

            doc.autoTable({
              startY: yOffset,
              head: [secondTableColumns],
              body: secondTableRows,
              theme: 'grid',
              columnStyles: {
                0: { cellWidth: 120 },
                1: { cellWidth: 60 },
              },
            })

            yOffset = doc.lastAutoTable.finalY + 5

            const combinedTableColumns = ['FARMASI', 'OBAT']

            doc.autoTable({
              startY: yOffset,
              head: [combinedTableColumns],
              body: combinedTableRowsObat,
              theme: 'grid',
              columnStyles: {
                0: { cellWidth: 120 },
                1: { cellWidth: 60 },
              },
            })

            return doc.lastAutoTable.finalY + 5
          }

          const doc = new jsPDF()
          const img = new Image()
          img.src = logo

          img.onload = async () => {
            const lineY = addTitleHead(doc, img)
            belowHeader(doc, lineY)

            const qrCodeSvgStringPesertaJkn = renderToString(
              <QRCode value={`${dataId.data.no_rkm_medis}/${dataId.data.nm_pasien}`} size={128} />,
            )
            const qrCodeSvgStringDpjpDokter = renderToString(
              <QRCode value={`${data.data[0].nip}/${dokterNames}`} size={128} />,
            )

            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const pJkn = Canvg.fromString(ctx, qrCodeSvgStringPesertaJkn)
            await pJkn.render()
            const qrCodeImageDataJkn = canvas.toDataURL('image/png')

            const dpjpDokter = Canvg.fromString(ctx, qrCodeSvgStringDpjpDokter)
            await dpjpDokter.render()
            const qrCodeImageDataDpjp = canvas.toDataURL('image/png')

            const qrSize = 15
            const pageHeight = doc.internal.pageSize.getHeight()
            const textYOffset = 3

            const firstQrX = 140
            const firstQrY = pageHeight - qrSize - 5
            doc.setFontSize(12)
            doc.text('DPJP Dokter Pemeriksa', firstQrX - 15, firstQrY - textYOffset)
            doc.addImage(qrCodeImageDataDpjp, 'PNG', firstQrX, firstQrY, qrSize, qrSize)

            const secondQrX = 40
            const secondQrY = pageHeight - qrSize - 5
            doc.text('Peserta JKN', secondQrX - 4, secondQrY - textYOffset)
            doc.addImage(qrCodeImageDataJkn, 'PNG', secondQrX, secondQrY, qrSize, qrSize)

            doc.save(`SBPK_${noRawat}`)
          }
        }
      } catch (err) {
        window.alert(err)
      }
    } else {
      window.alert('ERROR!!!')
    }
  } catch (err) {
    window.alert('ERROR TAKING DATA!!!')
  }
}

export default PdfComponent
