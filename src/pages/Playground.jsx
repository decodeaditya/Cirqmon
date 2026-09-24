import { useState } from 'react'
import useSound from 'use-sound'
import { Link } from 'react-router-dom'
import { DragDropProvider } from '@dnd-kit/react'
import Canvas from '../blocks/Canvas'
import NavbarBtn from '../components/NavbarBtn'
import GatesTray from '../blocks/GatesTray'
import AdjustGrid from '../tools/AdjustGrid'
import MultiGateModal from '../blocks/MultiGateModal'
import audio_url from "../assets/audio/background_audio.mp3"
import musicPlay from '../assets/icons/musicPlay.webp'
import musicStop from '../assets/icons/musicStop.png'
import sceneryIcon from '../assets/icons/scene.webp'
import qubitsIcon from '../assets/icons/nuclei.webp'
import gates from '../data/gatesWiki';
import circuitConfig from '../data/config'
import { AnimatePresence, motion } from "framer-motion";
import chick from '../assets/icons/babyChick.gif'
import Tooltip from '../components/Tooltip'
import ExecuteCircuit from '../tools/ExecuteCircuit'
import canvasBg1 from '../assets/canvas_bg_32.jpg'
import canvasBg2 from '../assets/canvas_bg_45.jpg'
import { useAlert } from '../Context/AlertContext'
import logo from '../assets/logo.png'

const Playground = () => {

    const backgroundImgs = [
        canvasBg1,
        canvasBg2,
    ]

    const [musicPlaying, setMusicPlaying] = useState(false);
    const [qubitsAdjustOpen, setQubitsAdjustOpen] = useState(false);
    const [multiQubitData, setMultiQubitData] = useState(null);
    const [play, { stop }] = useSound(audio_url, { volume: 0.5, loop: true, });
    const [bgImg, setBgImg] = useState(backgroundImgs[0])
    const { showAlert } = useAlert(); 

    const manageMusic = () => {
        setMusicPlaying(!musicPlaying);
        if (!musicPlaying) play();
        else stop();
    }

    const changeBackground = () => setBgImg((prev) => backgroundImgs[(backgroundImgs.indexOf(prev) + 1) % backgroundImgs.length]);
    const toggleQubitsAdjust = () => setQubitsAdjustOpen(!qubitsAdjustOpen);

    const buttons = [
        { id: 1, text: musicPlaying ? 'Music: Playing' : 'Music: Paused', icon: musicPlaying ? musicStop : musicPlay, onTap: manageMusic },
        { id: 2, text: 'Change Background', icon: sceneryIcon, onTap: changeBackground },
        { id: 3, text: 'Adjust Circuit', icon: qubitsIcon, onTap: toggleQubitsAdjust },
    ]

    const [circuit, setCircuit] = useState({
        0: [null, null, null, null],
        1: [null, null, null, null],
        2: [null, null, null, null],
    });

    const clearMultiGate = (prevCircuit, qubitId) => {
        const nextCircuit = { ...prevCircuit };

        nextCircuit[qubitId].forEach((cell, stepIdx) => {
            if (cell?.type !== 'multi') return;
            const involvedQubits = [...cell.controls, cell.target]

            involvedQubits.forEach((qubit) => {
                if (!nextCircuit[qubit]) return;

                nextCircuit[qubit] = [...nextCircuit[qubit]];
                nextCircuit[qubit][stepIdx] = null;
            })
        })
        return nextCircuit
    }


    const addNewQubit = () => {
        const newQubitId = Object.keys(circuit).length;
        const stepsCount = circuit[0].length

        if (newQubitId >= circuitConfig.maxQubits) return; // Maximum qubits for now
        setCircuit((prev) => ({
            ...prev,
            [newQubitId]: Array(stepsCount).fill(null)
        }))
    };

    const removeQubit = () => {
        const keys = Object.keys(circuit);
        const qubitToRemove = Math.max(...keys)

        if (qubitToRemove < circuitConfig.minQubit) return;

        setCircuit((oldCircuit) => {
            let nextCircuit = clearMultiGate(oldCircuit, qubitToRemove)
            const { [qubitToRemove]: _, ...newCircuit } = nextCircuit
            return newCircuit
        });
    };

    const addCircuitNode = () => {
        if (circuit[0]?.length >= circuitConfig.maxSteps) return // Maximum steps for Now
        const oldCircuit = { ...circuit };

        for (const qubit in oldCircuit) {
            oldCircuit[qubit].push(null);
        }
        setCircuit(oldCircuit);
    }

    const removeCircuitNode = () => {
        if (circuit[0].length <= circuitConfig.minSteps) return; // Minimum step for Now
        const oldCircuit = { ...circuit };

        for (const qubit in oldCircuit) {
            oldCircuit[qubit].pop();
        }
        setCircuit(oldCircuit);
    }


    const handleDragEnd = (event) => {
        const totalQubits = Object.keys(circuit).length;
        const { source, target } = event.operation;
        if (!source || !target) return;

        const gateId = String(source.id);
        const targetId = String(target.id);

        if (totalQubits < gateId.length) {
            showAlert('This gate need more qubits','Add more qubits and drop add this Gate!')
            return;
        }

        if (!targetId.startsWith('node-')) return;

        const [_, qubitId, stepIdx] = targetId.split('-');

        const gate = gates.find(g => g.id.toLowerCase() === gateId.toLowerCase());

        if (gate.type.includes("multi") && totalQubits >= gateId.length) {
            setMultiQubitData({
                gateId,
                qubitId: parseInt(qubitId),
                stepIdx: parseInt(stepIdx)
            });
            return;
        }

        if(circuit[qubitId][stepIdx]){
            showAlert("Step in this Qubit is already Engaged","Remove existing gate to add new one!")
            return;
        }

        setCircuit((prevCircuit) => {
            const nextCircuit = { ...prevCircuit };
            nextCircuit[qubitId][stepIdx] = { type: 'single', gate: gateId };
            return nextCircuit;
        });
    };

    const handleConfirmMultiGate = (controls, target) => {
        if (!multiQubitData) return;
        const { gateId, stepIdx } = multiQubitData;
        if (circuit[target][stepIdx] || controls.some(c=>circuit[c][stepIdx])){
            showAlert("Step in this Qubit is already Engaged","Remove existing gate to add new one!")
            return;
        } 

        setCircuit((prevCircuit) => {
            const nextCircuit = { ...prevCircuit };

            controls.forEach((control) => {
                nextCircuit[control][stepIdx] = {
                    type: 'multi',
                    gate: gateId,
                    role: 'control',
                    controls: controls,
                    target: target,
                    pairedWith: target
                };
            });

            nextCircuit[target][stepIdx] = {
                type: 'multi',
                gate: gateId,
                role: 'target',
                controls: controls,
                target: target,
                pairedWith: controls
            };
            return nextCircuit;
        });
        setMultiQubitData(null);
    };


    const removeGate = (qubitId, stepId) => {
        setCircuit((prevCircuit) => {
            const nextCircuit = { ...prevCircuit }
            const clickedCell = nextCircuit[qubitId][stepId];

            if (!clickedCell) return nextCircuit;

            if (clickedCell.type === 'multi') {
                clickedCell.controls.forEach((control) => {
                    nextCircuit[control][stepId] = null
                })

                nextCircuit[clickedCell.target][stepId] = null

            } else {
                nextCircuit[qubitId][stepId] = null
            }

            return nextCircuit;
        });
    }
    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <div
                style={{
                    backgroundImage: `url(${bgImg})`,
                }}
                className="fixed inset-0 flex flex-col gap-6 bg-cover bg-center bg-no-repeat bg-fixed px-4"
            >
                <div className="h-screen w-full flex flex-col overflow-hidden">
                    <div className='flex flex-1 gap-x-7 p-5 justify-center min-h-0'>
                        <Canvas
                            circuit={circuit}
                            setCircuit={setCircuit}
                            removeGate={removeGate}
                        />
                        <div>
                            <GatesTray />
                        </div>
                    </div>

                    <div className="flex justify-between items-center px-4 pb-4 shrink-0">
                        {/* Logo */}
                        <Link to="/" className='bg-black/30 backdrop-blur rounded-2xl px-6 py-2 transition hover:rotate-3 tracking-tighter hover:tracking-tight h-max'>
                            <span className="text-white font-black text-2xl">
                                <img src={logo} width={30} className='inline-block mr-2' />
                                Cirqmon<span className="text-yellow-400">.</span>
                            </span>
                        </Link>

                        <div className="flex items-center gap-5">
                            <Sidebar buttons={buttons} />
                            <ExecuteCircuit
                                circuit={circuit}
                            />
                        </div>
                    </div>

                </div>


                <QubitsAdjustSection
                    qCount={Object.keys(circuit).length}
                    nCount={circuit[0].length}
                    isOpen={qubitsAdjustOpen}
                    onClose={toggleQubitsAdjust}
                    addQubit={addNewQubit}
                    removeQubit={removeQubit}
                    addNode={addCircuitNode}
                    removeNode={removeCircuitNode}
                />

                <MultiGateModal
                    isOpen={multiQubitData !== null}
                    modalData={multiQubitData}
                    maxQubits={Object.keys(circuit).length}
                    onClose={() => setMultiQubitData(null)}
                    onConfirm={handleConfirmMultiGate}
                />

            </div>
        </DragDropProvider>
    )
}


