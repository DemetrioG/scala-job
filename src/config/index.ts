export const CONFIG = {
  aws: {
    region: "us-east-1",
    endpoint: "http://dynamodb.us-east-1.amazonaws.com",
    access_key_id: process.env.AWS_ACCESS_KEY_ID,
    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
