import React, { createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion'
import alertIcon from '../assets/icons/alert.gif'

const AlertContext = createContext();
export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
    const [alertConfig, setAlertConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
    });

    const showAlert = (title, message) => {
        setAlertConfig({ isOpen: true, title, message });
    };

    const closeAlert = () => {
        setAlertConfig({ isOpen: false, title: '', message: '' });
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {alertConfig.isOpen && (
                    <motion.div className='fixed inset-0 z-999 flex flex-col items-center justify-center backdrop-blur bg-black/50'>
                        <img src={alertIcon} width={100} className='-m-4 z-10'/>
                        <div className='w-[90%] max-w-sm bg-taupe-600 border-4 border-taupe-500/50 rounded-2xl
                    p-6 text-center shadow-[8px_8px_0_rgba(0,0,0,0.25)]'>

                                <h3 className='text-xl font-black text-white mb-2'>{alertConfig.title}</h3>
                                <p className='text-sm font-bold text-white/80 mb-5'>{alertConfig.message}</p>

                                <button onClick={closeAlert} className="w-1/2 py-3 bg-yellow-700 font-bold text-white 
                            hover:bg-blue-500 active:translate-y-0.5 transition cursor-pointer border-3 border-yellow-800/40">
                                    Got it!
                                </button>
                            </div>
                    </motion.div>
            )}
        </AlertContext.Provider>
    );
}

