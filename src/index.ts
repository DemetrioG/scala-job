import dotenv from "dotenv";
import getAllTasks from "./utils/getAllTasks";
import getFolderLists from "./utils/getFolderLists";
import getFolder from "./utils/getFolder";
import getTags from "./utils/getTags";
import getTeam from "./utils/getTeam";
import writeIntoDB from "./utils/writeIntoDB";
import getFields from "./utils/getFields";
import updateFieldIntoDB from "./utils/updateFieldIntoDB";
dotenv.config();

const timeZone = { timeZone: "America/Sao_Paulo" };

const refreshAllTasks = async () => {
  console.log(
    `Atualizando Tasks ${new Date().toLocaleString("pt-BR", timeZone)}`
  );
  const [pks, data] = await getAllTasks();
  await writeIntoDB("clickup_tasks", data);
  return console.log(
    `Tasks atualizadas ${new Date().toLocaleString("pt-BR", timeZone)}`
  );
};

const refreshFolderLists = async () => {
  console.log(
    `Atualizando Lista de Pastas ${new Date().toLocaleString(
      "pt-BR",
      timeZone
    )}`
  );
  const [pks, data] = await getFolderLists();
  await writeIntoDB("clickup_folder_lists", data);
  return console.log(
    `Lista de pastas atualizadas ${new Date().toLocaleString(
      "pt-BR",
      timeZone
    )}`
  );
};

const refreshTags = async () => {
  console.log(
    `Atualizando Tags ${new Date().toLocaleString("pt-BR", timeZone)}`
  );
  const [pks, data] = await getTags();
  await writeIntoDB("clickup_tags", data);
  return console.log(
    `Tags atualizadas ${new Date().toLocaleString("pt-BR", timeZone)}`
  );
};

const refreshTeam = async () => {
  console.log(
    `Atualizando Time ${new Date().toLocaleString("pt-BR", timeZone)}`
  );
  const [pks, data] = await getTeam();
  await writeIntoDB("clickup_team", data);
  return console.log(
    `Time atualizado ${new Date().toLocaleString("pt-BR", timeZone)}`
  );
};

const refreshFolder = async () => {
  console.log(
    `Atualizando Pastas ${new Date().toLocaleString("pt-BR", timeZone)}`
  );
  const [pks, data] = await getFolder();
  await writeIntoDB("clickup_folders", data);
  return console.log(
    `Pastas atualizadas ${new Date().toLocaleString("pt-BR", timeZone)}`
  );
};

const refreshFields = async () => {
  console.log(
    `Atualizando Campos ${new Date().toLocaleString("pt-BR", timeZone)}`
  );
  const data = await getFields();

  for (const { id, attachments, subtasks } of data) {
    const params = {
      UpdateExpression: `SET attachments = :attachments${
        subtasks ? ", subtasks = :subtasks" : ""
      }`,
      ExpressionAttributeValues: {
        ":attachments": attachments,
      },
    };

    if (subtasks) {
      params.ExpressionAttributeValues[":subtasks"] = subtasks;
    }

    await updateFieldIntoDB("clickup_tasks", "id", id, params);
  }

  return console.log(
    `Campos atualizados ${new Date().toLocaleString("pt-BR", timeZone)}`
  );
};

const refreshDatabase = async () => {
  const result = await Promise.allSettled([
    refreshAllTasks(),
    refreshFolderLists(),
    refreshTags(),
    refreshTeam(),
    refreshFolder(),
  ]);

  const error = result.some(({ status }) => status === "rejected");

  if (error) {
    return console.log(result);
  } else {
    await refreshFields();
    return console.log(
      `Dados atualizados ${new Date().toLocaleString("pt-BR", timeZone)}`
    );
  }
};
refreshDatabase();
