import { readFileSync } from "fs";
import { createIfNotExists, Format, getPath, Path } from "../util/path";

export function initConfig() {
  createIfNotExists(getPath(Path.Root), Format._Folder);
  createIfNotExists(getPath(Path.Config), Format.Json);
  createIfNotExists(getPath(Path.Routes), Format.Json);
}

export function readRoutes() {
  return JSON.parse(readFileSync(getPath(Path.Routes), "utf-8"));
}
