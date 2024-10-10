export function isRoot() {
  return process.getuid && process.getuid() == 0;
}
