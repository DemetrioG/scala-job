import axios from "../api";
import { IDynamoDeleteData, IDynamoPutData } from "../types/types";
import selectAllFromDB from "./selectAllFromDB";

const getAllTasksFromDB = async () => {
  const tableData = await selectAllFromDB("clickup_tasks");
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

const getAllTasksFromClickup = async () => {
  const data: IDynamoPutData[] = [];
  let increment_page = true;
  let index = -1;

  while (increment_page) {
    const URL = `team/${process.env.CLICKUP_TEAM_ID}/task?page=${++index}&subtasks=true`;

    const {
      data: { tasks },
    } = await axios.get(URL, {
      headers: { Authorization: process.env.CLICKUP_TOKEN },
    });

    if (!tasks.length) {
      increment_page = false;
      continue;
    }

    const response: IDynamoPutData[] = tasks.map((e) => {
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

const getAllTasks = async () => {
  const currentData = await getAllTasksFromDB();
  const newData = await getAllTasksFromClickup();
  return [currentData, newData];
};

export default getAllTasks;
