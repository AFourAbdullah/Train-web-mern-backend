const { generateJwt } = require("../controllers/userControllers");

const sendToken = (user, statusCode, res) => {
  const token = user.getToken();
  const options = {
    origin: "http://192.168.100.29:4000",
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // sameSite: "strict", // set SameSite attribute to "None"
    secure: true, // use Secure attribute for HTTPS connections
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = { sendToken };
