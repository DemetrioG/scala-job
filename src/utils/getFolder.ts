import axios from "../api";
import { IDynamoDeleteData, IDynamoPutData } from "../types/types";
import selectAllFromDB from "./selectAllFromDB";

const getFolderFromDB = async () => {
  const tableData = await selectAllFromDB("clickup_folders");
  const response = tableData?.map(({ id }) => {
    return {
      DeleteRequest: {
        Key: {
          id: id,
        },
      },
    };
  });

  return response as IDynamoDeleteData[];
};

const getFolderFromClickup = async () => {
  const data: IDynamoPutData[] = [];
  const SPACE_URL = `team/${process.env.CLICKUP_TEAM_ID}/space?archived=false`;

  const {
    data: { spaces },
  } = await axios.get(SPACE_URL, {
    headers: { Authorization: process.env.CLICKUP_TOKEN },
  });

  const ids = spaces.map(({ id }) => id);

  for (const id of ids) {
    const URL = `space/${id}/folder?archived=false`;

    const {
      data: { folders },
    } = await axios.get(URL, {
      headers: { Authorization: process.env.CLICKUP_TOKEN },
    });

    const response: IDynamoPutData[] = folders.map((e) => {
      return {
        PutRequest: {
          Item: e,
        },
      };
    });

    data.push(...response);
  }

  return data;
};

const getFolder = async () => {
  const currentData = await getFolderFromDB();
  const newData = await getFolderFromClickup();
  return [currentData, newData];
};

export default getFolder;
