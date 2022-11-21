import dotenv from "dotenv";
import { getAllTasks } from "./utils/getAllTasks";
import insertIntoDB from "./utils/insertIntoDB";
dotenv.config();

const refreshAllTaks = async () => {
  const tasks = await getAllTasks();
  insertIntoDB("clickup_tasks", tasks);
};

refreshAllTaks();
