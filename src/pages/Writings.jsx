import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";

const blog_url = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@decodeaditya";

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")

  const Links = [
    {
      name:'Home',
      href:'/'
    }
  ]

  useEffect(() => {
    const getMediumPosts = async () => {
      try {
        const res = await fetch(blog_url)
        const data = await res.json()
        if (!data) {
          console.log('Error fetching Blogs!')
          return
        }
        setBlogs(data.items || [])
        setFiltered(data.items || [])
      } catch (error) {
        console.error("Error fetching Medium posts:", error)
      }
    }
    getMediumPosts()
  }, [])

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(blogs)
      return
    }

    const query = search.toLowerCase()
    const result = blogs.filter((blog) => {
      const title = blog.title?.toLowerCase() || ""
      const desc = blog.description?.toLowerCase() || ""
      const categories = (blog.categories || []).join(" ").toLowerCase()

      return (
        title.includes(query) ||
        desc.includes(query) ||
        categories.includes(query)
      )
    })
    setFiltered(result)
  }, [search, blogs])

  return (
    <main className="min-h-screen overflow-x-hidden text-white bg-[#071126]">
      <div className="relative z-10 mx-auto" style={{ maxWidth: '1400px' }}>
        {/* Navbar */}
        <Navbar Links={Links} />

        {/* Header + Search */}
        <section className="px-5 sm:px-8 pt-10 pb-6">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-3">
              Blogs<span className="text-yellow-300">.</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Search through posts about quantum computing, physics and coding.
            </p>
          </div>

          {/* Search box */}
          <div className="relative max-w-xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search"
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-white/40 outline-none focus:border-yellow-300 focus:bg-white/15 transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-yellow-300 text-sm font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <p className="text-sm text-white/50 mt-4 ">
            Showing {filtered.length} of {blogs.length} posts
          </p>
        </section>

        {/* Blog Grid */}
        <section className="px-5 sm:px-8 py-6 pb-20">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-black text-white/80 mb-2">No posts found</h3>
              <p className="text-white/50">Try a different query</p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, 3).map((blog, index) => (
                <motion.a
                  key={blog.link}
                  href={blog.link}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`flex flex-col w-full rounded-3xl p-6 shadow-sm justify-between transition duration-300 bg-indigo-400/90 backdrop-blur ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'} rotate-0 hover:-translate-y-1`}
                >
                  <BlogCard index={index} blog={blog} />
                </motion.a>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}