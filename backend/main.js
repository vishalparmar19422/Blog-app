import express from "express";
import route from "./routes/blog/blogRoute.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv"; // This is correct.
import cors from "cors"


dotenv.config()
connectDB();
const app = express();
app.use(cors()); 

app.use(express.json());
app.use("/api/v1/blog", route);

app.listen(3000, () => {
  console.log("running at port 3000");
});
