import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const coki = req.cookies.cookie;

  if (!coki) {
    return next();
  }

  const decoded = jwt.verify(coki, process.env.SECRET_JWT);
  console.log(decoded, "---------");
  req.usuario = decoded;

  next();
};

export { verifyToken };
