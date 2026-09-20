import Tooltip from './Tooltip'

const NavbarBtn = ({ btn }) => {

    return (
        <Tooltip text={btn.text} isRight={true}>
            <div className="relative group" onClick={btn.onTap}>
                <button
                    className={`relative flex items-center justify-center transition-all duration-75 ease-out hover:-translate-y-1 
                    hover:rotate-6 active:translate-y-1.5 active:shadow-[0_0_0_0_#000] active:rotate-0 cursor-pointer select-none`}
                >
                    <img src={btn.icon} className='w-20 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)] transform group-hover:scale-110 transition-transform pointer-events-none' />
                </button>
            </div>
        </Tooltip>
    )
}

export default NavbarBtn