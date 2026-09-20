import { useState } from 'react'
import QuantumGate from '../components/QuantumGate'
import gates from '../data/gatesWiki'
import GatesInfo from './GateInfomation'
import Tooltip from '../components/Tooltip'
import { motion } from 'framer-motion'
import rabbit from '../assets/icons/Rabbit.gif'
import owl from '../assets/icons/Owl.gif'

const GatesTray = () => {
  const [inspectedGate, setInspectedGate] = useState(null)
  const [isTrayOpen, setIsTrayOpen] = useState(false)

  const gateClicked = (gateId) => {
    const gate = gates.find((g) => g.id === gateId)
    setInspectedGate(gate)
  }

  const onCloseGateWiki = () => {
    setInspectedGate(null)
  }

  const roughBorders = `
  rounded-tr-[15px_225px] 
  rounded-br-[255px_15px] 
  rounded-bl-[15px_225px]
  rounded-tl-[255px_5px]
  `

  return (
    <div className="w-full flex flex-col items-end">

      <div className="w-full flex justify-end">
        <Tooltip text={isTrayOpen ? "Close Gates Tray" : "Open Gates Tray"} isRight={false}>
          <button
            onClick={() => setIsTrayOpen(!isTrayOpen)}
            className={`${isTrayOpen ? 'w-20 h-20' : 'w-30 h-30'} relative ${isTrayOpen ? 'rounded-[48%_52%_42%_58%/55%_42%_58%_45%]' : 'rounded-[78%_62%_54%_46%/45%_55%_40%_60%]'} 
                          transition-all duration-150 cursor-pointer pointer-events-auto backdrop-blur shadow-[3px_1px_0_#020617] border-3 ${isTrayOpen ? 'border-slate-400' : 'border-olive-500'}
                           ${isTrayOpen ? 'bg-slate-400' : 'bg-olive-400'}`}
          >
            <motion.img
              src={isTrayOpen ? rabbit : owl}
              alt="Toggle Tray"
              className={`transition-transform duration-300 p-2 ${isTrayOpen ? 'rotate-12 scale-80' : 'rotate-0 scale-70'}`}
            />
          </button>
        </Tooltip>
      </div>

      <div className='flex flex-col items-end w-full'>
        {isTrayOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 40 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}

            className={`bg-blue-300 pointer-events-auto shadow-2xl h-min mt-2 px-8 pb-5 w-fit ${roughBorders}
            shadow-[6px_6px_0_#312e81,12px_12px_0_rgba(0,0,0,0.15)]`}>
            <div className="pt-5 text-center flex flex-col justify-center text-center mb-2">
              <span className='font-bold text-black/90 m-auto text-xl tracking-tight'>Quantum Gates</span>
              <span className='font-bold mb-2 text-black/80 text-sm tracking-tight'>Tap to learn or Drag to try!</span>
            </div>

            <div className={`grid grid-cols-3 md:grid-cols-4 place-items-center gap-y-4 -rotate-1 gap-12 bg-red-300/90 p-6 px-10 border-3 border-red-500/50 ${roughBorders}
            shadow-[4px_4px_0_#7f1d1d,inset_0_1px_0_rgba(255,255,255,0.35)]`}>
              {gates.slice(0, 6).map((g) => (
                <QuantumGate
                  key={g.id}
                  g={g}
                  gateClicked={() => gateClicked(g.id)}
                />
              ))}
              <div className="col-span-full w-full" />
              {gates.slice(6).map((g) => (
                <QuantumGate
                  key={g.id}
                  g={g}
                  gateClicked={() => gateClicked(g.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <GatesInfo
        inspectedGate={inspectedGate}
        onCloseGateWiki={onCloseGateWiki}
      />
    </div>
  )
}

export default GatesTray
