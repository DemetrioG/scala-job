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
  return writeIntoDB("clickup_tasks", data);
};

const refreshFolderLists = async () => {
  const [pks, data] = await getFolderLists();
  await writeIntoDB("clickup_folder_lists", pks);
  return writeIntoDB("clickup_folder_lists", data);
};

const refreshTags = async () => {
  const [pks, data] = await getTags();
  await writeIntoDB("clickup_tags", pks);
  return writeIntoDB("clickup_tags", data);
};

const refreshTeam = async () => {
  const [pks, data] = await getTeam();
  await writeIntoDB("clickup_team", pks);
  return writeIntoDB("clickup_team", data);
};

const refreshFolder = async () => {
  const [pks, data] = await getFolder();
  await writeIntoDB("clickup_folders", pks);
  return writeIntoDB("clickup_folders", data);
};

const refreshDatabase = async () => {
  const BRDate = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  console.log(`Atualizando dados ${BRDate}`);

  return Promise.allSettled([
    refreshAllTasks(),
    refreshFolderLists(),
    refreshTags(),
    refreshTeam(),
    refreshFolder(),
  ])
    .then((result) => {
      const error = result.some(({ status }) => status === "rejected");
      error ? console.log(result) : console.log(`Dados atualizados ${BRDate}`);
    })
    .catch((error) => console.log(error));
};
refreshDatabase();
