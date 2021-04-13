import express from "express";
import taskrutas from "./routes/task-routes";
import morgan from "morgan";
import cors from "cors";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

//Settings
app.set("port", process.env.PORT || 3000);

//Routes
app.use("/api/tasks", taskrutas);
app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

export default app;
