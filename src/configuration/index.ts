import { readFileSync, writeFileSync } from "fs";
import { createIfNotExists, Format, getPath, Path } from "../util/path";

export function initConfig() {
  createIfNotExists(getPath(Path.Root), Format._Folder);
  createIfNotExists(getPath(Path.Config), Format.Json);
  createIfNotExists(getPath(Path.Routes), Format.Json);
}

export function readRoutes() {
  return JSON.parse(readFileSync(getPath(Path.Routes), "utf-8"));
}

export function writeRoutes(
  data: {
    hostname: string;
    target_addr: string;
    target_port: number;
  }[]
) {
  writeFileSync(getPath(Path.Routes), JSON.stringify(data, null, 2), "utf8");
}
