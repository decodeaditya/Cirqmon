import React, { useEffect, useState } from 'react'
import Canvas from '../blocks/Canvas'
import SidebarBtn from '../components/SidebarBtn'
import GatesTray from '../blocks/GatesTray'
import AdjustGrid from '../tools/AdjustGrid'
import MultiGateModal from '../blocks/MultiGateModal'

import useSound from 'use-sound'

import background1 from '../assets/canvas_backgrounds/bg1.jpg'
import background2 from '../assets/canvas_backgrounds/bg2.jpg'
import background3 from '../assets/canvas_backgrounds/bg3.jpg'

import { DragDropProvider } from '@dnd-kit/react'

import audio_url from "../assets/audio/background_audio.mp3"

import { useNavigate } from 'react-router-dom'

import musicIcon from '../assets/icons/music.webp'
import sceneryIcon from '../assets/icons/scene.webp'
import qubitsIcon from '../assets/icons/nuclei.webp'
import homeIcon from '../assets/icons/home.webp'

import gates from '../data/gatesWiki';
import circuitConfig from '../data/config'

const Playground = () => {

    const navigate = useNavigate()

    const backgrounds = [
        background1,
        background2,
        background3
    ]

    const [background, setBackground] = useState(0);
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [qubitsAdjustOpen, setQubitsAdjustOpen] = useState(false);


    const [multiQubitData, setmultiQubitData] = useState(null);

    const [play, { stop }] = useSound(audio_url, { volume: 0.5, loop: true, });

    const changeBackground = () => {
        setBackground(((lastBg) => (lastBg + 1) % backgrounds.length));
    };

    const manageMusic = async () => {
        await setMusicPlaying(!musicPlaying);

        if (!musicPlaying) {
            play();
        } else {
            stop();
        }
    }

    const toggleQubitsAdjust = () => {
        setQubitsAdjustOpen(!qubitsAdjustOpen);
    }


    const buttons = [
        { id: 1, text: 'Home', icon: homeIcon, onclick: () => { navigate("/") } },
        { id: 2, text: 'Music', icon: musicIcon, onclick: manageMusic },
        { id: 3, text: 'Scenery', icon: sceneryIcon, onclick: changeBackground },
        { id: 4, text: 'Qubits', icon: qubitsIcon, onclick: toggleQubitsAdjust },
    ]

    const [circuit, setCircuit] = useState({
        0: [null, null, null, null],
        1: [null, null, null, null],
        2: [null, null, null, null],
    });


    const addNewQubit = () => {
        const newQubitID = Object.keys(circuit).length;

        if (newQubitID >= circuitConfig.maxQubits) return; // Maximum qubits for Now
        setCircuit((oldCircuit) => ({ ...oldCircuit, [newQubitID]: Array(circuit[0].length).fill(null) }));
    };

    const removeQubit = () => {

        const keys = Object.keys(circuit);
        const qubitToRemove = Number(keys[keys.length - 1]);

        if (keys.length <= 1) return; // Must have at least 1 Qubit

        setCircuit((oldCircuit) => {
            const copy = { ...oldCircuit };
            delete copy[qubitToRemove];
            return copy;
        });
    };

    const addCircuitNode = () => {
        const oldCircuit = { ...circuit };

        if (oldCircuit[0].length >= circuitConfig.maxSteps) return; // Maximum steps for Now

        for (const key in oldCircuit) {
            oldCircuit[key].push(null);
        }
        setCircuit(oldCircuit);
    }

    const removeCircuitNode = () => {

        const oldCircuit = { ...circuit };

        if (oldCircuit[0].length <= circuitConfig.minSteps) return;

        for (const key in oldCircuit) {
            oldCircuit[key].pop();
        }
        setCircuit(oldCircuit);
    }


    const handleDragEnd = (event) => {

        const { source, target } = event.operation;

        if (!source || !target) return;

        const gateId = String(source.id);
        const targetId = String(target.id);

        if (!targetId.startsWith('socket-')) return;

        const [_, qubitId, stepIdx] = targetId.split('-');

        const gate = gates.find(g => g.id.toLowerCase() === gateId.toLowerCase());

        if (gate.type === 'multi') {
            setmultiQubitData({
                gateId,
                qubitId: parseInt(qubitId),
                stepIdx: parseInt(stepIdx)
            });

            return;
        }

        setCircuit((prevCircuit) => {

            const nextCircuit = { ...prevCircuit };

            nextCircuit[qubitId] = [...prevCircuit[qubitId]];
            nextCircuit[qubitId][stepIdx] = { type: 'single', gate: gateId };

            return nextCircuit;
        });
    };

    const handleConfirmMultiGate = (controlQubit, targetQubit) => {

        if (!multiQubitData) return;

        const { gateId, stepIdx } = multiQubitData;

        setCircuit((prevCircuit) => {

            const nextCircuit = { ...prevCircuit };

            nextCircuit[controlQubit] = [...prevCircuit[controlQubit]];
            nextCircuit[targetQubit] = [...prevCircuit[targetQubit]];

            nextCircuit[controlQubit][stepIdx] = {
                type: 'multi',
                gate: gateId,
                role: 'control',
                pairedWith: targetQubit
            };

            nextCircuit[targetQubit][stepIdx] = {
                type: 'multi',
                gate: gateId,
                role: 'target',
                pairedWith: controlQubit
            };

            return nextCircuit;
        });

        setmultiQubitData(null);
    };



    const removeGate = (qubitId, stepId) => {

        setCircuit((prevCircuit) => {

            const nextCircuit = { ...prevCircuit };
            const currentCell = nextCircuit[qubitId][stepId];

            if (!currentCell) return prevCircuit;

            if (currentCell.type === 'multi') {

                const partnerQubit = currentCell.pairedWith;

                nextCircuit[qubitId] = [...prevCircuit[qubitId]]
                nextCircuit[qubitId][stepId] = null

                if (nextCircuit[partnerQubit]) {
                    nextCircuit[partnerQubit] = [...prevCircuit[partnerQubit]];
                    nextCircuit[partnerQubit][stepId] = null;
                }

            } else {

                nextCircuit[qubitId] = [...prevCircuit[qubitId]]
                nextCircuit[qubitId][stepId] = null

            }

            return nextCircuit;
        });
    };
    

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>

            <div style={{ backgroundImage: `url(${backgrounds[background]})` }} className={`bg-cover bg-center bg-fixed bg-no-repeat w-screen
                 h-screen items-center justify-center p-6 relative transition-all duration-500 flex flex-col sm:flex-row`}>

                <GatesTray />

                <Canvas height="80%" width="3/4" circuit={circuit} setCircuit={setCircuit} removeGate={removeGate} />

                <Sidebar buttons={buttons} />

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
                    onClose={() => setmultiQubitData(null)}
                    onConfirm={handleConfirmMultiGate}
                />

            </div>


            <div className="bg-yellow-300 rounded-3xl fixed bottom-10 left-8  px-6 py-2 cursor-pointer transition-all
             duration-150 shadow-[0_4px_0_0_#B8860B,0_6px_0_0_#0f172a] hover:-translate-y-1 hover:scale(1.5)">
                <span className="text-xl font-bold text-slate-900 ">CIRQMON</span>
            </div>

        </DragDropProvider>
    )
}


const Sidebar = ({ buttons }) => {
    return (
        <div className="gap-4 justify-center bg-black/10 backdrop-blur-3xl shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] p-6 flex sm:w-max sm:flex-col rounded-r-[50px]">
            {buttons.map((btn) => (
                <SidebarBtn key={btn.id} btn={btn} onClick={btn.onclick} />
            ))}
        </div>
    )
}

const QubitsAdjustSection = ({ qCount, nCount, isOpen, onClose, addQubit, removeQubit, addNode, removeNode }) => {
    return (
        <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end select-none pointer-events-none">

            {isOpen && (
                <div
                    className="fixed inset-0 z-[-1] pointer-events-auto"
                    onClick={onClose}
                />
            )}

            <div
                className={`
          pointer-events-auto mb-4 w-64 bg-white/40 backdrop-blur-3xl rounded-3xl p-4 shadow-[5px_5px_0px_0px_#000] flex flex-col gap-4 transition-all duration-150 origin-bottom
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-8 pointer-events-none'}
        `}
            >
                <AdjustGrid qCount={qCount} nCount={nCount} addQubit={addQubit} removeQubit={removeQubit} addNode={addNode} removeNode={removeNode} />
            </div>
        </div>
    )
}

export default Playground