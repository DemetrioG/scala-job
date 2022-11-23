import axios from "../api";
import { IDynamoDeleteData, IDynamoPutData } from "../types/types";
import selectAllFromDB from "./selectAllFromDB";

const getFolderListsFromDB = async () => {
  const tableData = await selectAllFromDB("clickup_folder_lists");
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

const getFolderListsFromClickup = async () => {
  const URL = "folder/16840670/list?archived=false";

  const {
    data: { lists },
  } = await axios.get(URL, {
    headers: { Authorization: process.env.CLICKUP_TOKEN },
  });

  const response: IDynamoPutData[] = lists.map((e) => {
    return {
      PutRequest: {
        Item: e,
      },
    };
  });

  return response;
};

const getFolderLists = async () => {
  const currentData = await getFolderListsFromDB();
  const newData = await getFolderListsFromClickup();
  return [currentData, newData];
};

export default getFolderLists;
