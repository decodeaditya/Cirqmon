import { memo } from 'react'
import CircuitBox from '../tools/CircuitBox'

const Canvas = ({ circuit, setCircuit, removeGate }) => {

const roughBorders = `
rounded-tr-[280px_14px] 
rounded-br-[18px_130px] 
rounded-bl-[30px_20px]
rounded-tl-[15px_290px]
  `

    return (
        <>
            <div className={`h-full w-full text-select relative bg-orange-200 backdrop-blur-3xl transition-all 
             scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent ${roughBorders} flex items-center justify-center
             shadow-[8px_9px_0_#78350f,14px_15px_0_rgba(2,6,23,0.22)]`}
            >
                <div className={`bg-gray-200 inset-0 absolute m-5 ${roughBorders} overflow-auto shadow-[4px_4px_0_#7f1d1d,inset_0_1px_0_rgba(255,255,255,0.35)] -rotate-[0.3deg]`}>
                    <CircuitBox
                        circuit={circuit}
                        setCircuit={setCircuit}
                        removeGate={removeGate} />
                </div>
            </div>
        </>
    )
}

export default memo(Canvas)
