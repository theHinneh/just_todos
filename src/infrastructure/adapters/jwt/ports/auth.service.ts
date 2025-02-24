import { Request } from 'express';

interface UserRequest extends Request {
  user?: {
    sub?: string;
    email?: string;
  };
}

export const GetSubFromToken = (request: UserRequest): string | null => {
  if (request.user && request.user.sub) {
    return request.user.sub;
  }
  return null;
};
