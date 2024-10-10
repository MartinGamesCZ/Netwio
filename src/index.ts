import axios from "axios";
import { initConfig } from "./configuration";
import { isServiceRunning } from "./connector/service";
import { startRouter } from "./router";
import { launchService } from "./service";
import { log, logError } from "./util/log";
import { isRoot } from "./util/root";

if (!isRoot()) logError("You must run this script as root!", true);

if (process.argv.includes("--service")) await launchService();
else {
  const isRunning = await isServiceRunning();

  if (!isRunning) logError("Service is not running!", true);

  //logError("Invalid arguments!", true);

  console.log("Restarting service...");

  await axios
    .get("http://service.netwio.local/$netwio/restart")
    .catch(() => {});
}
