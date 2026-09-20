import pikachu from '../assets/icons/pikachu'
import ball from '../assets/icons/ball';

const PokemonBtn = () => {
    return (
        <button
            className="relative w-[150px] h-[60px] overflow-hidden border-2 border-black
            rounded-[50px] pl-[35px] cursor-pointer bg-white shadow-lg group hover:shadow-2xl 
            hover:scale-[1.05] transition-transform"
        >
            {pikachu}

            <span className="absolute text-black top-[10%] left-[45%] text-[30px] font-black tracking-[1px]
            group-hover:text-transparent transition-colors">
                GO!
            </span>

            {ball}
            <span className="absolute text-slate-900 top-[30%] left-[72%] text-[13px] opacity-0 
            animate-[pulse-animation_0011_1s_infinite] group-hover:opacity-100">
                make
            </span>
            <span className="absolute text-slate-900 top-[55%] left-[75%] text-[13px] opacity-0 
            animate-[pulse-animation_0011_1s_infinite] group-hover:opacity-100">
                make
            </span>
        </button>
    );
};

export default PokemonBtn;