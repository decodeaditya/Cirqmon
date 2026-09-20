import React, { useState } from 'react';

const Switch = ({ isBigEndian, setBigEndian }) => {
    const [isChecked, setIsChecked] = useState(isBigEndian);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        setBigEndian(!isChecked);
    };

    return (
        <div>
            <input
                type="checkbox"
                id="checkboxInput"
                className="peer hidden"
                checked={isChecked}
                onChange={handleToggle}
            />
            <label
                htmlFor="checkboxInput"
                className="relative flex h-8 w-12 cursor-pointer items-center justify-center rounded-full bg-white/30
                transition-colors duration-200 peer-checked:bg-slate-500/80"
            >
                <span
                    className={`absolute ${isChecked ? 'right-2' : 'left-2'} h-4 w-4 rounded-full border-4 border-white bg-transparent 
                    shadow-[5px_2px_7px_rgba(8,8,8,0.26)] transition-all duration-400 peer-checked:translate-x-10 peer-checked:bg-white`}
                />
            </label>
        </div>
    );
}

export default Switch;
