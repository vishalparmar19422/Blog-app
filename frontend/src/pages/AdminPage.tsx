import  { useEffect, useState } from "react";
import BlogForm from "../components/BlogForm";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Blogs {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
}

function AdminPage() {
  const Navigate = useNavigate();

  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blogs | null>(null); 
  const apiUrl = import.meta.env.VITE_API_URL;

  
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get(apiUrl);
        setBlogs(res.data.reverse());
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    getBlogs();
  }, []);


  const handleSave = async (data: Partial<Blogs>) => {
    try {
      if (selectedBlog) {
       
        const res = await axios.put(`${apiUrl}/${selectedBlog._id}`, data);
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === selectedBlog._id ? { ...blog, ...res.data } : blog
          )
        );
      } else {
        
        const res = await axios.post(apiUrl, data);
        setBlogs((prevBlogs) => [...prevBlogs, res.data]);
      }
      Navigate(`/`);

      setSelectedBlog(null); 
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

     
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {selectedBlog ? "Edit Post" : "Create New Post"}
        </h2>
        <BlogForm
          onSave={handleSave} 
          onCancel={() => setSelectedBlog(null)} 
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Manage Posts</h2>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-medium">{blog.title}</h3>
              <p className="text-gray-600">{blog.content}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedBlog(blog)} 
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                onClick={async () => {
                  await axios.delete(`${apiUrl}/${blog._id}`);
                  setBlogs((prevBlogs) =>
                    prevBlogs.filter((b) => b._id !== blog._id)
                  );
                }}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
