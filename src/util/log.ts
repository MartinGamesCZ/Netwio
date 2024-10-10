export function log(text: string) {
  console.log(text);
}

export function logError(text: string, crash = false) {
  console.error(text);

  if (crash) {
    process.exit(1);
  }
}
