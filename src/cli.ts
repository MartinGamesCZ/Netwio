import { cmdAdd } from "./commands/add";
import { cmdRemove } from "./commands/remove";
import { log, logError } from "./util/log";

const commands = {
  add: cmdAdd,
  remove: cmdRemove,
};

export function runCommand(argv: string[]) {
  const [command, ...args] = argv;

  if (!command) {
    logError("No command provided!", true);
    return;
  }

  if (!commands[command as keyof typeof commands]) {
    logError(`Command "${command}" not found!`, true);
    return;
  }

  commands[command as keyof typeof commands](args);
}
