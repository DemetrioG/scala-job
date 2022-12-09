export type TData =
  | "clickup_tasks"
  | "clickup_folder_lists"
  | "clickup_tags"
  | "clickup_team"
  | "clickup_folders";

export interface IDynamoPutData {
  PutRequest: {
    Item: object;
  };
}

export interface IDynamoDeleteData {
  DeleteRequest: {
    Key: object;
  };
}
