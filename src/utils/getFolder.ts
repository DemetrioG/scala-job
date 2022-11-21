import axios from "../api";
import { IDynamoData } from "../types/types";

const getFolder = async () => {
  const URL = `team/${process.env.CLICKUP_TEAM_ID}/space?archived=false`;

  const {
    data: { spaces },
  } = await axios.get(URL, {
    headers: { Authorization: process.env.CLICKUP_TOKEN },
  });

  const response: IDynamoData[] = spaces.map((e) => {
    return {
      PutRequest: {
        Item: e,
      },
    };
  });

  return response;
};

export default getFolder;
