import AWS from "aws-sdk";
import { CONFIG } from "../config";
import { TData } from "../types/types";

AWS.config.update(CONFIG.aws);
const DYNAMODB = new AWS.DynamoDB.DocumentClient();

const insertIntoDB = async (collection: TData, data: object[]) => {
  for (let index = 0; index < data.length; index = index + 24) {
    const filteredData = data.slice(index, index + 24);
    const params = {
      RequestItems: {
        [collection]: filteredData,
      },
    };

    try {
      await DYNAMODB.batchWrite(params).promise();
    } catch (err) {
      console.log(err);
    }
  }
};

export default insertIntoDB;
