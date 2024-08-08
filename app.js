require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const courseRoutes = require("./routes/course");
const meetingRoutes = require("./routes/meeting");
const blogRoutes = require("./routes/blog");
const reviewRoutes = require("./routes/review");
const documentRoutes = require("./routes/document");
const roleRoutes = require("./routes/role");
const path = require("path");
const { auth } = require("express-oauth2-jwt-bearer");
const app = express();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mpkcnpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
  .connect(uri)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/files", express.static(path.join(__dirname, "files")));
app.use("/api/roles", roleRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/documents", documentRoutes);

module.exports = app;
