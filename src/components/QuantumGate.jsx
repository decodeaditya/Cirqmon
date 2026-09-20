import { useDraggable } from '@dnd-kit/react';

const QuantumGate = ({ g, gateClicked,cleanMode }) => {
    const { ref, listeners, attributes } = useDraggable({
        id: g.id,
    });

    const handleGateClick = (e) => {
        e.stopPropagation();
        gateClicked(e, g.id);
    };

    const roughBorders = `
   rounded-tr-[280px_14px] 
  rounded-br-[18px_240px] 
  rounded-bl-[310px_20px]
  rounded-tl-[15px_290px]
  `

    return (
        <div
            ref={ref}
            {...listeners}
            {...attributes}
            onClick={handleGateClick}
            className={`${g.bg} ${g.text} relative w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center ${cleanMode ? '' : roughBorders} 
            border-3 border-black/30 -md cursor-grab active:cursor-grabbing hover:-translate-y-1 hover:-rotate-4 hover:scale-110 active:translate-y-0.5 
            transition-all duration-200 ease-out`}
        >
            <span className={`font-black uppercase text-xl ${g.id.length > 2 ? 'sm:text-xl' : 'sm:text-2xl'} leading-none pointer-events-none`}>
                {g.id}
            </span>
        </div>
    );
};

export default QuantumGate;
