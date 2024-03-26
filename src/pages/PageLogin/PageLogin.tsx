import { ArrowRightIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { spesificError } from '../../utils/ToastInfo'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api/config.api'
import { ToastContainer } from 'react-toastify'
import { dateNow } from '../../utils/DateNow'

export default function PageLogin() {
  // const [isChecked, setIsChecked] = useState(false)
  const tglSkrng = dateNow()
  const [isPasswordVisible, setIstPasswordVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginUser = async () => {
    try {
      const response = await fetch('http://rsudsamrat.site:8901/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()
      if (response.ok) {
        if (data.message === 'No match found in petugas or dokter.') {
          spesificError({ errMessage: 'AKUN TIDAK DITEMUKAN' })
        } else {
          localStorage.setItem('token', JSON.stringify(data))
          navigate('/dashboard')
          console.log('Response from backend:', data)
          const fetchJadwal = async () => {
            const tokenString = localStorage.getItem('token')
            const token = JSON.parse(tokenString)
            const kdDokter = token?.dokter?.kd_dokter
            localStorage.setItem('tglSkrng', tglSkrng)
            localStorage.setItem('PoliString', '')
            try {
              const response = await api.get(
                `http://rsudsamrat.site:8901/api/v1/getJadwalDokter?kdDokter=${kdDokter}`,
              )
              const kode = response.data
              localStorage.setItem('kd_poli', JSON.stringify(kode))
              console.log('data kode dokter', kode)
            } catch (err) {
              console.log('login err', err)
            }
          }
          fetchJadwal()
        }
      } else {
        spesificError({ errMessage: 'AKUN TIDAK DITEMUKAN' })
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  // const handleCheck = () => {
  //   setIsChecked(!isChecked)
  // }

  const handlePassword = () => {
    setIstPasswordVisible(!isPasswordVisible)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      loginUser()
    }
  }
  const handleKeyPressUserName = (event) => {
    if (event.key === 'Enter') {
      spesificError({ errMessage: 'Mohon Masukan Password' })
    }
  }

  return (
    <div className='hero min-h-screen'>
      <div className='hero-content'>
        <div className='card h-[500px] max-w-lg bg-slate-100 border-[3px] border-[#C9C9C95C] backdrop-blur'>
          <div className='card-body max-w-7xl'>
            <img src='/assets/images/LOGORSREVISI4.png' alt='Logo' className='w-32 h-24 mx-auto' />
            <h1 className='mt-4 text-5xl font-bold text-center text-primary '>SIMRS</h1>
            <p className='grow-0 mb-8 text-xs text-center text-[#2D2D2D]'>
              Login menggunakan username dan password yang disediakan
            </p>
            <div className='form-control'>
              <input
                type='text'
                placeholder='Username'
                className='mb-5 px-1 input-xs bg-transparent border-b-[#2D2D2D80] border-b-[1px] text-[10px] focus:outline-none'
                required
                value={username}
                onChange={handleChangeUsername}
                onKeyPress={handleKeyPressUserName}
              />
              <div className='flex px-0 border-b-[1px] border-b-[#2D2D2D80] items-center'>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder='Password'
                  className='flex-1 px-1 input-xs bg-transparent text-[10px] focus:outline-none'
                  required
                  value={password}
                  onChange={handleChangePassword}
                  onKeyPress={handleKeyPress}
                />
                <button className='p-0 bt border-none text-[#8B8B8B]' onClick={handlePassword}>
                  {isPasswordVisible ? (
                    <EyeIcon className='w-4' />
                  ) : (
                    <EyeSlashIcon className='w-4' />
                  )}
                </button>
              </div>
            </div>
            <button
              className='mb-5 p-0 btn w-full bg-primary text-white h-[50px] mt-5 rounded-xl border-0 hover:bg-dark'
              onClick={loginUser}
            >
              <span className='flex items-center gap-5'>
                Login <ArrowRightIcon className='w-5' />
              </span>
            </button>
            <p className='grow-0 absolute bottom-5 self-center text-[15px] text-slate-400'>
              © 2023 UPTIRS RSUD Sam Ratulangi Tondano
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
