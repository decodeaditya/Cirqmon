import React, { useState, useEffect, Suspense } from 'react';
import './App.css';
import Playground from './pages/Playground';
import Homepage from './pages/HomePage';
import Writings from './pages/Writings';
import { BrowserRouter, Route, Routes, useLocation, useNavigation } from 'react-router';

import default_bg from './assets/canvas_backgrounds/bg1.jpg'
import alienFace from './assets/icons/alienFace.webp'
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

const AnimatedRoutes = () => {

  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout" initial={false}>

      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Homepage />} />
        <Route path='/playground' element={<ScreenRestricter />} />
        <Route path='/blogs' element={<Writings />} />
      </Routes>

    </AnimatePresence>
  );
}

const ScreenRestricter = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  return (
    <motion.div
      style={{ overflow: 'hidden'}}
      transition={{ duration: 0.2, ease : [0.4, 0.2, 0.2, 2] }}
    >

      <div className={`w-screen h-screen flex items-center justify-center bg-no-repeat bg-fixed bg-cover`} style={{ backgroundImage: `url(${default_bg})` }} >
        {isMobile ? (
          <div className={`text-center p-6 rounded-4xl backdrop-blur-3xl bg-white/20 shadow-2xs`}>
            <img src={alienFace} className="w-20 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-white">Screen is very small</h1>
            <p className="text-white">You should use a larger screen <br /> or try on desktop mode.</p>
          </div>
        ) : (
          <Playground />
        )}
      </div>

    </motion.div>

  )
}


