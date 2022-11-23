import axios from "../api";
import { IDynamoPutData, IDynamoDeleteData } from "../types/types";
import selectAllFromDB from "./selectAllFromDB";

const getTeamFromDB = async () => {
  const tableData = await selectAllFromDB("clickup_team");
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

const getTeamFromClickup = async () => {
  const URL = "team";

  const {
    data: { teams },
  } = await axios.get(URL, {
    headers: { Authorization: process.env.CLICKUP_TOKEN },
  });

  const response: IDynamoPutData[] = teams.map((e) => {
    return {
      PutRequest: {
        Item: e,
      },
    };
  });

  return response;
};

const getTeam = async () => {
  const currentData = await getTeamFromDB();
  const newData = await getTeamFromClickup();
  return [currentData, newData];
};

export default getTeam;
