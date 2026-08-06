import React from 'react'
import { motion } from 'framer-motion'
import planet from '../assets/icons/planet.webp'

const GatesInformation = ({ inspectedGate, onCloseGateWiki }) => {
    return (
        <>

            <div className="fixed select-none pointer-events-none hidden sm:block sm:top-6 sm:right-8">
                <motion.img animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }} src={planet} alt="sticker" className="w-25" />
            </div>


            {inspectedGate && <div className="fixed sm:absolute z-9999 sm:bottom-auto sm:left-auto sm:top-6 sm:right-6">

                <div className="pointer-events-auto bg-indigo-400 max-w-md border-2 border-white/20 rounded-4xl p-5 
                transition-all duration-200 animate-in fade-in zoom-in-90">

                    <div className="flex items-center justify-between pb-3 mb-3 border-b-4 border-black/15">
                        <span className="font-black text-black text-xs uppercase tracking-widest p-2 border border-black/30 rounded bg-yellow-300">
                            {inspectedGate.easyName || "Quantum Gate"}
                        </span>
                        
                        <button
                            onClick={onCloseGateWiki}
                            className="w-7 h-7 bg-red-400 hover:bg-red-400 active:translate-x-0.5 active:translate-y-0.5 text-white font-black rounded-full flex
                             items-center justify-center cursor-pointer shadow-sm/100"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-14 h-14 ${inspectedGate.bg} ${inspectedGate.text} border-1 border-black rounded-2xl flex items-center justify-center font-black text-2xl shadow-md/100 -rotate-6`}>
                            {inspectedGate.name}
                        </div>
                        <div>
                            <h4 className="font-black text-2xl leading-none text-white/90">{inspectedGate.id.toUpperCase()}-Gate</h4>
                        </div>
                    </div>

                    <div className="bg-white border-3 border-black/20 rounded-2xl p-3 shadow-inner">
                        <p className="text-s font-bold text-zinc-800 leading-relaxed">
                            {inspectedGate.work || "Put this gate on a qubit to make it question its entire reality and exist in two places at once."}
                        </p>
                    </div>

                    <div className="mt-3 items-center gap-1.5 font-black tracking-tight text-black bg-yellow-400 border-2 border-black/30 rounded-2xl p-3 shadow-md/20">
                        <p>Applying more than once</p>
                        <div className="font-bold p-2 bg-white border border-black/20 rounded-2xl mt-1 flex bg-item-center shadow/20">
                            {inspectedGate.undo || "No ASCII representation available."}
                        </div>
                    </div>


                </div>

            </div>}</>

    )
}

export default GatesInformation