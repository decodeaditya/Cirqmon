import circuitConfig from '../data/config'

const AdjustGrid = ({ qCount, nCount, addQubit, removeQubit, addNode, removeNode }) => {

    const buttonStyle = `w-10 h-10 text-white rounded-full font-black text-xl shadow-sm/100 active:translate-x-0.5 active:translate-y-0.5 
    active:shadow-none cursor-pointer transition-all hover:scale-110 disabled:opacity-40 disabled:bg-gray-300 disabled:text-black/90 disabled:shadow-none disabled:cursor-not-allowed`

    const displayNumbersStyle = 'flex-1 py-2 bg-blue-800 text-white font-mono font-black text-center text-base rounded-xl border-2 border-black/50 shadow-2xl'

    return (
        <>
            <div className="flex flex-col gap-1.5 bg-black/10 p-5 rounded-3xl shadow-sm">
                <span className="text-1 font-black tracking-tight text-white/90">Control Qubits</span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => removeQubit()}
                        disabled={qCount <= 1}
                        className={`${buttonStyle} bg-red-400`}
                    >
                        -
                    </button>

                    <div className={displayNumbersStyle}>
                        {qCount}
                    </div>

                    <button
                        onClick={() => addQubit()}
                        disabled={qCount >= circuitConfig.maxQubits}
                        className={`${buttonStyle} bg-green-400`}
                    >
                        +
                    </button>
                </div>
            </div>


            <div className="flex flex-col gap-1.5 bg-black/10 p-5 rounded-3xl shadow-sm">
                <span className="text-1 font-black tracking-tight text-white/90">Control Steps</span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => removeNode()}
                        disabled={nCount <= circuitConfig.minSteps}
                        className={`${buttonStyle} bg-blue-400`}                        >
                        -
                    </button>

                    <div className={displayNumbersStyle}>
                        {nCount}
                    </div>

                    <button
                        onClick={() => addNode()}
                        disabled={nCount >= circuitConfig.maxSteps}
                        className={`${buttonStyle} bg-yellow-400`}
                    >
                        +
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdjustGrid;