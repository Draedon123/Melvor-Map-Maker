function outputMessage(
  method: "log" | "info" | "warn" | "error" | "debug",
  prefix: string,
  ...data: unknown[]
): void {
  console[method](`[ ${prefix} ] |`, ...data);
}

function log(prefix: string, ...data: unknown[]): void {
  outputMessage("log", prefix, ...data);
}

function info(prefix: string, ...data: unknown[]): void {
  outputMessage("info", prefix, ...data);
}

function warn(prefix: string, ...data: unknown[]): void {
  outputMessage("warn", prefix, ...data);
}

function error(prefix: string, ...data: unknown[]): void {
  outputMessage("error", prefix, ...data);
}

function debug(prefix: string, ...data: unknown[]): void {
  outputMessage("debug", prefix, ...data);
}

export { log, info, warn, error, debug };
