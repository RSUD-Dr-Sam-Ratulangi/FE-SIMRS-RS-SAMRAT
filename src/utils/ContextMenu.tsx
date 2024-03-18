export {}

import React, { useState } from 'react'

const ContextMenu = ({
  options,
  onOptionClick,
}: {
  options: string[]
  onOptionClick: (option: string) => void
}) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setMenuPosition({ x: e.clientX, y: e.clientY })
    setMenuVisible(true)
  }

  const handleCloseMenu = () => {
    setMenuVisible(false)
  }

  const handleOptionClick = (option: string) => {
    onOptionClick(option)
    handleCloseMenu()
  }

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {menuVisible && (
        <div
          style={{
            position: 'absolute',
            top: menuPosition.y,
            left: menuPosition.x,
            background: '#fff',
            border: '1px solid #ccc',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {options.map((option, index) => (
              <li key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ContextMenu
