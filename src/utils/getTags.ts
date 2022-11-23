import axios from "../api";
import { IDynamoDeleteData, IDynamoPutData } from "../types/types";
import selectAllFromDB from "./selectAllFromDB";

const getTagsFromDB = async () => {
  const tableData = await selectAllFromDB("clickup_tags");
  const response = tableData?.map(({ name }) => {
    return {
      DeleteRequest: {
        Key: {
          name: name,
        },
      },
    };
  });

  return response as IDynamoDeleteData[];
};

const getTagsFromClickup = async () => {
  const URL = "space/3043219/tag";

  const {
    data: { tags },
  } = await axios.get(URL, {
    headers: { Authorization: process.env.CLICKUP_TOKEN },
  });

  const response: IDynamoPutData[] = tags.map((e) => {
    return {
      PutRequest: {
        Item: e,
      },
    };
  });

  return response;
};

const getTags = async () => {
  const currentData = await getTagsFromDB();
  const newData = await getTagsFromClickup();
  return [currentData, newData];
};

export default getTags;
