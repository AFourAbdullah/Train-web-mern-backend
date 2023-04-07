const { generateJwt } = require("../controllers/userControllers");

const sendToken = (user, statusCode, res) => {
  const token = user.getToken();
  const options = {
    httpOnly: false,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    sameSite: "none",
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = { sendToken };
