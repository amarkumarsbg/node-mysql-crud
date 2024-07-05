const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");

//configure dotenv
dotenv.config();

//rest object

const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("/api/v1/student", require("./routes/studentsRoutes"));
app.get("/test", (req, res) => {
  res.status(200).send("<h1>welcome to here and </h1>");
});

//port
const PORT = process.env.PORT || 8000;

//conditionally listen

mySqlPool
  .query("SELECT 1")
  .then(() => {
    //MY SQL
    console.log("MYSQL DB Connected".bgCyan.white);
    //listen
    app.listen(PORT, () => {
      console.log(`server Running on port ${process.env.PORT}`.bgMagenta.white);
    });
  })
  .catch((error) => {
    console.log(error);
  });
