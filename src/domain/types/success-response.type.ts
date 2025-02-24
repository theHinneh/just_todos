export type SuccessResponseType<T> = {
  data: T;
  status: number;
  message: string;
  access_token?: string;
};
