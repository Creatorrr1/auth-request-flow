const express = require("express");
const jwt = require("jsonwebtoken");
const { verifyToken, createToken } = require("./controller");

const router = express.Router();
// const secret = process.env.JWT_SECRET;
// const mockUser = {
//   username: "authguy",
//   password: "mypassword",
//   profile: {
//     firstName: "Chris",
//     lastName: "Wolstenholme",
//     age: 43,
//   },
// };

router.post("/login", createToken);

router.get("/profile", verifyToken);

module.exports = router;
