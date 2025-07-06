const { expressjwt: expressJwt } = require("express-jwt");
const authenticated = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

module.exports = authenticated;

// const authenticate = (req, res, next) => {
//   // take jwt from cookies
//   const token = req.cookies.token;

//   try {
//     const payload = jwt.verify(token, secret);
//     next();
//   } catch (error) {
//     res.send({ error: "Token is invalid , login again" });
//   }
// };

// module.exports = authenticate;
