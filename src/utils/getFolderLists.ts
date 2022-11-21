import axios from "../api";
import { IDynamoData } from "../types/types";

const getFolderLists = async () => {
  const URL = "folder/16840670/list?archived=false";

  const {
    data: { lists },
  } = await axios.get(URL, {
    headers: { Authorization: process.env.CLICKUP_TOKEN },
  });

  const response: IDynamoData[] = lists.map((e) => {
    return {
      PutRequest: {
        Item: e,
      },
    };
  });

  return response;
};

export default getFolderLists;
