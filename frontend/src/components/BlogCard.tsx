import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BlogCard = ({ blog }: any) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{blog.content}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {blog.tags.map((tag: any, index: any) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link
            to={`/blog/${blog._id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
