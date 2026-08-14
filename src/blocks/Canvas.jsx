import React from 'react'
import CircuitBox from '../tools/CircuitBox'
import ExecuteCircuit from '../tools/ExecuteCircuit'

const Canvas = ({ circuit, setCircuit, removeGate }) => {
    return (
        <>
            <div className={`h-[90%] w-full max-w-[68%] text-select overflow-auto relative bg-white/20 backdrop-blur-3xl z-100 rounded-4xl transition-all shadow-[0px_2px_4px_0px_rgba(14,30,37,0.12),0px_2px_16px_0px_rgba(14,30,37,0.32)]`}
                style={{
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
                }}
            >
                <CircuitBox circuit={circuit} setCircuit={setCircuit} removeGate={removeGate} />
            </div>

            <ExecuteCircuit circuit={circuit} />
        </>
    )
}

export default Canvas