const Sidebar = ({ buttons }) => {
    return (
        <div className={`flex justify-center gap-4`}>
            {buttons.map((btn) => (
                <NavbarBtn key={btn.id} btn={btn} onClick={btn.onTap} />
            ))}
        </div>
    )
}

const QubitsAdjustSection = ({ qCount, nCount, isOpen, onClose, addQubit, removeQubit, addNode, removeNode }) => {
    return (
        <AnimatePresence>
            <div className="fixed bottom-10 right-10 z-9999 select-none pointer-events-none">
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-[-1] pointer-events-auto backdrop-blur bg-black/20"
                            onClick={onClose}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.7, y: 40 }}
                            transition={{ type: "spring", stiffness: 350, damping: 20 }}
                            className='pointer-events-auto'
                        >
                            <Tooltip text="Don't poke me, Adjust the circuit!" isRight={false}>
                                <img src={chick} width={120} className='relative -mb-5 z-20 ml-5' />
                            </Tooltip>
                            <div className='w-72 bg-slate-400/90 backdrop-blur rounded-4xl p-4 shadow-2xl
                            flex flex-col gap-4'>
                                <AdjustGrid
                                    qCount={qCount}
                                    nCount={nCount}
                                    addQubit={addQubit}
                                    removeQubit={removeQubit}
                                    addNode={addNode}
                                    removeNode={removeNode}
                                />
                            </div>

                        </motion.div>
                    </>
                )}
            </div>
        </AnimatePresence>
    )
}

export default Playground