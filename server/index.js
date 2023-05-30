import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

// db
import { connectDB } from "./config/database.js";

// routes
import userRoutes from "./routes/routes.user.js";

const app = express();

/* Setting up the server. */

app.use(express.json());
app.use(helmet());

// cors
app.use(cors());

/* This code block is setting up CORS (Cross-Origin Resource Sharing) for the server. It allows
cross-origin requests from any domain by setting the "Access-Control-Allow-Origin" header to "*". It
also sets the allowed headers and methods for the requests. If the request method is "OPTIONS", it
sets the allowed methods and returns a 200 status code. The "next()" function is called to pass
control to the next middleware function. */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(morgan("dev"));

// initial route

app.get("/", (req, res) => {
  res.send("Hello, this is the backend.");
});

// routes
app.use("/api/user", userRoutes);


// listening to server
connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});
