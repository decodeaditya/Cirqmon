import { createContext, useContext, useEffect, useState } from "react";

const BlogContext = createContext();
export const useBlog = () => useContext(BlogContext);

export function BlogProvider({ children }) {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getMediumPosts = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/blogs');
                const data = await res.json()
                if (!data) {
                    console.log('Error fetching Blogs!')
                }
                setBlogs(data || []);
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

