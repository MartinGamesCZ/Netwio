import axios from "axios";
import { initConfig } from "./configuration";
import { isServiceRunning } from "./connector/service";
import { startRouter } from "./router";
import { launchService } from "./service";
import { log, logError } from "./util/log";
import { isRoot } from "./util/root";
import { runCommand } from "./cli";

if (!isRoot()) logError("You must run this script as root!", true);

if (process.argv.includes("--service")) await launchService();
else {
  const isRunning = await isServiceRunning();

  if (!isRunning) logError("Service is not running!", true);

  runCommand(process.argv.slice(2));
}
