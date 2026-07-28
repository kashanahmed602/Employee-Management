const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
})

app.use("/api/auth", require("./Route/authRoute"));
app.use("/api/v1", require('./Route/employees'));
app.use("/api/v1", require('./Route/taskRoute'));


module.exports = app;