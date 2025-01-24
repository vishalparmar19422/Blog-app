import  { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock,  } from "lucide-react";
import axios from "axios";

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: [string];
}

export function BlogPage() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBLog = async () => {
      await axios.get(`${apiUrl}/${id}`).then((res) => {
        setBlog(res.data.blogbyId);
      });
    };
    getBLog();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Posts
      </button>

      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{blog?.title}</h1>

        <div className="flex items-center text-gray-600 mb-8">
          <Clock className="h-4 w-4 mr-2" />
          <time>
            {" "}
            {blog?.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "Unknown Date"}
          </time>
        </div>

        <div className="flex gap-2 mb-8">
          {blog?.tags.map((tag, index) => {
            return (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tag}
              </span>
            );
          })}
        </div>

        <div className="whitespace-pre-wrap">{blog?.content}</div>
      </article>
    </div>
  );
}
