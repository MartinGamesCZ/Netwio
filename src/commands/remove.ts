import { readRoutes, writeRoutes } from "../configuration";
import { restartService } from "../connector/service";
import { logError } from "../util/log";

export async function cmdRemove(args: string[]) {
  const [hostname] = args;

  if (!hostname) {
    logError("Usage: netwio remove <hostname>", true);
    return;
  }

  console.log("Removing route...");

  const config = readRoutes();

  const index = config.routes.findIndex(
    (route: any) => route.hostname === hostname
  );

  if (index === -1) {
    logError("Hostname not found!", true);
    return;
  }

  config.routes.splice(index, 1);

  writeRoutes(config);

  console.log("Route removed!");

  await restartService();

  console.log("Done!");
}
