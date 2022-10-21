import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import multer from "multer";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

//const upload = multer({dest: './uploads/'})

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.get("/", (req, res) => {
  res.json("hello this is backend homepage");
});
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Backend running");
});
