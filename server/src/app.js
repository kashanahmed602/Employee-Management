const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
})


app.post("/api/v1/auth/login", (req, res) => {
    res.json({
        success: true,
        message: "Direct login route working"
    });
});

app.use("/api/v1", require("./Route/authRoute"));
app.use("/api/v1", require('./Route/employees'));
app.use("/api/v1", require('./Route/taskRoute'));


module.exports = app;