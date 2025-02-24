import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../../../../domain/ports/user.repository';
import { User } from '../../../../domain/entities/user.entity';
import {
  EncryptPassword,
  VerifyPassword,
} from '../../../config/encription.config';
import { UserDto } from '../../../../domain/dto/user.dto';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: User): Promise<UserDto> {
    try {
      const todoEntity = await this.toEntity(user);
      const saveUser = await this.typeOrmRepository.save(todoEntity);
      return this.toDomain(saveUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          'Could not create user',
          error.message,
        );
      }
      throw new InternalServerErrorException('Could not create user');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.typeOrmRepository.delete(id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Could not delete user with id ${id}`,
          error.message,
        );
      }
      throw new InternalServerErrorException(
        `Could not delete user with id ${id}`,
      );
    }
  }

  async getUserById(id: string): Promise<UserDto | null> {
    try {
      const user = await this.typeOrmRepository.findOne({ where: { id } });
      return user ? this.toDomain(user) : null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Could not fetch user with id ${id}`,
          error.message,
        );
      }
      throw new InternalServerErrorException(
        `Could not fetch user with id ${id}`,
      );
    }
  }

  async getUserByEmail(email: string): Promise<UserDto | null> {
    try {
      const user = await this.typeOrmRepository.findOne({ where: { email } });
      return user ? this.toDomain(user) : null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Could not fetch user with email ${email}`,
          error.message,
        );
      }
      throw new InternalServerErrorException(
        `Could not fetch user with email ${email}`,
      );
    }
  }

  async getUsers(users: string[]): Promise<UserDto[]> {
    try {
      let usersList: UserEntity[];
      if (users.length === 0) {
        usersList = await this.typeOrmRepository.find();
      } else {
        usersList = await this.typeOrmRepository.findBy({
          id: In(users),
        });
      }
      return usersList.map((v) => this.toDomain(v));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          'Could not fetch users',
          error.message,
        );
      }
      throw new InternalServerErrorException('Could not fetch users');
    }
  }

  async login(email: string, password: string): Promise<UserDto | null> {
    try {
      const user = await this.typeOrmRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('Invalid email or password');
      }

      const isPasswordValid = await VerifyPassword(password, user.password);
      if (!isPasswordValid) {
        throw new NotFoundException('Invalid email or password');
      }

      return this.toDomain(user);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          'Could not login user',
          error.message,
        );
      }
      throw new InternalServerErrorException('Could not login user');
    }
  }

  async resetPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<string | null> {
    try {
      if (oldPassword === newPassword) {
        return null;
      }
      if (newPassword !== confirmPassword) {
        return null;
      }

      const user = await this.typeOrmRepository.findOne({ where: { id } });
      if (!user) {
        return null;
      } else {
        const isPasswordValid = await VerifyPassword(
          user.password,
          oldPassword,
        );
        if (!isPasswordValid) {
          return null;
        }

        user.password = await EncryptPassword(newPassword);
        await this.typeOrmRepository.update(id, user);
      }

      return 'success';
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          'Could not reset password',
          error.message,
        );
      }
      throw new InternalServerErrorException('Could not reset password');
    }
  }

  async updateUser(user: Partial<User>): Promise<UserDto | null> {
    try {
      await this.typeOrmRepository.update(user.id as string, user);
      const updatedUser = await this.typeOrmRepository.findOne({
        where: { id: user.id },
      });
      if (!updatedUser) {
        return null;
      }
      return this.toDomain(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Could not update user with id ${user.id}`,
          error.message,
        );
      }
      throw new InternalServerErrorException(
        `Could not update user with id ${user.id}`,
      );
    }
  }

  private toDomain(userEntity: UserEntity): UserDto {
    return new UserDto(
      userEntity.id,
      userEntity.firstname,
      userEntity.lastname,
      userEntity.email,
      userEntity.phone,
    );
  }

  private async toEntity(user: User): Promise<UserEntity> {
    const todoEntity = new UserEntity();
    todoEntity.id = user.id;
    todoEntity.firstname = user.firstname;
    todoEntity.lastname = user.lastname;
    todoEntity.email = user.email;
    todoEntity.phone = user.phone;
    todoEntity.password = await EncryptPassword(user.password);
    todoEntity.createdAt = new Date();
    todoEntity.updatedAt = new Date();
    return todoEntity;
  }
}
