import {Router} from "express";

import * as Ctrl from "../controllers/task-controllers";
const router=Router();

router.get("/", Ctrl.getTasks )

router.post("/", Ctrl.postTasks )

router.get("/done", Ctrl.findAllDoneTasks)

router.get("/:id", Ctrl.findOneTask)

router.delete("/:id", Ctrl.deleteTask)

router.put("/:id", Ctrl.updateTask)


export default router;