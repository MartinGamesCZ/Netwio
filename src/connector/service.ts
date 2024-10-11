import axios from "axios";
import { log } from "../util/log";

export async function isServiceRunning() {
  const { data } = await axios
    .get("http://service.netwio.local/$netwio/health")
    .catch(() => ({
      data: "",
    }));

  return data == "running" ? true : false;
}

export async function restartService() {
  log("Restarting service...");

  await axios
    .get("http://service.netwio.local/$netwio/restart")
    .catch(() => {});
}
