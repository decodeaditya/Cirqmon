import React, { useState } from 'react';
import QuantumGate from '../components/QuantumGate';
import gates from '../data/gatesWiki';
import GatesInfo from './GateInfomation';
import { motion } from 'framer-motion';
import Tooltip from '../components/Tooltip';
import imgOpen from '../assets/icons/book.webp';
import imgClose from '../assets/icons/rocket.webp';

const GatesTray = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [inspectedGate, setInspectedGate] = useState(null);

    const gateClicked = (e, gateId) => {
        const gate = gates.find((g) => g.id === gateId);
        setInspectedGate(gate);
    }

    const onCloseGateWiki = () => {
        setInspectedGate(null);
    }


    return (
        <>
            <div className="fixed top-4 left-4 sm:top-8 sm:left-8 z-9999 flex flex-col items-center gap-2.5 sm:gap-3 select-none pointer-events-none">
                <Tooltip text={isOpen ? "Close Gates Tray" : "Open Gates Tray"} isRight={true}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-30 h-30 relative pointer-events-auto group -rotate-1 rounded-4xl backdrop-invert-25 hover:rotate-0 active:translate-x-1 active:translate-y-1 border-2 border-white/10 active:shadow-md/100 transition-all duration-150 overflow-hidden cursor-pointer"
                    >
                        <motion.img
                            src={isOpen ? imgClose : imgOpen}
                            alt="Toggle Tray"
                            className={`transition-transform duration-300 p-2 ${isOpen ? 'rotate-12 scale-90' : 'rotate-0 scale-100'}`}
                        />
                    </button>
                </Tooltip>

                <div
                    className={`pointer-events-auto flex flex-col items-center gap-2 sm:gap-3 p-5 bg-white/80 backdrop-blur-3xl rounded-4xl
                        transition-all duration-300 ease-out origin-left max-w-3/5 sm:max-w-none shadow-2xl overflow-x-auto ${isOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 -translate-x-6 pointer-events-none'
                        }`}
                >

                    <div className="flex flex-col py-1 justify-center shrink-0 text-center items-center">
                        <span className="text-xs font-black text-black leading-none">Drag to build</span>
                        <span className="text-xs font-bold text-black/60  mt-0.5 block">Tap to Learn</span>
                    </div>

                    <div className='flex flex-col gap-3.5'>
                        {gates.slice(0, 6).map((g) => (
                            <QuantumGate key={g.id} g={g} gateClicked={gateClicked} />
                        ))}
                    </div>
                </div>

                <div
                    className={`pointer-events-auto flex flex-col fixed top-1/4 right-0 sm:top-1/4 sm:right-0 z-9999 items-center gap-2 sm:gap-3 p-5 bg-white/80 backdrop-blur-3xl rounded-l-4xl
                        transition-all duration-300 ease-out origin-top-right max-w-3/5 sm:max-w-none shadow-2xl overflow-x-auto ${isOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 -translate-x-6 pointer-events-none'
                        }`}
                >
                    <div className='flex flex-col gap-3.5'>
                        {gates.slice(6).map((g) => (
                            <QuantumGate key={g.id} g={g} gateClicked={gateClicked} />
                        ))}
                    </div>
                </div>

            </div>

            <GatesInfo inspectedGate={inspectedGate} onCloseGateWiki={onCloseGateWiki} />

        </>
    );
};

export default GatesTray;