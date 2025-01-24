import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      requried: [true, "Content is requried"],
    },
    tags: {
      type: [String],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);


const blog = mongoose.model("blog",blogSchema);

export default blog;