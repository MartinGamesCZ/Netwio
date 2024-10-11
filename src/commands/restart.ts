import { restartService } from "../connector/service";

export async function cmdRestart(args: string[]) {
  await restartService();

  console.log("Done!");
}
