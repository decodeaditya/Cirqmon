import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PokemonBtn from "../components/PokemonBtn";
import BlogCard from "../components/BlogCard";
import bg_video from '../assets/home_bg_vid.mp4'
import Navbar from "../components/Navbar";

const blog_url = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@decodeaditya";

export default function Homepage() {
    const [blogs, setBlogs] = useState([])
    const Links = [
        {
            href: '#blogs',
            name: 'Learnings'
        },
        {
            href: '#connect',
            name: 'Connect'
        }
    ]

    useEffect(() => {
        const getMediumPosts = async () => {
            try {
                const res = await fetch(blog_url)
                const data = await res.json()
                if (!data) {
                    console.log('Error fetching Blogs!')
                }
                setBlogs(data.items.slice(0, 3))
            } catch (error) {
                console.error("Error fetching Medium posts:", error)
            }
        }
        getMediumPosts()
    }, [])

    return (
        <main className="min-h-screen overflow-x-hidden text-white">
            {/* background video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="pointer-events-none fixed inset-0 h-full w-full object-cover"
            >
                <source src={bg_video} type="video/mp4" />
            </video>

            <div className="fixed inset-0" style={{ background: "rgba(7, 17, 38, 0.5)" }} />
            <div className="fixed inset-0" style={{
                background: "radial-gradient(circle at 25% 20%, rgba(64,190,255,0.18), transparent 28%), radial-gradient(circle at 80% 70%, rgba(245,204,65,0.13), transparent 26%)"
            }}></div>

            <div className="relative z-10 mx-auto" style={{ maxWidth: '1400px' }}>
                <Navbar Links={Links} />

                {/* Hero */}
                <section className="flex w-full justify-center text-center items-center gap-12 py-16 px-5 h-full">
                    <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="font-black text-white text-5xl sm:text-8xl">
                            Quantum
                            <br />
                            computing
                            <br />
                            <span className="text-yellow-300" style={{ textShadow: "4px 4px 0 #7c4a03" }}>
                               with Colors.
                            </span>
                        </div>

                        <p className="mt-8 max-w-2xl text-lg font-medium sm:text-xl mb-6 text-white/90 leading-8">
                            Drop gates, build circuits, and discover quantum ideas doing
                            experiments that feel more like a game than a textbook.
                        </p>

                        <Link to='/playground/'>
                            <PokemonBtn />
                        </Link>
                    </motion.div>
                </section>

                {/* Blogs */}

                <section id="blogs" className="px-5 sm:px-8 py-5 sm:py-7">
                    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
                        <div className="flex items-end justify-between gap-6 mb-10">
                            <h2 className="text-4xl font-black sm:text-6xl tracking-tight">
                                The learnings<span className="text-yellow-300">.</span>
                            </h2>
                        </div>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog, index) => (
                                <a
                                    key={blog.link}
                                    href={blog.link}
                                    target="_blank"
                                    className={`flex flex-col w-full rounded-3xl p-6 shadow-sm justify-between transition duration-300 min-h-20 bg-indigo-400/90 backdrop-blur ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0`}
                                >
                                    <BlogCard blog={blog} index={index} />
                                </a>
                            ))}
                        </div>

                        <Link
                            to="/blogs"
                            className="text-center text-sm font-bold p-3 bg-violet-400 w-30 mx-auto mt-7 block  rounded-3xl hover:bg-blue-400 cursor-pointer transition duration-300 ease"
                        >
                            Read all
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer id="connect" className="px-5 pb-8 pt-20">
                    <div className="flex flex-col justify-between gap-8 rounded-3xl backdrop-blur-xl bg-blue-300/20 p-8 mx-auto md:flex-row md:items-center md:p-10">
                        <div>
                            <h2 className="text-3xl font-black mb-2 tracking-tigher">
                                Have an idea?
                            </h2>
                            <p className="max-w-xl text-l text-white/70">
                                Feedbacks, collaborations or even casual conversations are welcome. I am eager to listen!
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <a
                                href="https://github.com/decodeaditya/cirqmon"
                                target="_blank"
                                className="rounded-full px-5 py-3 text-sm font-black transition bg-blue-400 text-white hover:bg-orange-400"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://stardance.hackclub.com/projects/1327"
                                target="_blank"
                                className="rounded-full border px-5 py-3 text-sm font-bold transition text-white bg-red-400 hover:bg-green-400"
                                style={{ borderColor: "rgba(255,255,255,0.2)" }}
                            >
                                Hack Club
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    )
}