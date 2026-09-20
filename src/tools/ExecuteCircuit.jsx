import { useEffect, useState } from 'react'
import runSimulator from '../algorithms/simulator'
import Tooltip from '../components/Tooltip'
import cow from '../assets/icons/cow.gif'
import stateVectorSimplifer from '../algorithms/stateVectorParse'
import { canvasToJSON, exportToCode } from '../algorithms/utils'
import { ExecuteCircuitModal } from '../blocks/ExecuteCircuitModal'

const ExecuteCircuit = ({ circuit, isFocused }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pythonCode, setCode] = useState("#nothing in console")
    const [dataToRender, setData] = useState([])
    const [isBigEndian, setBigEndian] = useState(true)

    const executeCircuit = async () => {
        const { circuitInstructions, maxQubits } = canvasToJSON(circuit)
        const code = exportToCode(maxQubits, circuitInstructions)
        const stateVector = runSimulator(maxQubits, circuitInstructions, isBigEndian)
        const { parsedStateVector, QsphereData } = stateVectorSimplifer(stateVector)

        setData({ parsedStateVector, QsphereData })
        setCode(code)
    }

    const executeAndOpenModal = async () => {
        await executeCircuit()
        setIsModalOpen(true)
    }

    useEffect(() => {
        executeCircuit()
    }, [isBigEndian])

    return (
        <div>
            <Tooltip text="Execute Circuit" isRight={false}>
                <ExecuteButton whenClicked={executeAndOpenModal} isFocused={isFocused} />
            </Tooltip>
            {isModalOpen &&
                <ExecuteCircuitModal
                    onClose={() => setIsModalOpen(!isModalOpen)}
                    qiskitCode={pythonCode}
                    dataToRender={dataToRender}
                    isBigEndian={isBigEndian}
                    setBigEndian={setBigEndian}
                    isFocused={isFocused}
                />
            }
        </div>
    )
}

const ExecuteButton = ({ whenClicked }) => {

const roughBorders = `
  rounded-[55%_52%_42%_58%/55%_49%_58%_45%]
  `

    return (
        <button
            onClick={whenClicked}
            className="cursor-pointer select-none border-none"
        >
            <div className={`w-30 h-30 border-3 border-stone-400 bg-stone-500/80 ${roughBorders} backdrop-blur relative transition-all
             duration-200 flex items-center justify-center hover:-rotate-360 hover:scale-50 shadow-[4px_3px_1px_#020617]`}
            >
                <div className={` group absolute rounded-2xl left-1/2 -translate-x-1/2 top- z-20 flex items-center justify-center`}>
                    <div className="w-20 flex items-center justify-center p-1">
                        <img src={cow} alt="Execute Button" />
                    </div>
                </div>
            </div>
        </button>
    )
}

export default ExecuteCircuit