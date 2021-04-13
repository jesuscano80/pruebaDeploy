import { restart } from "nodemon";
import Task from "../models/Task";
import { getPagination} from "../controllers/libs/getPagination";

export const getTasks = async (req, res) => {
  try {
      const {size, page, title}=req.query;
      const condition= title 
      ? {
        title : {$regex : new RegExp(title), $options: "i"}
      }
      : {};
     
      const {limit, offset}=getPagination(page, size);
    const tasks = await Task.paginate(condition,{offset, limit});
    res.send(tasks);
  } catch (error) {
    res.status(500).json("something goes wrong");
  }
};

export const postTasks = async (req, res) => {
    if(!req.body.title){
        return res.status(400).send("el contenido no puede ser vacio")
    }
  try {
    const { title, description, done } = req.body;
    let newTask = new Task({ title, description, done });
    const grabado = await newTask.save();
    res.send(grabado);
  } catch (error) {
    res.status(500).json("something goes wrong");
  }
};

export const findOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskFound = await Task.findById(id);
    if(!taskFound){
        return res.status(404).send("no hay ninguna tarea con ese id")
    }
    res.send(taskFound);
  } catch (error) {
    res.status(500).json("something goes wrong");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);
    res.send(deleted);
  } catch (error) {
    res.status(500).json("something goes wrong");
  }
};

export const findAllDoneTasks = async (req, res) => {
  try {
    const taskFound = await Task.find({ done: true });
    res.send(taskFound);
  } catch (error) {
    res.status(500).json("something goes wrong");
  }
};

export const updateTask = async (req, res) => {
  try {
    const { tittle, description, done } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
    });
    res.send(updatedTask);
  } catch (error) {
    res.status(500).json("something goes wrong");
  }
};
