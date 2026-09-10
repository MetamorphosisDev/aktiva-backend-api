import express from "express";
import activityRoutes from "./routes/activity.routes";

const app = express();

const PORT = 3001;

// Middleware
app.use(express.json());

// Routes
app.use("/api/kegiatan", activityRoutes);

// Testing
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Sistem Manajemen Kegiatan Sekolah - API",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});