import express from "express";
import userRoutes from "./routes/userRoutes.js";
import userTareas from "./routes/userTareas.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

const port = 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/tareas", userTareas);

app.use(cors());

app.listen(process.env.PORT || port, () => {
  console.log("ola");
});
