const Alert = ({ message = "Something went wrong!", onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-yellow-300 border-4 border-black rounded-2xl p-6 max-w-sm mx-4
        shadow-[6px_6px_0_#000] text-center">
        
        <div className="text-4xl mb-3">⚠️</div>
        
        <h3 className="font-black text-xl text-black mb-2">
          Oops!
        </h3>
        
        <p className="font-bold text-black/80 mb-5">
          {message}
        </p>

        <button
          onClick={onClose}
          className="px-6 py-2 bg-red-400 border-2 border-black rounded-xl font-black text-white
            shadow-[3px_3px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px]
            hover:shadow-[2px_2px_0_#000] active:translate-x-[3px] active:translate-y-[3px]
            active:shadow-none transition-all cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  )
}

export default Alert