import React, { useState } from 'react';

const MultiGateModal = ({ isOpen, modalData, maxQubits, onConfirm, onClose }) => {

    if (!isOpen || !modalData) return null;

    const { gateId, qubitId, stepIdx } = modalData;
    const [controlQubit, setControlQubit] = useState(qubitId);

    const [targetQubit, setTargetQubit] = useState(
        qubitId < (maxQubits - 1) ? qubitId + 1 : 0
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (controlQubit === targetQubit) {
            alert("Control and Target qubits cannot be the same!");
            return;
        }

        onConfirm(controlQubit, targetQubit);
    };

    const qubitOptions = Array.from({ length: maxQubits }, (_, i) => i);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-center items-center z-[9999] select-none">

            <div className="bg-indigo-400 w-full max-w-sm rounded-xl p-5 shadow-2xl transition-all duration-200 animate-in fade-in zoom-in-90 mx-4">

                <h3 className="font-black text-2xl leading-none text-white/90 mb-4 border-b-4 border-black/15 pb-2">{gateId.toUpperCase()} Gate - Step {stepIdx + 1}</h3>
              
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col gap-1.5 bg-white border-1 border-black/20 rounded-xl p-3 shadow-inner">

                        <label className="text-xs font-black uppercase tracking-wider text-zinc-600">Control Qubit</label>
                        <select
                            value={controlQubit}
                            onChange={(e) => setControlQubit(parseInt(e.target.value))}
                            className="w-full border-2 border-black/20 rounded-xl p-2 font-bold bg-zinc-50 text-zinc-800 outline-none cursor-pointer focus:border-indigo-400 transition-colors"
                        >
                            {qubitOptions.map(q => (
                                <option key={q} value={q}>Qubit {q}</option>
                            ))}
                        </select>

                    </div>

                    <div className="mb-4 flex flex-col gap-1.5 bg-white border-1 border-black/20 rounded-xl p-3 shadow-inner">
                        <label className="text-xs font-black uppercase tracking-wider text-zinc-600">Target Qubit</label>
                        <select
                            value={targetQubit}
                            onChange={(e) => setTargetQubit(parseInt(e.target.value))}
                            className="w-full border-2 border-black/20 rounded-xl p-2 font-bold bg-zinc-50 text-zinc-800 outline-none cursor-pointer focus:border-indigo-400 transition-colors"
                        >
                            {qubitOptions.map(q => (
                                <option key={q} value={q}>Qubit {q}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2.5 ">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-1.5 w-1/2 bg-white border border-black/20 rounded-xl font-bold text-zinc-700 hover:bg-zinc-100 active:translate-y-0.5 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-1.5 w-1/2 bg-zinc-900 border border-black text-white rounded-xl font-black tracking-wide hover:bg-black active:translate-y-0.5 transition-all cursor-pointer"
                        >
                            Confirm Gate
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};



export default MultiGateModal;