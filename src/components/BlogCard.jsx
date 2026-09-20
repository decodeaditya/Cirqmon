import { getBlogImg } from "../algorithms/utils"

const BlogCard = ({ blog, index }) => {
    return (
        <>
            <div>
                <div className="flex items-center justify-between mb-6">
                    <span className="bg-yellow-300 rounded-full text-xs font-black text-black/90 px-3 py-1.5">
                        Blog {index + 1}
                    </span>
                    <span className="text-xs text-white/80">
                        {blog.pubDate?.split(" ")[0].replaceAll("-", "/")}
                    </span>
                </div>
                <img src={getBlogImg(blog.description)} className="w-full h-60 my-4 rounded-2xl shadow-xl" style={{ objectFit: 'cover' }} />
                <h3 className="text-2xl font-black tracking-tighter py-4 rounded-2xl mb-3 leading-tight">
                    {blog.title}
                </h3>
            </div>

            <div className="rounded-2xl text-black font-bold bg-yellow-300 p-4 shadow-xl hover:bg-yellow-200 transition text-center">
                Read Blog
            </div>
        </>
    )
}

export default BlogCard