// import React, { forwardRef } from 'react'
// import { useTts } from 'tts-react'
// // eslint-disable-next-line no-duplicate-imports
// import type { TTSHookProps } from 'tts-react'

// interface CustomProps extends TTSHookProps {
//   highlight?: boolean
//   additionalInfo?: string
// }

// // eslint-disable-next-line react/display-name
// const CustomTTSComponent = forwardRef(
//   ({ children = true, lang = 'id-ID', voice, additionalInfo }: CustomProps, ref) => {
//     const { ttsChildren, state, play, stop, pause } = useTts({
//       children,
//       lang,
//       voice,
//       rate: 0.87,
//       volume: 1.5,
//     })

//     const containerRef = () => {
//       if (ref) {
//         if (typeof ref === 'function') {
//           ref({ play, stop, pause })
//         } else {
//           ref.current = { play, stop, pause }
//         }
//       }
//     }

//     return (
//       <div ref={containerRef}>
//         <>
//           <div className='flex gap-5'>
//             <button className='btn' disabled={state.isPlaying} onClick={play}>
//               Play
//             </button>
//             <button className='btn' disabled={!state.isPlaying} onClick={pause}>
//               Pause
//             </button>
//             <button className='btn' onClick={stop}>
//               Stop
//             </button>
//           </div>
//         </>
//         {ttsChildren}
//         {additionalInfo && <p>{additionalInfo}</p>}
//       </div>
//     )
//   },
// )

// export default CustomTTSComponent

const App = () => {
  return (
    <div>
      <p>Hello</p>
    </div>
  )
}

export default App
