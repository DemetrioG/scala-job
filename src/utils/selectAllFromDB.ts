import AWS from "aws-sdk";

import { CONFIG } from "../config";
import { TData } from "../types/types";

AWS.config.update(CONFIG.aws);
const DYNAMODB = new AWS.DynamoDB.DocumentClient();

const selectAllFromDB = async (
  tableName: TData
): Promise<AWS.DynamoDB.DocumentClient.ItemList | undefined> => {
  return new Promise((resolve, reject) => {
    try {
      const params = {
        TableName: tableName,
        Select: "ALL_ATTRIBUTES",
      };

      DYNAMODB.scan(params, (err, data) => {
        if (!err) {
          resolve(data.Items);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

export default selectAllFromDB;
