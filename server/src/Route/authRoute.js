const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require('../Controller/authController');

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth Route Working"
    });
});



module.exports = router;