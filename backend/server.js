import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./Routes/userRoute.js";
import ProductRoute from "./Routes/productRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

// Get the current file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = path.dirname(__filename);

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
app.use(cors());

// Routes
app.use("/api/users", UserRoute);
app.use("/api/product", ProductRoute);

// error Middleware
app.use(errorHandler);

////////////////////////////////////////////////////////////////////////
//-------------------------deployment---------------------------------//

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "client/build")));
  // The catch-all handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
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
