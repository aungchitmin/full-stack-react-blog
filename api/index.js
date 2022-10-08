import express from "express";
import cors from "cors"
import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req,res) => {res.json("hello this is backend homepage")})
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Backend running");
});
