import { useState } from 'react'
import QSphere from '../tools/QSphere'
import Switch from "../components/Switch"
import Tooltip from '../components/Tooltip'

export const ExecuteCircuitModal = ({ onClose, qiskitCode, dataToRender, isBigEndian, setBigEndian, isFocused }) => {
    const [copied, setCopied] = useState(false)
    const { parsedStateVector, QsphereData } = dataToRender

    const boxLeftBorders = `
  rounded-tr-[10px_225px] 
  rounded-br-[255px_15px] 
  rounded-bl-[1px_225px]
  rounded-tl-[5px_225px]`

    const boxRightBorders = `
  rounded-tl-[6px_225px] 
  rounded-br-[255px_15px] 
  rounded-bl-[15px_225px]
  rounded-tr-[25px_10px]`

    const copyCode = () => {
        navigator.clipboard.writeText(qiskitCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const yLabels = [100, 75, 50, 25, 0]
    const activeStateCount = QsphereData.length

    const [showQSphere, setQSphere] = useState(true)

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm select-none">
            <div className='w-full h-full flex flex-col overflow-hidden'>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        <h2 className="font-black text-xl tracking-tight text-white uppercase">Circuit Results and Code</h2>
                    </div>

                    <div className="flex gap-4 flex-row items-center">
                        <Tooltip text='Choose between Little and Big Endian' isRight={false} textWrap>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-white">Big Endian</p>
                                <Switch isBigEndian={isBigEndian} setBigEndian={setBigEndian} />
                            </div>
                        </Tooltip>

                        <Tooltip text="Back to Canvas!" isRight={false}>
                            <button onClick={onClose} className="bg-slate-300 text-slate-900  px-4 py-2 font-black text-sm
                                        hover:scale-95 transition active:scale-90 cursor-pointer">
                                Back
                            </button>
                        </Tooltip>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-0 overflow-hidden">

                    {/* Left Box  */}
                    <div className={`flex flex-col gap-3 rounded-2xl text-white p-6 m-2 overflow-hidden 
                        min-h-0 ${boxLeftBorders} shadow-[8px_9px_0_#78350f,14px_15px_0_rgba(2,6,23,0.22)]
                        bg-amber-100`}>

                        <div className="flex justify-between items-end pb-2">
                            <div className='flex flex-col'>
                                <span className="text-md font-black text-red-900">
                                    {showQSphere ? "Q Sphere Visualization" : "Qiskit Code"}
                                </span>
                                <span className="text-xs font-black text-red-900/60">
                                    {showQSphere ? "Helps you visualise the Circuit" : "Try running it on Python!"}
                                </span>
                            </div>
                            <div>
                                {!showQSphere &&
                                    <button
                                        onClick={copyCode}
                                        className="bg-yellow-300/70 text-black text-[13px] text-yellow-900 font-bold px-3 py-1
                                         border border-black/10 cursor-pointer"
                                    >
                                        {copied ? 'Copied!' : 'Copy Code'}
                                    </button>
                                }

                                <button className='bg-yellow-400/50 text-black text-xs text-yellow-800 font-bold px-3 py-1
                                         border border-black/10 cursor-pointer ml-2 text-[13px]'
                                    onClick={() => { setQSphere(!showQSphere) }}
                                >
                                    {showQSphere ? "Circuit Code" : 'Show Q Sphere'}
                                </button>
                            </div>
                        </div>

                        <div className={`flex-1 min-h-0 overflow-hidden shadow-[4px_4px_0_#2d2e2d]
`}>
                            {showQSphere ? <QSphere nodesData={QsphereData} /> :
                                <div className="bg-black h-full overflow-hidden"
                                >
                                    <p className="h-full text-sm text-green-400 overflow-y-auto p-5  
                                    leading-relaxed whitespace-pre-wrap select-text codePart"
                                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#404040 transparent' }}
                                    >
                                        {qiskitCode || "# start building to see code"}
                                    </p>
                                </div>
                            }
                        </div>
                    </div>

                    {/* Right Box */}
                    <div className={`flex flex-col text-white rounded-2xl min-h-0 overflow-hidden p-6 m-2 gap-4 
                    ${boxRightBorders}  shadow-[8px_9px_0_#7c2d12,14px_15px_0_rgba(2,6,23,0.15)]
                        bg-orange-200`}>

                        <div className="flex justify-between items-end pb-2">
                            <div className='flex flex-col'>
                                <span className="text-md font-black text-orange-900">
                                    Probabilty Graph
                                </span>
                                <span className="text-xs font-black text-orange-900/60">
                                    Check out possible states and probabilties 
                                </span>
                            </div>
                            <span className="font-black text-orange-800">
                                ({activeStateCount} Active State{activeStateCount !== 1 ? 's' : ''})
                            </span>
                        </div>

                        {/* Histogram  */}
                        <div className="relative w-full h-full flex min-h-100 bg-white/40 backdrop-blur-3xl p-6 gap-4
                         shadow-sm border border-white/40">

                            {/* Labels */}
                            <div className="flex flex-col justify-between h-[calc(100%-4rem)] text-xs text-gray-500 font-medium">
                                {yLabels.map((percentage, i) => (
                                    <span key={i}>{percentage}%</span>
                                ))}
                            </div>

                            <div className="relative flex-1 flex flex-col h-full overflow-hidden">
                                {/* axis lines */}
                                <div className="absolute top-0 left-0 right-0 h-[calc(100%-4rem)] flex flex-col justify-between pointer-events-none z-0">
                                    {yLabels.map((val) => (
                                        <div key={`grid-${val}`} className="w-full border-t border-gray-400/40 border-dashed" />
                                    ))}
                                </div>

                                {/* graph */}
                                <div className="relative z-10 flex gap-8 overflow-x-auto h-full items-end pb-1
                                scrollbar-thin scrollbar-thumb-gray-300/50">

                                    {parsedStateVector.map(({ stateName, probability }) => {
                                        const probPercent = (probability * 100).toFixed(1);

                                        return (
                                            <div key={stateName} className="flex flex-col items-center h-full shrink-0 group">
                                                <div className="w-10 h-[calc(100%-3.5rem)] bg-white/40
                                                overflow-hidden flex items-end border border-white/50">
                                                    <div title={`|${stateName}⟩: ${probPercent}% Possibility`}
                                                        className="bg-linear-to-t from-blue-400/90 to-blue-400/90 transition-all duration-100 ease-out w-full rounded
                                                             shadow-sm group-hover:from-yellow-500/90 group-hover:to-yellow-400/90 cursor-pointer border-2 border-black/20"
                                                        style={{ height: `${probPercent}%` }}
                                                    />
                                                </div>

                                                {/* X axis Probability */}
                                                <div className="flex flex-col items-center justify-start h-14 pt-3 gap-1">

                                                    <span className="bg-gray-800/80 backdrop-blur-md text-white text-[10px] 
                                                        px-2 py-0.5 rounded shadow-sm">
                                                        |{stateName}⟩
                                                    </span>
                                                    <span className="flex flex-col items-center leading-tight">
                                                        <span className="text-[10px] font-semibold text-gray-600/90">{probPercent}%</span>
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
