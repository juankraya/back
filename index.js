import express from "express";
import userRoutes from "./routes/userRoutes.js";
import userTareas from "./routes/userTareas.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();



const corsOptions = {
  origin: "https://carrusel-production.up.railway.app",
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `https://carrusel-production.up.railway.app`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

const port = 4000;
app.use(bodyParser.json());
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/tareas", userTareas);

app.use(cors());

app.listen(process.env.PORT || port, () => {
  console.log("ola");
});
