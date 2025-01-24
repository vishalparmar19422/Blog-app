import blog from "../model/blog.js";

export const getBlogs = async (req, res) => {
  try {
    const blogs = await blog.find();
    res.status(201).json(blogs);
  } catch (error) {
    console.log("error while fetching all the blogs", error);
    res.status(500).json({ msg: "error while fetching all the blogs" });
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blogbyId = await blog.findById(id);
    if (!blogbyId) {
      return res.status(404).json({ msg: "no blog with this id found" });
    }
    res.status(201).json({ blogbyId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error while fetching blog by id" });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const createdBlog = await blog.create({
      title,
      content,
      tags,
      createdAt: new Date(),
    });

    res.status(201).json({ blog: createdBlog });
  } catch (error) {
    res.status(500).json({ msg: "error in server while creating the blog " });
  }
};

export const updateBlogById = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  try {
    const updatedBlog = await blog.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ msg: "blog not found" });
    }
    return res.status(200).json(updatedBlog);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error while updating the blog" });
  }
};

export const deleteBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ msg: "no blog found with this id " });
    }
    res.status(200).json({ message: "Post deleted successfully",deletedBlog });
  } catch (error) {}
};
