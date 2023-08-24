import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//crear usuario

const createUser = async (req, res) => {
  const { nombre, email, password } = req.body;
  const prisma = new PrismaClient();
  console.log(nombre, email, password);

  try {
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: await bcrypt.hash(password, 12),
      },
    });

    res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
  }
};

/*ver todos los usuario con sus tareas*/

const viewUsers = async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const usuarios = await prisma.usuario.findMany({
      include: { tareas: true },
    });

    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
  }
};

// const logear

const login = async (req, res) => {
  const prisma = new PrismaClient();
  const { email, password } = req.body;

  const data = await prisma.usuario.findFirst({
    where: {
      email,
    },
  });

  if (!data) {
    const error = new Error("Usuario o password incorrectos");
    return res.status(404).json({ msg: error.message });
  }

  const passwordP = await bcrypt.compare(password, data.password);

  if (!passwordP) {
    const error = new Error("Usuario o password incorrectos");
    return res.status(401).json({ msg: error.message });
  } else {
    const token = jwt.sign({ id: data.id }, process.env.SECRET_JWT, {
      expiresIn: "30d",
    });

     res
      .cookie("cookie", token, {
        expire: 10000,
           
      })
      return res.status(200).json(data);
  }
};

/* borrar todos los usuario */

const deleAllUsers = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const borrados = await prisma.usuario.deleteMany({});
    res.json({ msg: "borrados todos los usuarios" });
  } catch (error) {
    console.log(error);
  }
};

//cerrar sesion

const logout = async (req, res) => {
  const cokis = req.cookies.cookie;
  console.log(cokis, "delete");
  res.clearCookie("cookie");
  res.status(200).json({ msg: "borradp" });
};

//exportar funciones

export { createUser, viewUsers, login, deleAllUsers, logout };
