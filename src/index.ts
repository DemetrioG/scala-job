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
  return writeIntoDB("clickup_tasks", data);
};

const refreshFolderLists = async () => {
  const [pks, data] = await getFolderLists();
  return writeIntoDB("clickup_folder_lists", data);
};

const refreshTags = async () => {
  const [pks, data] = await getTags();
  return writeIntoDB("clickup_tags", data);
};

const refreshTeam = async () => {
  const [pks, data] = await getTeam();
  return writeIntoDB("clickup_team", data);
};

const refreshFolder = async () => {
  const [pks, data] = await getFolder();
  return writeIntoDB("clickup_folders", data);
};

const refreshDatabase = async () => {
  const timeZone = { timeZone: "America/Sao_Paulo" };
  console.log(
    `Atualizando dados ${new Date().toLocaleString("pt-BR", timeZone)}`
  );

  return Promise.allSettled([
    refreshAllTasks(),
    refreshFolderLists(),
    refreshTags(),
    refreshTeam(),
    refreshFolder(),
  ])
    .then((result) => {
      const error = result.some(({ status }) => status === "rejected");
      error
        ? console.log(result)
        : console.log(
            `Dados atualizados ${new Date().toLocaleString("pt-BR", timeZone)}`
          );
    })
    .catch((error) => console.log(error));
};
refreshDatabase();
