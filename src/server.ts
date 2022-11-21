import dotenv from "dotenv";
import { getAllTasks } from "./utils/getAllTasks";
import getFolderLists from "./utils/getFolderLists";
import getFolder from "./utils/getFolder";
import getTags from "./utils/getTags";
import getTeam from "./utils/getTeam";
import insertIntoDB from "./utils/insertIntoDB";
dotenv.config();

const refreshAllTaks = async () => {
  const tasks = await getAllTasks();
  insertIntoDB("clickup_tasks", tasks);
};

const refreshFolderLists = async () => {
  const folders = await getFolderLists();
  insertIntoDB("clickup_folder_lists", folders);
};

const refreshTags = async () => {
  const tags = await getTags();
  insertIntoDB("clickup_tags", tags);
};

const refreshTeam = async () => {
  const team = await getTeam();
  insertIntoDB("clickup_team", team);
};

const refreshFolder = async () => {
  const spaces = await getFolder();
  insertIntoDB("clickup_folders", spaces);
};

// refreshAllTaks();
// refreshFolders();
// refreshTags();
// refreshTeam();
refreshFolder();
