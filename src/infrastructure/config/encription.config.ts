import argon2 from 'argon2';
import * as process from 'node:process';

export const EncryptPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, {
    type: argon2.argon2i,
    memoryCost: 2 ** 16,
    hashLength: 50,
    secret: Buffer.from(process.env.HASH_SECRET as string),
  });
};

export const VerifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await argon2.verify(hash, password);
};
