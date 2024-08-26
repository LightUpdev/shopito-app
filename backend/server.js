import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./Routes/userRoute.js";
import ProductRoute from "./Routes/productRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";

// initialize app with express
const app = express();
// Configuration
dotenv.config();
mongoose.set("strictQuery", false);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://shopito-app-frontend.onrender.com"],
    credentials: true,
  })
);

// Routes
app.use("/api/users", UserRoute);
app.use("/api/product", ProductRoute);

// error Middleware
app.use(errorHandler);

////////////////////////////////////////////////////////////////////////
//-------------------------deployment---------------------------------//
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Home Page...");
  });
}

//-------------------------deployment---------------------------------//

////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
