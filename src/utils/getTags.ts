import axios from "../api";
import { IDynamoData } from "../types/types";

const getTags = async () => {
  const URL = "space/3043219/tag";

  const {
    data: { tags },
  } = await axios.get(URL, {
    headers: { Authorization: process.env.CLICKUP_TOKEN },
  });

  const response: IDynamoData[] = tags.map((e) => {
    return {
      PutRequest: {
        Item: e,
      },
    };
  });

  return response;
};

export default getTags;
