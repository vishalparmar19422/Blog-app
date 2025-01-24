import { Newspaper, Search, } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";

interface Blog {
  _id: number;
  title: string;
  content: string;
  tags: string[];
}
function HomePage() {
  const apiUrl = import.meta.env.VITE_API_URL;

   const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Blog[]>([]);

  const getBlogs = async () => {
    try {
      const res = await axios.get(apiUrl);
      setBlogs(res.data.reverse());
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredPosts(blogs);
      return;
    }

    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query))
    );
    setFilteredPosts(filtered);
  }, [searchQuery, blogs]);

  return (
    <div className="max-w-4xl mx-auto py-4 px-3">
      <div className="flex items-center justify-center mb-8">
        <Newspaper className="h-8 w-8 text-blue-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
      </div>
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          type="text"
          placeholder="Search by title or tags..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="space-y-6">
        {filteredPosts.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
        {filteredPosts.length === 0 && (
          <div className="text-center py-8">
            {searchQuery ? (
              <p className="text-gray-500">No posts found matching your search.</p>
            ) : (
              <p className="text-gray-500">No posts yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
