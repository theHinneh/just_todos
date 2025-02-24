import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';

export interface UserRepository {
  createUser(user: User): Promise<UserDto>;

  login(email: string, password: string): Promise<UserDto | null>;

  getUsers(users: string[]): Promise<UserDto[]>;

  getUserById(id: string): Promise<UserDto | null>;

  getUserByEmail(email: string): Promise<UserDto | null>;

  updateUser(user: Partial<User>): Promise<UserDto | null>;

  deleteUser(id: string): Promise<void>;

  resetPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<string | null>;
}
