import React from 'react';
import gates from '../data/gatesWiki';
import { useDroppable } from '@dnd-kit/react';

const DroppableSocket = ({ id, children }) => {

    const { ref, isOver } = useDroppable({ id });

    return (
        <div ref={ref} className={`relative transition-all duration-150 ${isOver ? 'scale-110' : ''}`}>
            {children}
        </div>
    );
};

const CircuitBox = ({ circuit, setCircuit, removeGate }) => {

    const renderGateContents = (cellData, qubitId) => {
        if (typeof cellData === 'string' || cellData?.type === 'single') {

            const gateName = typeof cellData === 'string' ? cellData : cellData.gate;
            const gateData = gates.find((g) => g.id.toUpperCase() === gateName.toUpperCase());

            return (
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-3 border-black/20 ${gateData?.bg || 'bg-blue-400'} ${gateData?.text || 'text-white'} shadow-md rounded-xs`}>
                    <span className="font-black text-2xl sm:text-3xl">{gateData?.name || gateName}</span>
                </div>
            );
        }

        if (cellData?.type === 'multi') {

            const isControl = cellData.role === 'control';
            const gateData = gates.find((g) => g.id.toUpperCase() === cellData.gate.toUpperCase());

            const trackSpan = Math.abs(cellData.pairedWith - qubitId);
            const isTargetBelow = cellData.pairedWith > qubitId;

            if (isControl) {
                return (
                    <div className="w-16 h-16 flex items-center justify-center relative">

                        {cellData.gate !== "sw" ? <div
                            className={`w-5 h-5 rounded-full ${gateData?.bg || 'bg-black'} border border-black/20 shadow-sm relative z-20`}
                            title={`Control Node (Targets Q_${cellData.pairedWith})`}
                        /> :
                        <div className={`w-16 h-16 z-20 rounded-full flex items-center justify-center border-3 border-black/20 ${gateData?.bg || 'bg-zinc-700'} ${gateData?.text || 'text-white'} shadow-md`} title={`Target Node (Controlled by Q_${cellData.pairedWith})`}>
                            <span className="font-black text-3xl leading-none">
                                {gateData.name}
                            </span>
                        </div>}

                        <div
                            className="absolute left-1/2 -translate-x-1/2 w-1 flex flex-col pointer-events-none -z-1"
                            style={{
                                height: `calc(${trackSpan} * 100% + ${trackSpan} * 3rem)`,
                                top: isTargetBelow ? '50%' : 'auto',
                                bottom: isTargetBelow ? 'auto' : '50%',
                            }}
                        >
                            <div className={`w-full h-full bg-black`} />
                        </div>

                    </div>

                );
            }

            else {

                return (
                    <div className={`w-16 h-16 z-20 rounded-full flex items-center justify-center border-3 border-black/20 ${gateData?.bg || 'bg-zinc-700'} ${gateData?.text || 'text-white'} shadow-md`} title={`Target Node (Controlled by Q_${cellData.pairedWith})`}>
                        <span className="font-black text-3xl leading-none">
                            {gateData.name}
                        </span>
                    </div>
                );
            }
        }


        return (
            <div className="w-16 h-16 rounded-2xl border-3 border-dashed border-black/20 backdrop-blur-4xl" />
        );
    };

    return (
        <div className="flex flex-col gap-12 p-6 sm:p-12 select-none">
            {Object.keys(circuit).map((qubitId) => (
                <div key={qubitId} className="relative flex items-center gap-4 sm:gap-6">


                    <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white border-3 border-black/40 rounded-3xl flex flex-col items-center mr-4 justify-center shadow-[4px_4px_0px_0px_#000]">
                        <span className="absolute -top-2.5 px-2 py-0.5 font-mono text-[9px] font-black bg-black text-white rounded-full">
                            Q_{qubitId}
                        </span>
                        <span className="font-black text-2xl sm:text-3xl text-black">|0&rang;</span>
                    </div>


                    <div className="relative flex-1 flex items-center justify-between gap-2 sm:gap-20 h-20">
                        <div className="absolute left-0 right-0 border-b-4 border-dashed border-black/40 -z-10" />

                        {Object.keys(circuit[qubitId]).map((stepID) => {
                            const cellData = circuit[qubitId][stepID];

                            return (
                                <DroppableSocket key={`${qubitId}-${stepID}`} id={`socket-${qubitId}-${stepID}`}>
                                    <div
                                        onClick={() => cellData && removeGate(qubitId, stepID)}
                                        className="cursor-pointer"
                                    >
                                        {renderGateContents(cellData, qubitId)}
                                    </div>
                                </DroppableSocket>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CircuitBox;
