import Elysia from "elysia";
import { INTERNAL_IP } from "../config";
import { readRoutes } from "../configuration";
import axios from "axios";
import { launchService } from "../service";

export async function startRouter() {
  const app = new Elysia({
    serve: {
      hostname: INTERNAL_IP,
    },
  });

  const routes = readRoutes();

  app.get("/$netwio/health", () => "running");
  app.get("/$netwio/restart", () => {
    app.stop();

    console.log("Restarting...");

    launchService();
  });

  app.all("*", async ({ headers, request, path, body }) => {
    const host = headers.host!.split(":")[0];

    const route = routes.routes.find((r: any) => r.hostname === host);

    console.log(
      `Routing ${path} to ${route.target_addr}:${route.target_port} as ${route.target_addr}:${route.target_port}${path}`
    );

    const { data } = await axios({
      method: request.method,
      url: `http://${route.target_addr}:${route.target_port}${path}`,
      data: body,
      headers: headers as any,
      responseType: "stream",
    });

    return data;
  });

  await new Promise((r) => app.listen(80, r));
}
