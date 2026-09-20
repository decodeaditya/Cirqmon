const Tooltip = ({ children, text, isRight, textWrap }) => {
  return (
    <div className="relative inline-block group">
      {children}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 px-3.5 py-1.5 ${textWrap ? 'whitespace text-wrap' : ''}
          bg-white text-zinc-950 font-black text-sm rounded-xl shadow-lg
          pointer-events-none opacity-0 transition-all duration-200 ease-out z-50 whitespace-nowrap
          group-hover:opacity-100 group-hover:translate-x-0 group-hover:-rotate-3
          ${isRight 
            ? 'left-full ml-3 -translate-x-2' 
            : 'right-full mr-3 translate-x-2'
          }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
