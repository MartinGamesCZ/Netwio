import { existsSync, mkdirSync, writeFileSync } from "fs";

const paths = {
  root: {
    win32: "C:\\Program Files\\Netwio",
    linux: "/opt/Netwio",
  },
  config: {
    win32: "$root/config.json",
    linux: "$root/config.json",
  },
  routes: {
    win32: "$root/routes.json",
    linux: "$root/routes.json",
  },
};

export enum Path {
  Root = "root",
  Config = "config",
  Routes = "routes",
}

export enum Format {
  Json = "json",
  _Folder = "_folder",
}

const contents = {
  json: "{}",
  _folder: "",
};

export function getPath(path: Path, firstCall = true): string {
  const os = process.platform;

  if (os == "win32") {
    const raw = paths[path].win32;

    if (!firstCall) return raw;

    return raw.replace("$root", getPath(Path.Root, false));
  }

  const raw = paths[path].linux;

  if (!firstCall) return raw;

  return raw.replace("$root", getPath(Path.Root, false));
}

export function createIfNotExists(path: string, format: Format) {
  if (format == Format._Folder) return createFolderIfNotExists(path);

  const processed_path = path.replace("$root", getPath(Path.Root));

  if (!existsSync(processed_path)) {
    writeFileSync(processed_path, contents[format]);
  }
}

function createFolderIfNotExists(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
}
