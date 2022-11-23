import dotenv from "dotenv";
import getAllTasks from "./utils/getAllTasks";
import getFolderLists from "./utils/getFolderLists";
import getFolder from "./utils/getFolder";
import getTags from "./utils/getTags";
import getTeam from "./utils/getTeam";
import writeIntoDB from "./utils/writeIntoDB";
dotenv.config();

const refreshAllTasks = async () => {
  const [pks, data] = await getAllTasks();
  await writeIntoDB("clickup_tasks", pks);
  writeIntoDB("clickup_tasks", data);
};

const refreshFolderLists = async () => {
  const [pks, data] = await getFolderLists();
  await writeIntoDB("clickup_folder_lists", pks);
  writeIntoDB("clickup_folder_lists", data);
};

const refreshTags = async () => {
  const [pks, data] = await getTags();
  await writeIntoDB("clickup_tags", pks);
  writeIntoDB("clickup_tags", data);
};

const refreshTeam = async () => {
  const [pks, data] = await getTeam();
  await writeIntoDB("clickup_team", pks);
  writeIntoDB("clickup_team", data);
};

const refreshFolder = async () => {
  const [pks, data] = await getFolder();
  await writeIntoDB("clickup_folders", pks);
  writeIntoDB("clickup_folders", data);
};

// refreshAllTasks();
// refreshFolderLists();
// refreshTags();
// refreshTeam();
// refreshFolder();
