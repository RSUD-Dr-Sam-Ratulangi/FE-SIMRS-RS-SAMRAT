import React from 'react'

const toastInfo = ({ toastMessage, onClose }) => {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onClose()
    }, 2000) // 2000 milliseconds (2 seconds)

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeout)
  }, [onClose])

  return (
    <div className='toast toast-top toast-center'>
      <div className='alert alert-info'>
        <span>{toastMessage}</span>
      </div>
    </div>
  )
}

export default toastInfo
