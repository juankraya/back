import { PrismaClient } from "@prisma/client";

const crearTarea = async (req, res) => {
  const { titulo, descripcion } = req.body;
  const prisma = new PrismaClient();
  const { id } = req.usuario;

  try {
    const tarea = await prisma.ejercicio.create({
      data: {
        titulo,
        descripcion,
        usuarioId: id,
      },
    });
    res.status(200).json(tarea);
  } catch (error) {
    console.log(error);
  }
};

/*actualizar*/

const actualizarTarea = async (req, res) => {
  const { titulo, descripcion } = req.body;
  const { id } = req.params;
  const prisma = new PrismaClient();

  try {
    const tareaActualizada = await prisma.ejercicio.update({
      where: {
        id,
      },
      data: {
        titulo,
        descripcion,
      },
    });
    res.status(200).json(tareaActualizada);
  } catch (error) {
    console.log(error);
  }
};

//borrar tareas

const deleteAllTask = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const borrados = await prisma.ejercicio.deleteMany({});
    res.json({ msg: "borrados todas las tareas" });
  } catch (error) {
    console.log(error);
  }
};

//borrar tarea por id
const deleteTaskbyId = async (req, res) => {
  const prisma = new PrismaClient();
  const { id } = req.params;
  const prueba = req.usuario;
  console.log(prueba, "*****");

  try {
    //verificar usuario

    const userDelete = await prisma.usuario.findFirst({
      where: {
        id: req.usuario.id,
      },
    });

    if (!userDelete) {
      const error = new Error("Esta tarea no es del usuario logeado");
      return res.status(404).json({ msg: error.message });
    }

    const taskDelete = await prisma.ejercicio.delete({
      where: {
        id,
      },
    });
    res.status(200).json(taskDelete);
  } catch (error) {
    console.log(error);
  }
};

export { crearTarea, actualizarTarea, deleteAllTask, deleteTaskbyId };

/*eliminar*/
