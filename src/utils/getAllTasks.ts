import axios from "../api";
import { IDynamoData } from "../types/types";

export const getAllTasks = async () => {
  const data: IDynamoData[] = [];
  let increment_page = true;
  let index = -1;

  while (increment_page) {
    const URL = `team/${
      process.env.CLICKUP_TEAM_ID
    }/task?custom_task_ids=&team_id=&include_subtasks=true&page=${++index}`;

    const {
      data: { tasks },
    } = await axios.get(URL, {
      headers: { Authorization: process.env.CLICKUP_TOKEN },
    });

    if (!tasks.length) {
      increment_page = false;
      continue;
    }

    const response: IDynamoData[] = tasks.map((e) => {
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
