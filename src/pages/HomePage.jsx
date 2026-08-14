import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import bg from '../assets/homeBackground.jpg'
import { Link } from 'react-router-dom';
import astronaut from '../assets/icons/astronaut.webp'
import PokemonBtn from '../components/PokemonBtn';

export default function Homepage() {
    const [blogs, setBlogs] = useState([]);
    const [ready, setReady] = useState(false);

    const floatControls1 = useAnimationControls();
    const floatControls2 = useAnimationControls();
    const astronautAnimation = useAnimationControls();
    const heroAnimation = useAnimationControls();

    const rssToJsonApi = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@decodeaditya";

    useEffect(() => {

        const fetchBlogs = async () => {
            try {
                const response = await fetch(rssToJsonApi);
                if (!response.ok) throw new Error("Error fetching Medium posts");

                const data = await response.json();

                if (data.status === "ok") {
                    const posts = data.items.slice(0, 3);
                    setBlogs(posts);
                }
            } catch (error) {
                console.error("Error fetching Medium posts:", error);
            }
        }

        fetchBlogs();
        requestAnimationFrame(() => setReady(true));
    }, []);

    useEffect(() => {

        heroAnimation.start({
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" }
        });

        floatControls1.start({
            y: [0, -15, 1],
            rotate: [-2, 2, -2],
            transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        });

        floatControls2.start({
            y: [0, 15, 1],
            rotate: [1, -2, 2],
            transition: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }
        });

        astronautAnimation.start({
            y: [0, -5, 2],
            transition: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }
        });

    }, [floatControls1, floatControls2, astronautAnimation, heroAnimation]);

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-fixed selection:bg-slate-900 selection:text-white p-4 sm:p-6 md:p-8 flex flex-col overflow-x-hidden"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="fixed inset-0 bg-black/5 bottom-0 "></div>

            <nav className="w-full max-w-350 mx-auto flex justify-between p-4 items-center mb-12 sm:mb-16 relative z-50">

                <div className="bg-yellow-300 rounded-3xl px-6 py-2 cursor-pointer transition-all duration-150
                 shadow-[0_4px_0_0_#B8860B,0_6px_0_0_#0f172a] hover:-translate-y-1 hover:scale(1.5)">
                    <span className="text-2xl font-bold text-slate-900 ">CIRQMON</span>
                </div>

                <div className="flex gap-4 sm:gap-6 items-center">
                    <a href="https://github.com/decodeaditya/Cirqmon/blob/main/README.md" target='_blank'>
                        <button className="bg-blue-400 text-white tracking-wide shadow-[0px_2px_4px_0px_rgba(14,30,37,0.12),0px_2px_16px_0px_rgba(14,30,37,0.32)] 
                        border-3 border-white/40 px-6 py-2.5 relaxed rounded-full font-bold sm:text-lg text-base flex items-center gap-2 transition-all duration-150 hover:-translate-y-1 hover:-rotate-2 cursor-pointer">
                            Readme/Guide
                        </button>
                    </a>
                </div>
            </nav>

            <div className="flex-1 w-full max-w-350 mx-auto relative flex flex-col justify-center items-center text-center z-10 mb-20">
                <motion.main
                    animate={heroAnimation}
                     initial={{ opacity: 0, y: 20 }}
                    className="w-full relative"
                >

                    <div className="relative z-20 py-10 px-6 sm:py-3 sm:px-12 max-w-4xl mx-auto flex flex-col items-center">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl text-yellow-400 tracking-wide font-black drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)] leading-[1.05] mb-6 " >
                            QUANTUM
                            WITH VIBES
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-10 max-w-2xl leading-relaxed border-3 border-black/30 border-dashed rounded-3xl
                         bg-white/70 p-6 shadow-[0px_2px_4px_0px_rgba(14,30,37,0.12),0px_2px_16px_0px_rgba(14,30,37,0.32)] backdrop-blur-sm">
                            Drag, drop and Measure. A cartoonish Quantum Computing tool that makes circuit building feel like an enjoyble game, not a Burden :)
                        </p>

                        <Link to="/playground/">
                            <PokemonBtn />
                        </Link>
                    </div>
                </motion.main>

                <motion.div
                    animate={floatControls1}
                    className="absolute left-[8%] top-[15%] w-23 h-23 bg-orange-400 rounded-sm shadow-md items-center justify-center hidden lg:flex z-30 border-3 border-black/20"
                >
                    <span className="font-black text-white text-5xl drop-shadow-md">H</span>

                </motion.div>

                <motion.div
                    animate={floatControls2}
                    className="absolute right-[5%] bottom-[10%] w-24 h-24 bg-purple-500 rounded-full shadow-md items-center justify-center hidden lg:flex z-30 border-3 border-black/20"
                >
                    <span className="font-black text-white text-5xl drop-shadow-md">CX</span>

                </motion.div>
            </div>

            <section id="blogsSection" className="w-full max-w-350 mx-auto relative z-20 mb-12 mt-12">
                <motion.img
                    animate={astronautAnimation}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                    src={astronaut}
                    alt="Mascot Standing"
                    className="absolute right-3/6 -top-1/6 w-32 sm:w-48 z-30 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] pointer-events-none lg:block"
                />

                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-4xl sm:text-5xl font-black text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)] pl-1" >
                        The Learnings
                    </h2>

                    <Link to="/blogs/" className="text-slate-900 bg-[#FFD93D] font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-150
                     shadow-[0_4px_0_0_#B8860B,0_6px_0_0_#0f172a] hover:-translate-y-1 hover:shadow-[0_6px_0_0_#B8860B,0_8px_0_0_#0f172a] active:translate-y-1 active:shadow-[0_0px_0_0_#B8860B,0_0px_0_0_#0f172a]">
                        Read All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog, i) => (
                        <a
                            key={i}
                            href={blog.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`group backdrop-blur-xl bg-black/20 hover:rounded-tl-3xl hover:rounded-br-3xl ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 rounded-4xl shadow-[rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px] 
                                p-6 sm:p-8 flex flex-col justify-between transition-all duration-150 border-white/40 border-4`}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="bg-slate-900 text-white font-mono px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm ">
                                        Blog {i + 1}
                                    </span>
                                    <span className="bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-lg backdrop-blur-md drop-shadow-sm">
                                        On {blog.pubDate.split(" ")[0].replaceAll("-", "/")}
                                    </span>
                                </div>

                                <h3 className="text-3xl font-black text-white leading-tight drop-shadow-lg mb-4">
                                    {blog.title}
                                </h3>

                                <p className="text-white/90 font-bold text-sm leading-relaxed drop-shadow-sm line-clamp-2">
                                    {blog.desc}
                                </p>
                            </div>


                            <div className="mt-8 bg-white text-slate-900 px-6 py-4 rounded-2xl font-black text-sm shadow-[0_4px_0_0_#0f172a] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_6px_0_0_#0f172a] active:translate-y-1 active:shadow-none">
                                Read Blog
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            <footer className="w-full max-w-350 mx-auto relative z-20 mb-8">
                <div className="bg-teal-800 backdrop:backdrop-blur-2xl rounded-4xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[12px_12px_0px_0px_#0f172a]">
                    <div>
                        <h3 className="text-3xl font-black text-white mb-2">For Interactions</h3>
                        <p className="text-slate-200 font-medium leading-relaxed max-w-2xl">
                            If you have any Feedbacks or Ideas, the Project is Open Source so You can contribute. You can connect with me on Social media too!
                        </p>
                    </div>

                    <div className="flex gap-4">

                        <a href="https://github.com/decodeaditya/cirqmon" target="_blank" rel="noreferrer" className="text-slate-900 bg-yellow-300 font-black px-6 py-3 rounded-4xl border-3 border-slate-900 transition-all duration-150 shadow-[0_4px_0_0_#B8860B,0_6px_0_0_#0f172a] hover:-translate-y-1 hover:shadow-[0_6px_0_0_#B8860B,0_8px_0_0_#0f172a] active:translate-y-1 active:shadow-[0_0px_0_0_#B8860B,0_0px_0_0_#0f172a]">
                            Github
                        </a>

                        <a href="https://stardance.hackclub.com/projects/1327" target="_blank" rel="noreferrer" className="text-slate-900 bg-yellow-300 font-black px-6 py-3 rounded-xl border-3 border-slate-900 transition-all duration-150 shadow-[0_4px_0_0_#B8860B,0_6px_0_0_#0f172a] hover:-translate-y-1 hover:shadow-[0_6px_0_0_#B8860B,0_8px_0_0_#0f172a] active:translate-y-1 active:shadow-[0_0px_0_0_#B8860B,0_0px_0_0_#0f172a]">
                            On Hack Club
                        </a>

                    </div>
                </div>
            </footer>

        </div>
    );
}