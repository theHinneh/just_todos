import * as argon2 from 'argon2';

export const EncryptPassword = async (password: string): Promise<string> => {
  const hashSecret = process.env.HASH_SECRET;
  if (!hashSecret) {
    throw new Error('HASH_SECRET environment variable is not defined');
  }

  return await argon2.hash(password, {
    type: argon2.argon2i,
    memoryCost: 2 ** 16,
    hashLength: 50,
    secret: Buffer.from(hashSecret),
  });
};

export const VerifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const hashSecret = process.env.HASH_SECRET;
  if (!hashSecret) {
    throw new Error('HASH_SECRET environment variable is not defined');
  }

  return await argon2.verify(hash, password, {
    secret: Buffer.from(hashSecret),
  });
};
