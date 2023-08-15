import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Tests that info method logs the message to the console
  it('test_info_logs_message', () => {
    spyOn(console, 'info');
    const loggerService = new LoggerService();
    loggerService.info('test message');
    expect(console.info).toHaveBeenCalledWith('test message');
  });

  // Tests that the method can be called with a valid warning message and console.warn is called with the correct message
  it('test_valid_warning_message', () => {
    spyOn(console, 'warn');
    const loggerService = new LoggerService();
    const message = 'This is a valid warning message';
    loggerService.warning(message);
    expect(console.warn).toHaveBeenCalledWith(message);
  });

  // Tests that error message is logged to the console when called with a non-empty string input
  it('test_error_with_non_empty_string', () => {
    spyOn(console, 'error');
    const loggerService = new LoggerService();
    loggerService.error('This is an error message');
    expect(console.error).toHaveBeenCalledWith('This is an error message');
  });
});
