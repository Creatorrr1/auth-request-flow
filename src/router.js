const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secret = process.env.JWT_SECRET;
const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

router.post("/login", (req, res) => {
  // Create a new JWT; the payload should be an object containing the mock user's username.
  // const token = jwt.sign({ username }, "VerySecret");
  // Don't worry about working with credentials right now.
  // // -> extract username and password from the request body
  const { username, password } = req.body;
  // // -> compare with the user data (mockUser)
  if (username !== mockUser.username && password !== mockUser.password) {
    return res
      .status(400)
      .json({ error: "Password or Username is incorrect!" });
  }
  // // -> if valid create and send back the token
  const token = jwt.sign({ username }, secret);
  // // -> otherwise you'll send back the token
  // Send the JWT back to the client in a JSON response.
  res.json({ token });
});

router.get("/profile", (req, res) => {
  // Get the token from the authorization header of the request.
  const [bearer, token] = req.headers.authorization.split(" ");
  console.log(req.headers.authorization);
  // Use console logs to inspect the req object to figure out how to find this.
  // Use the jsonwebtoken library to verify that the token is valid.
  try {
    const encodedIntoPayload = jwt.verify(token, secret);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
  // Respond with the mock user's profile if the token is valid, or a failure message if it isn't.
  res.json({ Profile: mockUser.profile });
});

module.exports = router;
