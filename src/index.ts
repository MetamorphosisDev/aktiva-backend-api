import express from "express";

import postsRoutes from "./routes/posts.routes";
import authRoutes from "./routes/auth.routes"

const app = express();

const PORT = 3001;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

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