import { Router } from "express";
import blog from "../../model/blog.js";
import {
  createBlog,
  getBlogs,
  updateBlogById,
  getBlogById,
  deleteBlogById,
} from "../../controllers/blogController.js";

const route = Router();

route.get("/", getBlogs);
route.get("/:id", getBlogById);
route.post("/", createBlog);
route.put("/:id", updateBlogById);
route.delete("/:id", deleteBlogById);

export default route;
