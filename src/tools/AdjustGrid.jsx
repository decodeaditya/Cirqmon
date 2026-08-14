import React, { useState } from 'react';
import circuitConfig from '../data/config'

const AdjustGrid = ({ qCount, nCount, addQubit, removeQubit, addNode, removeNode }) => {

    return (
        <>
            <div className="flex items-center justify-between border-b-4 border-black/10 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-black">Edit Circuit</span>
                <span className="font-mono font-black text-xs px-2 py-0.5 bg-white border-2 border-black rounded shadow-sm">
                    {qCount}×{nCount}
                </span>
            </div>

                <div className="flex flex-col gap-1.5">
                    <span className="text-1 font-black uppercase ">Qubits (Y Axis)</span>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => removeQubit()}
                            disabled={qCount <= 1}
                            className="w-10 h-10 bg-red-400 text-white rounded-full font-black text-xl shadow-xs/100 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:grayscale disabled:shadow-none disabled:cursor-not-allowed"
                        >
                            -
                        </button>

                        <div className="flex-1 py-2 bg-black text-white font-mono font-black text-center text-base rounded-xl border-2 border-black">
                            {qCount}
                        </div>

                        <button
                            onClick={() => addQubit()}
                            disabled={qCount >= circuitConfig.maxQubits}
                            className="w-10 h-10 bg-green-400 text-black font-black text-xl rounded-full shadow-xs/100 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:grayscale disabled:shadow-none disabled:cursor-not-allowed"
                        >
                            +
                        </button>
                    </div>
                </div>


                <div className="flex flex-col gap-1.5">
                    <span className="text-1 font-black uppercase">Adjust Nodes (X Axis)</span>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => removeNode()}
                            disabled={nCount <= circuitConfig.minSteps}
                            className="w-10 h-10 bg-red-400 text-white rounded-full font-black text-xl shadow-xs/100 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:grayscale disabled:shadow-none disabled:cursor-not-allowed"
                        >
                            -
                        </button>

                        <div className="flex-1 py-2 bg-black text-white font-mono font-black text-center text-base rounded-xl border-2 border-black">
                            {nCount}
                        </div>

                        <button
                            onClick={() => addNode()}
                            disabled={nCount >= circuitConfig.maxSteps}
                            className="w-10 h-10 bg-blue-300 text-black font-black text-xl rounded-full  shadow-xs/100 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer disabled:opacity-40 disabled:grayscale disabled:shadow-none disabled:cursor-not-allowed"
                        >
                            +
                        </button>
                    </div>
                </div>
        </>
    );
};

export default AdjustGrid;