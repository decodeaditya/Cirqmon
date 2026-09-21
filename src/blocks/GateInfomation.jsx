import { AnimatePresence, motion } from "framer-motion"
import tiger from '../assets/icons/tiger.gif'

const GatesInformation = ({ inspectedGate, onCloseGateWiki }) => {
    if (!inspectedGate) return null

      const roughBorders = `
  rounded-tr-[15px_225px] 
  rounded-br-[255px_15px] 
  rounded-bl-[15px_225px]
  rounded-tl-[255px_5px]
  `

  const gateRoughBorders = `
rounded-tr-[16px_36px]
rounded-tl-[36px_14px]
rounded-br-[34px_16px]
rounded-bl-[14px_34px]
`

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-1000 pointer-events-auto backdrop-blur bg-black/20"
                onClick={onCloseGateWiki}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 40 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className={`absolute top-10 right-8 flex flex-col z-10000`}>

                <img
                    src={tiger}
                    alt="character"
                    className="w-28 -mb-10 ml-6 z-20"
                />

                <div className={`bg-amber-200 border-4 border-white/40 max-w-md ${roughBorders} p-5 shadow-2xl pointer-events-auto`}>

                    <div className="flex items-center justify-between mb-4">
                        <span className="font-black text-sm px-3 py-1.5  bg-amber-300 text-amber-900">
                            {inspectedGate.easyName}
                        </span>
                    </div>

                    <div className={`bg-white/50 border-2 border-black/10 rounded-3xl p-5 shadow-inner ${roughBorders}`}>

                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-14 h-14 ${inspectedGate.bg} ${inspectedGate.text} border-2 border-black/20 ${gateRoughBorders}
                                flex items-center justify-center font-black shrink-0 -rotate-6 hover:rotate-0 hover:scale-105 transition-all
                                cursor-pointer ${inspectedGate.id.length > 2 ? 'text-xl' : 'text-2xl'}`}>
                                {inspectedGate.id.toUpperCase()}
                            </div>

                            <h4 className="font-black text-2xl text-amber-900 leading-none">
                                {inspectedGate.name}
                            </h4>
                        </div>

                        {/* Description */}
                        <div className="bg-orange-100 border-2 border-black/10 rounded-2xl p-3 mb-3">
                            <p className="font-bold text-zinc-800 leading-relaxed">
                                {inspectedGate.work}
                            </p>
                        </div>

                        {/* Undo info */}
                        <div className="bg-amber-300/50 border border-black/20 rounded-2xl p-3 mb-4">
                            <p className="font-black text-amber-900 text-sm mb-1">
                                Applying more than once
                            </p>
                            <div className="font-bold p-2 bg-white border border-black/20 rounded-xl">
                                {inspectedGate.undo}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default GatesInformation