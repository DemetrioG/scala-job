import AWS from "aws-sdk";
import { CONFIG } from "../config";
import { TData } from "../types/types";

AWS.config.update(CONFIG.aws);
const DYNAMODB = new AWS.DynamoDB.DocumentClient();

const updateFieldIntoDB = async (
  tableName: TData,
  key: string,
  value: string,
  params: object
) => {
  const data = {
    TableName: tableName,
    Key: {
      [key]: value,
    },
    ...params,
  };

  try {
    await DYNAMODB.update(data).promise();
  } catch (err) {
    console.log(err);
  }
};

export default updateFieldIntoDB;
