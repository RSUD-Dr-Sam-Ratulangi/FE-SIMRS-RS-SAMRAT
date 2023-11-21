import {
  ArrowRightIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// const dataDummyLogin = {
//   username: 'John doe',
//   password: '123456',
// }

export default function PageLogin() {
  const [isChecked, setIsChecked] = useState(false)
  const [isPasswordVisible, setIstPasswordVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  // const handleLogin = () => {
  //   if (username === '' || password === '') {
  //     console.log('Please fill in both username and password fields.')
  //   } else {
  //     if (username != dataDummyLogin.username && password != dataDummyLogin.password) {
  //       setIsError(true)
  //       console.log(isError)
  //     } else {
  //       navigate('/dashboard')
  //     }
  //   }
  // }

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

      // Check if the login was successful
      if (response.ok) {
        // Save the response data to localStorage
        localStorage.setItem('token', JSON.stringify(data))
        navigate('/dashboard')
        console.log('Response from backend:', data)
      } else {
        // Handle login error
        console.error('Login failed:', data.error)
        setIsError(true)
        console.log(isError)
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  const handleCheck = () => {
    setIsChecked(!isChecked)
  }

  const handlePassword = () => {
    setIstPasswordVisible(!isPasswordVisible)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  return (
    <div className='hero min-h-screen'>
      <div className='hero-content'>
        <div className='card h-[483px] max-w-xs bg-[#C9C9C95C] border-[3px] border-[#C9C9C95C] backdrop-blur'>
          <div className='card-body'>
            <h1 className='mt-4 text-5xl font-bold text-center text-primary '>Hello!</h1>
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
              />
              <div className='flex px-0 border-b-[1px] border-b-[#2D2D2D80] items-center'>
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder='Password'
                  className='flex-1 px-1 input-xs bg-transparent text-[10px] focus:outline-none'
                  required
                  value={password}
                  onChange={handleChangePassword}
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
            <div className='py-2 flex flex-row gap-2 cursor-pointer items-center'>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={handleCheck}
                className='checkbox checkbox-xs h-3 w-3 rounded'
              />
              <span className='text-[10px]'>Remember Me</span>
            </div>
            <button
              className='mb-5 p-0 btn bg-primary text-white h-[50px] w-[50px] rounded-xl border-0 hover:bg-dark'
              onClick={loginUser}
            >
              <ArrowRightIcon className='w-5' />
            </button>
            {isError && (
              <div className='mb-14 flex self-center text-[#D3444A]'>
                <ExclamationCircleIcon className='w-4' />
                <p className='text-xs'>username atau password salah</p>
              </div>
            )}
            <p className='grow-0 absolute bottom-5 self-center text-[10px] text-[#16161626]'>
              © 2022 UPTI RSUD Sam Ratulangi
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div>
  //     PageLogin
  //     <a href='/dashboard' className='btn btn-primary'>
  //       Go To Dashboard
  //     </a>
  //   </div>
  // )
}
