import { readFileSync, writeFileSync } from "fs";
import hosts from "hosts-etc";

export function getHosts() {
  hosts.useCache(false);

  return hosts.get("#netwio").netwio;
}

export function addHost(hostname: string, ip: string, comment: string) {
  hosts.set({
    address: ip,
    host: hostname,
    region: "netwio",
    comment,
  });
}

export function purgeHosts() {
  const content = readFileSync("/etc/hosts", "utf8");

  const lines = content.split("\n");

  let contextOpen = false;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("# region netwio")) {
      contextOpen = !contextOpen;
    } else if (lines[i].includes("# end region")) {
      contextOpen = false;
    }

    if (contextOpen) {
      lines.splice(i, 1);
      i--;
    }
  }

  const newContent = lines.join("\n");

  writeFileSync("/etc/hosts", newContent);
}
