export type TData =
  | "clickup_tasks"
  | "clickup_folder_lists"
  | "clickup_tags"
  | "clickup_team"
  | "clickup_folders";

export interface IDynamoData {
  PutRequest: {
    Item: object[];
  };
}
