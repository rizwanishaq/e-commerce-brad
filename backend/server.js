const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} port ${PORT}`.yellow.bold
  );
});
