import { log } from "console";
import { initConfig, readRoutes } from "./configuration";
import { startRouter } from "./router";
import { addHost, getHosts, purgeHosts } from "./configuration/hosts";
import { INTERNAL_IP } from "./config";

export async function launchService() {
  log("Launching service...");

  log("Initializing configuration...");
  initConfig();

  log("Adding hosts...");

  purgeHosts();

  const routes = readRoutes();

  routes.routes.forEach((route: any) =>
    addHost(
      route.hostname,
      INTERNAL_IP,
      `NETWIO::${route.hostname}::${route.target_addr}@${route.target_port}`
    )
  );

  addHost("service.netwio.local", INTERNAL_IP, "NETWIO::INTERNAL::SERVICE");

  log("Starting router...");
  await startRouter();

  log("Service launched!");
}
