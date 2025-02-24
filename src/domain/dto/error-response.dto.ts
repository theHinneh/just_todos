import { ErrorResponseType } from '../types/error-response.type';

export class ErrorResponse {
  public status: string;
  public message: string;
  public error?: unknown;

  constructor({ status, message, error }: ErrorResponseType) {
    this.status = status;
    this.message = message;
    this.error = error;
  }
}
