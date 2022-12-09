import axios from "../api";
import { sleep } from "./helpers";

interface IFields {
  id: string;
  attachments: Array<object>;
  subtasks?: Array<object>;
}

const getAllKeyTasksFromDB = async () => {
  const URL = `${process.env.SERVER_BASE_URL}/tasks?include_subtasks=false`;

  const { data } = await axios.get(URL, {
    headers: { Authorization: process.env.CLICKUP_TOKEN },
  });

  const pks: string[] = data.map(({ id }) => id);

  return pks;
};

const getFields = async () => {
  const pks = await getAllKeyTasksFromDB();
  const data: IFields[] = [];

  for (const [i, pk] of pks.entries()) {
    const URL = `task/${pk}?include_subtasks=true`;

    await sleep(500);
    const {
      data: { attachments, id, subtasks },
    } = await axios.get(URL, {
      headers: { Authorization: process.env.CLICKUP_TOKEN },
    });

    const json = {
      id: id,
      attachments: attachments,
    };

    if (subtasks) {
      json["subtasks"] = subtasks;
    }

    data.push(json);
  }

  return data;
};

export default getFields;
