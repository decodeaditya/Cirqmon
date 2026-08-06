import React, { useEffect, useRef, useState } from 'react'
import runSimulator from '../algorithms/simulator'
import Tooltip from '../components/Tooltip'
import alienFace from '../assets/icons/alienFace.webp'
import stateVectorSimplifer from '../algorithms/stateVectorParse'
import { canvasToJSON, exportToCode } from '../algorithms/utils'
import { ExecuteCircuitModal } from '../blocks/ExecuteCircuitModal'

const ExecuteCircuit = ({ circuit }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pythonCode, setCode] = useState("#nothing in console")
    const [dataToRender, setData] = useState([])

    const executeButtonClicked = async () => {

        const { circuitInstructions, maxQubits } = canvasToJSON(circuit)
        const code = exportToCode(maxQubits, circuitInstructions)

        const isBigEndian = false;
        const stateVector = await runSimulator(maxQubits, circuitInstructions, isBigEndian)
        const { parsedStateVector, QsphereData } = stateVectorSimplifer(stateVector)

        setData({ parsedStateVector, QsphereData })

        setCode(code)
        setIsModalOpen(!isModalOpen)

    }

    return (
        <div className="absolute bottom-8 right-10">

            <Tooltip text="Execute Circuit" isRight={false}>
                <ExecuteButton whenClicked={executeButtonClicked} />
            </Tooltip>

            {isModalOpen &&
                <ExecuteCircuitModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(!isModalOpen)}
                    qiskitCode={pythonCode}
                    dataToRender={dataToRender} />
            }
        </div>
    )
}

const ExecuteButton = ({ whenClicked }) => {

    return (
        <button
            onClick={whenClicked}
            className="cursor-pointer disabled:cursor-not-allowed select-none border-none bg-transparent p-0"
        >
            <div className="w-30 h-30 bg-slate-600 rounded-full relative shadow-md/100 transition-all
             duration-200 flex items-center justify-center  hover:-rotate-360 hover:scale-50">

                <div className={` group absolute rounded-2xl left-1/2 -translate-x-1/2 top- z-20 flex items-center justify-center`}>
                    <div className="w-20 fill-blue-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)] flex items-center justify-center p-1">
                        <img src={alienFace} alt="Execute Button" />
                    </div>
                </div>

            </div>
        </button>
    )
}

export default ExecuteCircuit