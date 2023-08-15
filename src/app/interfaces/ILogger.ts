export interface ILogger {
  info(message: string): void;
  warning(warning: string): void;
  error(error: string): void;
}
