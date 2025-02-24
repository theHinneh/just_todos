import { SuccessResponseType } from '../types/success-response.type';

export class SuccessResponse<T> {
  public data: T;
  public status: number;
  public message: string;
  public access_token?: string;

  constructor({ data, status, message, access_token }: SuccessResponseType<T>) {
    this.data = data;
    this.status = status;
    this.message = message;
    this.access_token = access_token;
  }
}
