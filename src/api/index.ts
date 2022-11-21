import defaultAxios from "axios";
import { CONFIG } from "../config";

const axios = defaultAxios.create({
  baseURL: CONFIG.clickup.urlBase,
  timeout: 30000,
});

export default axios;
