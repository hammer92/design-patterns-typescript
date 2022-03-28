import { Logger, ILogObject, ISettingsParam } from "tslog";
import { appendFileSync } from "fs";

function logToTransport(nameFile: string) {
  return (logObject: ILogObject) =>
    appendFileSync(nameFile, JSON.stringify(logObject) + "\n");
}

export class ProxyLogger {
  private _log: Logger;
  constructor(settingsParam: ISettingsParam) {
    this._log = new Logger({
      ...settingsParam,
      printLogMessageInNewLine: false,
      maskValuesOfKeys: [], //["authorization", "password"],
      dateTimePattern: "year-month-day hour:minute:second",
      ignoreStackLevels: 4,
    });
  }

  attachTransport(nameFile: string): void {
    this._log.attachTransport(
      {
        silly: logToTransport(nameFile),
        warn: logToTransport(nameFile),
        trace: logToTransport(nameFile),
        debug: logToTransport(nameFile),
        info: logToTransport(nameFile),
        error: logToTransport(nameFile),
        fatal: logToTransport(nameFile),
      },
      "debug"
    );
  }
  info(...args: unknown[]): ILogObject {
    return this._log.info(...args);
  }
  trace(...args: unknown[]): ILogObject {
    return this._log.trace(...args);
  }
  silly(...args: unknown[]): ILogObject {
    return this._log.silly(...args);
  }
  debug(...args: unknown[]): ILogObject {
    return this._log.debug(...args);
  }
  warn(...args: unknown[]): ILogObject {
    return this._log.warn(...args);
  }
  error(...args: unknown[]): ILogObject {
    return this._log.error(...args);
  }
}
