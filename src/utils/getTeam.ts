import axios from "../api";
import { IDynamoData } from "../types/types";

const getTeam = async () => {
  const URL = "team";

  const {
    data: { teams },
  } = await axios.get(URL, {
    headers: { Authorization: process.env.CLICKUP_TOKEN },
  });

  const response: IDynamoData[] = teams.map((e) => {
    return {
      PutRequest: {
        Item: e,
      },
    };
  });

  return response;
};

export default getTeam;
