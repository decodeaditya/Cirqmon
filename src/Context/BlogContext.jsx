import { createContext, useContext, useEffect, useState } from "react";

const BlogContext = createContext();
export const useBlog = () => useContext(BlogContext);

export function BlogProvider({ children }) {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getMediumPosts = async () => {
            try {
                const res = await fetch('/api/blogs');
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

