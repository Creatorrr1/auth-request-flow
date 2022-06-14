const express = require("express");
const jwt = require("jsonwebtoken");
const { verifyToken, createToken } = require("./controller");

const router = express.Router();

router.post("/login", createToken);

router.get("/profile", verifyToken);

module.exports = router;
