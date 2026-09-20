import gates from "../data/gatesWiki";
import { useDroppable } from "@dnd-kit/react";

const socket_size = "h-16 w-16 sm:h-20 sm:w-20";

const qubitLabelBorder = `
rounded-tr-[18px_40px]
rounded-tl-[40px_14px]
rounded-br-[36px_16px]
rounded-bl-[14px_38px]`

const droppableBorder = `
rounded-tr-[16px_36px] 
rounded-tl-[36px_14px] 
rounded-br-[34px_16px] 
rounded-bl-[14px_34px]
`

const DroppableSocket = ({ id, children }) => {
    const { ref, isOver } = useDroppable({ id });

    return (
        <div
            ref={ref}
            className={`relative transition-transform duration-150 ${isOver ? "scale-110" : ""
                }`}
        >
            {children}
        </div>
    );
};

const CircuitBox = ({ circuit, removeGate }) => {
    const qubitIds = Object.keys(circuit);
    
    return (
        <div className="select-none space-y-12 p-6 sm:p-12">
            {qubitIds.map((qubitId) => (
                <QubitRow
                    key={qubitId}
                    qubitId={qubitId}
                    row={circuit[qubitId]}
                    removeGate={removeGate}
                />
            ))}
        </div>
    );
};

const QubitRow = ({ qubitId, row, removeGate }) => {
    const stepIds = Object.keys(row);

    return (
        <div className="relative flex items-center sm:gap-7">
            <QubitLabel qubitId={qubitId} />

            <div className="relative flex items-center flex-1 justify-between gap-2 sm:gap-25 h-25 pr-8 pl-3">
                <div className="absolute left-0 right-0 border-b-2 border-dashed border-black/40 mx-2" />

                {stepIds.map((stepId) => {
                    const cell = row[stepId];

                    return (
                        <DroppableSocket
                            key={`${qubitId}-${stepId}`}
                            id={`node-${qubitId}-${stepId}`}
                        >
                            <button
                                type="button"
                                onClick={() => cell && removeGate(qubitId, stepId)}

                                aria-label={
                                    cell
                                        ? `Remove ${cell.gate} gate from qubit ${qubitId}, step ${stepId}`
                                        : `Empty socket for qubit ${qubitId}, step ${stepId}`
                                }
                                className={`block cursor-pointer ${droppableBorder} focus:outline-none focus:ring-4 focus:ring-yellow-300/30 transition`}
                            >
                                <GateCell
                                    cell={cell}
                                    qubitId={qubitId}
                                />
                            </button>
                        </DroppableSocket>
                    );
                })}
            </div>
        </div>
    );
};

const QubitLabel = ({ qubitId }) => {
    return (
        <div className={`relative flex h-16 w-16 rounded-2xl shrink-0 flex-col items-center justify-center bg-yellow-100 border-2 border-yellow-700/40 shadow-[4px_4px_0_#000] sm:h-20 sm:w-20
        transition hover:rotate-3 ${qubitLabelBorder}`}>
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-400 border-3 border-white/60 rounded-2xl px-2 py-1 text-left text-xs font-black text-white whitespace-nowrap">
                Qubit {qubitId}
            </span>

            <span className="text-2xl font-black text-black sm:text-3xl">
                |0⟩
            </span>
        </div>
    );
};

const GateCell = ({ cell, qubitId }) => {
    if (!cell) {
        return <EmptySocket />;
    }

    const gateName = String(cell.gate || "").toUpperCase();
    const gateData = gates.find(g => g.id.toUpperCase() == gateName)

    if (cell.type === "single") {
        return (
            <SingleGate
                gateName={gateName}
                gateData={gateData}
            />
        );
    }

    if (cell.type === "multi") {
        return (
            <MultiGate
                cell={cell}
                gateName={gateName}
                gateData={gateData}
                qubitId={qubitId}
            />
        );
    }

    return <EmptySocket />;
};

const SingleGate = ({ gateName, gateData }) => {
    return (
        <div
            className={`${socket_size} flex items-center justify-center border-3 border-black/25 ${gateData?.bg || "bg-blue-400"
                } ${gateData?.text || "text-white"} shadow-md hover:scale-110 transition`}
        >
            <span className="text-2xl font-black sm:text-3xl">
                {gateName}
            </span>
        </div>
    );
};

const MultiGate = ({ cell, gateName, gateData, qubitId }) => {

    const isControl = cell.role === "control";
    const isSwap = cell.gate?.toLowerCase() === "sw";

    const pairedQubit = Number(cell.pairedWith);
    const currentQubit = Number(qubitId);
    const distance = Math.abs(pairedQubit - currentQubit);
    const targetIsBelow = pairedQubit > currentQubit;

    if (!isControl) {
        return (
            <TargetGate
                gateName={gateName}
                gateData={gateData}
                pairedQubit={cell.pairedWith}
            />
        );
    }

    return (
        <div
            className={`${socket_size} relative flex items-center justify-center`}
            title={
                isSwap
                    ? `Swap gate with qubit ${cell.pairedWith}`
                    : `Control qubit connected to qubit ${cell.pairedWith}`
            }
        >
            <ConnectorLine
                distance={distance}
                targetIsBelow={targetIsBelow}
            />

            {isSwap ? (
                <TargetGate
                    gateName={gateName}
                    gateData={gateData}
                    pairedQubit={cell.pairedWith}
                />
            ) : (
                <span
                    className={`relative z-30 h-5 w-5 rounded-full border border-black/20 ${gateData?.bg} transition hover:scale-140 shadow-sm sm:h-6 sm:w-6`}
                />
            )}
        </div>
    );
};

const TargetGate = ({ gateName, gateData, pairedQubit }) => {
    return (
        <div
            className={`${socket_size} relative z-20 flex items-center justify-center rounded-full border-2 transition hover:scale-120 border-black/20 ${gateData?.bg} ${gateData?.text} shadow-md`}
            title={`Target qubit connected to qubit ${pairedQubit}`}
        >
            <span className="text-2xl font-black leading-none sm:text-3xl">
                {gateName}
            </span>
        </div>
    );
};

const ConnectorLine = ({ distance, targetIsBelow }) => {
    const ROW_HEIGHT = 40;
    const ROW_GAP = 98;
    const lineHeight = distance * (ROW_HEIGHT + ROW_GAP);

    return (
        <span
            aria-hidden="true"
            className={`pointer-events-none absolute left-1/2 w-1 -translate-x-1/2 bg-black ${targetIsBelow ? "top-1/2" : "bottom-1/2 z-0"
                }`}
            style={{
                height: `${lineHeight}px`,
            }}
        />
    );
};

const EmptySocket = () => {
    return (
        <div
            className={`h-20 w-20 border-2 border-dashed border-black/25 bg-yellow-50/80 backdrop-blur ${droppableBorder}
            shadow-[3px_3px_0_rgba(0,0,0,0.08)] flex items-center justify-center text-4xl font-black text-black/20`}>
            +
        </div>
    );
};

export default CircuitBox;