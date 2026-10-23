import { createContext, useContext, useEffect, useState } from "react";

const BlogContext = createContext();
export const useBlog = () => useContext(BlogContext);

export function BlogProvider({ children }) {
    const [blogs, setBlogs] = useState([]);
    const blog_url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@decodeaditya/feed&api_key=${import.meta.env.VITE_RSS_FEED}`; 

    useEffect(() => {
        const getMediumPosts = async () => {
            try {
                const res = await fetch(blog_url);
                const data = await res.json()
                if (!data) {
                    console.log('Error fetching Blogs!')
                }
                setBlogs(data.items)
            } catch (error) {
                console.error("Error fetching Medium posts:", error)
            }
        }
        getMediumPosts()
    }, [])

    return (
        <BlogContext.Provider value={{ blogs }}>
            {children}
        </BlogContext.Provider>
    );
}

