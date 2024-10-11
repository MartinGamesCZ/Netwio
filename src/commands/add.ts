import { isIPv4 } from "net";
import { logError } from "../util/log";
import { readRoutes, writeRoutes } from "../configuration";
import { restartService } from "../connector/service";

export async function cmdAdd(args: string[]) {
  const [hostname, target_addr, target_port] = args;

  if (
    !hostname ||
    !target_addr ||
    !isIPv4(target_addr) ||
    (target_port && isNaN(+target_port))
  ) {
    logError("Usage: netwio add <hostname> <ip> [port (default 80/443)]", true);
    return;
  }

  console.log("Adding route...");

  const config = readRoutes();

  if (config.routes.some((route: any) => route.hostname === hostname)) {
    logError("Hostname already used!", true);
    return;
  }

  config.routes.push({
    hostname,
    target_addr,
    target_port: target_port ? +target_port : 80,
  });

  writeRoutes(config);

  console.log("Route added!");

  await restartService();

  console.log("Done!");
}
