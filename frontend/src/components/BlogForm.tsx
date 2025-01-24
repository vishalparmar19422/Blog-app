import { useEffect, useState } from "react";

interface Blogs {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

function BlogForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: Partial<Blogs>;
  onSave: (data: Partial<Blogs>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill the form when initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setTags(initialData.tags?.join(", ") || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const tagsArray = tags.split(",").map((tag) => tag.trim());
    onSave({ title, content, tags: tagsArray });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700"
        >
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? "Loading..." : initialData ? "Update Post" : "Create Post"}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BlogForm;
