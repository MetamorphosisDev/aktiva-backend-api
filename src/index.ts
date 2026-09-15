import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import postsRoutes from "./routes/posts.routes";
import authRoutes from "./routes/auth.routes";
import categoriesRoutes from "./routes/categories.route";
import bookmarksRoutes from "./routes/bookmarks.routes";
import commentRoutes from "./routes/comment.route"


const app = express();

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/bookmarks", bookmarksRoutes);
app.use("/api/comment", commentRoutes);

// Testing
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "AKTIVA Backend API",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});