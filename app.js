require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser=require("cookie-parser");
const bodyParser = require("body-parser");

require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 8000;
const routes = require("./routes/index");
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true}));


// MongoDB connection
const dbURI = process.env.DB_URL; // Replace with your MongoDB URI
mongoose
  .connect(dbURI,{})
  .then((result) => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Require routes
// const userRoutes = require("./routes/user");

// Use routes
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
