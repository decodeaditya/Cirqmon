import { useState } from 'react';
import gates from '../data/gatesWiki';
import hippo from '../assets/icons/hippo-blinking.gif'
import { useAlert } from '../Context/AlertContext';
 
const MultiGateModal = ({ isOpen, modalData, maxQubits, onConfirm, onClose }) => {

    if (!isOpen || !modalData) return;
    const { gateId, qubitId } = modalData;
    const { showAlert } = useAlert();

    // how many gates needed
    const getRequiredControls = (gate) => {
        const gateData = gates.find(g => g.id === gate)
        if (gateData.type.includes("three")) return 2
        if (gateData.type.includes("two")) return 1
        return 1;
    };

    const numControls = getRequiredControls(gateId);

    const defaultControls = Array.from({ length: numControls }, (_, i) => (qubitId + i) % maxQubits)
    const defaultTarget = (qubitId + numControls) % maxQubits
    const [controls, setControls] = useState(defaultControls);
    const [target, setTarget] = useState(defaultTarget);

    const handleControlChange = (index, value) => {
        const newControls = [...controls];
        newControls[index] = parseInt(value);
        setControls(newControls);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const allQubits = [...controls, target];
        const unique = new Set(allQubits);

        if (unique.size !== allQubits.length) {
            showAlert('You chose same qubit for multiple roles', 'Please select different qubits for each control and target.')
            return;
        }
        onConfirm(controls, target);
    };

    const qubitOptions = [...Array(maxQubits).keys()]

          const roughBorders = `
  rounded-tr-[10px_225px] 
  rounded-br-[255px_15px] 
  rounded-bl-[15px_225px]
  rounded-tl-[255px_15px]`


    return (
        <div className="fixed inset-0 bg-amber-100/10 backdrop-blur-sm flex flex-col justify-center items-center z-9999">
            <img src={hippo} width={120}/>
            <div className={`border-4 border-white/20 w-full max-w-md ${roughBorders} p-5 shadow-2xl mx-4 bg-amber-100 bg-blend-overlay`}>

                <p className="text-sm text-amber-800 font-medium text-center">
                    Configure the gate now
                </p>
                <h3 className="font-black text-2xl text-amber-900 mb-5 text-center">
                    Applying {gateId.toUpperCase()} Gate
                </h3>


                <form onSubmit={handleSubmit}>
                    {controls.map((controlQubit, index) => (
                        <div key={index} className="bg-white/80 border border-black/20 rounded-2xl p-3 mb-3">
                            <label className="text-xs font-black text-zinc-600 uppercase mb-1 block">
                                Control {numControls > 1 ? index + 1 : ''}
                            </label>
                            <select
                                value={controlQubit}
                                onChange={(e) => handleControlChange(index, e.target.value)}
                                className="w-full border-2 border-black/20 rounded-xl p-2 font-bold
                                text-zinc-800 outline-none cursor-pointer bg-yellow-50"
                            >
                                {qubitOptions.map(q => (
                                    <option key={q} value={q}>Qubit {q}</option>
                                ))}
                            </select>
                        </div>
                    ))
                    }
                    <div className="bg-white/80 border border-black/20 rounded-2xl p-3 mb-5">
                        <label className="text-xs font-black text-zinc-600 uppercase mb-1 block">Target Qubit</label>
                        <select
                            value={target ?? 0}
                            onChange={(e) => setTarget(parseInt(e.target.value))}
                            className="w-full border-2 border-black/20 rounded-xl p-2 font-bold bg-yellow-50 
                                text-zinc-800 outline-none cursor-pointer"
                        >
                            {qubitOptions.map(q => (
                                <option key={q} value={q}>Qubit {q}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 py-3 bg-red-400 font-bold text-white 
                            hover:bg-red-500 active:translate-y-0.5 transition cursor-pointer border-3 border-amber-800/40"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 py-2 bg-emerald-400 font-bold text-white 
                            hover:bg-emerald-500 active:translate-y-0.5 transition cursor-pointer border-3 border-amber-800/40"
                        >
                            Confirm Gate
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default MultiGateModal;