import { Injectable } from '@angular/core';
import { ILogger } from '../interfaces/ILogger';

@Injectable({
  providedIn: 'root',
})
export class LoggerService implements ILogger {
  constructor() {}

  info(message: string): void {
    console.info(message);
  }
  warning(warning: string): void {
    console.warn(warning);
  }
  error(error: string): void {
    console.error(error);
  }
}
