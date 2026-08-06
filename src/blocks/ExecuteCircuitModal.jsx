import React, { useEffect, useRef, useState } from 'react'
import QSphere from '../tools/QSphere'

export const ExecuteCircuitModal = ({ isOpen, onClose, qiskitCode, dataToRender }) => {

    const [copied, setCopied] = useState(false)
    const { parsedStateVector, QsphereData } = dataToRender

    const copyCode = () => {
        navigator.clipboard.writeText(qiskitCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const yLabels = [100, 75, 50, 25, 0]
    const activeStateCount = QsphereData.length

    const [showQSphere, setQSphere] = useState(true)

    return (
        <div style={{ top: isOpen ? "-100" : "0" }} className="fixed inset-0 z-99999 bg-black/90 flex backdrop-blur-sm items-center justify-center select-none animate-in fade-in duration-150 h-screen overflow-hidden">
            <div className='w-full h-full flex flex-col overflow-hidden'>
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        <h2 className="font-black text-xl tracking-tight text-white uppercase">Circuit Results and Code</h2>
                    </div>
                    <button onClick={onClose} className="bg-slate-300 text-slate-900 rounded-xl p-2 font-black text-sm sm:text-base flex items-center
                     gap-2 transition-all duration-150 shadow-md/100 hover:scale-95 active:shadow-[0_0px_0_0_#008B8B,0_0px_0_0_#0f172a] cursor-pointer">
                        Back
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-0 overflow-hidden">
                    {/* Code and Sphere Part  */}
                    <div className="p-6 flex flex-col gap-3 bg-indigo-200 text-white m-2 rounded-2xl min-h-0 overflow-hidden">
                        <div className="flex justify-between items-center border-b-2 border-black/10 pb-2">
                            <span className="font-mono text-xs font-bold text-gray-900 uppercase ">{showQSphere ? "Q Sphere Visualization" : "Qiskit Code"}</span>
                            <div>
                                {!showQSphere &&
                                    <button
                                        onClick={copyCode}
                                        className="px-3 py-1 bg-black/80 rounded-2xl hover:bg-[#3F3F46] border border-gray-600 text-xs font-mono font-bold 
                                transition-colors cursor-pointer text-white"
                                    >
                                        {copied ? 'COPIED!' : 'COPY CODE'}
                                    </button>
                                }
                                <button className='bg-black/70 px-3 py-1 rounded-3xl border border-black/10 text-xs backdrop-blur-3xl cursor-pointer ml-2 font-bold' onClick={() => { setQSphere(!showQSphere) }}>
                                    {showQSphere ? "Circuit Code" : 'Show Q Sphere'}
                                </button>
                            </div>
                        </div>

                     <div className="flex-1 min-h-0 overflow-hidden rounded-4xl">
                        {showQSphere ? <QSphere nodesData={QsphereData} /> :
                            <div className="bg-black/90 h-full overflow-hidden rounded-4xl shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),0_8px_24px_-4px_rgba(0,0,0,0.7)]"
                            >
                              <div className="p-5 rounded-4xl codePart h-full overflow-y-auto text-sm text-green-400 leading-relaxed whitespace-pre-wrap font-mono" style={{ scrollbarWidth: 'thin', scrollbarColor: '#404040 transparent'}}>
                                {qiskitCode || "# start building to see code"}
                              </div>
                            </div>
                        }
                     </div>
                    </div>

                    {/* Result Part */}
                    <div className="p-6 flex flex-col gap-4 bg-blue-200 text-white m-2 rounded-2xl min-h-0 overflow-hidden">
                        <div className="flex justify-between items-end border-b-2 border-black/10 pb-2">
                            <span className="font-black text-sm uppercase text-black">Probability of Qutbit States</span>
                            <span className="font-mono text-xs font-bold text-gray-800">{activeStateCount} Active State{activeStateCount !== 1 ? 's' : ''}</span>
                        </div>
                        {/* Histogram  */}
                        <div className="relative w-full h-full min-h-100 bg-white/40 backdrop-blur-3xl rounded-4xl p-6 flex gap-4 shadow-sm border border-white/40">
                            {/* Y axis */}
                            <div className="flex flex-col justify-between h-[calc(100%-3.5rem)] text-xs text-gray-500/70 font-medium z-10">
                                {yLabels.map((percentage, i) => (
                                    <span key={i}>{percentage}%</span>
                                ))}
                            </div>
                            <div className="relative flex-1 flex flex-col h-full overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-[calc(100%-3.5rem)] flex flex-col justify-between pointer-events-none z-0">
                                    {yLabels.map((val) => (
                                        <div key={`grid-${val}`} className="w-full border-t border-gray-400/20 border-dashed" />
                                    ))}
                                </div>
                                {/* Bars */}
                                <div className="relative z-10 flex gap-8 overflow-x-auto h-full items-end pb-1 
                                scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-track-transparent">
                                    {parsedStateVector.length === 0 ? (
                                        <div className="text-gray-400 font-mono text-sm w-full text-center self-center pb-16">
                                            Zero states measured.
                                        </div>
                                    ) : (
                                        parsedStateVector.map(({ stateName, probability }) => {
                                            const probPercent = (probability * 100).toFixed(1);
                                            return (
                                                <div key={stateName} className="flex flex-col items-center h-full shrink-0 group">
                                                    <div className="w-10 h-[calc(100%-3.5rem)] bg-white/30 rounded-2xl overflow-hidden flex items-end shadow-inner border border-white/60 relative backdrop-blur-sm">
                                                        <div
                                                            className="bg-linear-to-t from-red-400/90 to-red-300/90 transition-all duration-700 ease-out w-full rounded-t-2xl
                                                             shadow-sm group-hover:from-red-500/90 group-hover:to-red-400/90"
                                                            style={{ height: `${probPercent}%` }}
                                                        />
                                                    </div>
                                                    {/* X axis Probability */}
                                                    <div className="flex flex-col items-center justify-start h-14 pt-3 gap-1">
                                                        <span className="bg-gray-800/80 backdrop-blur-md text-white text-[10px] 
                                                        px-2 py-0.5 rounded shadow-sm font-mono tracking-wider">
                                                            |{stateName}⟩
                                                        </span>
                                                        <span className="flex flex-col items-center leading-tight">
                                                            <span className="text-[10px] font-semibold text-gray-600/90">{probPercent}%</span>
                                                            <span className="text-[9px] text-gray-400 font-normal">({probability})</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
