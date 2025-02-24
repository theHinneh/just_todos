import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/ports/user.repository';
import { UserDto } from '../../../domain/dto/user.dto';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class SignupUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(user: User): Promise<UserDto> {
    return this.userRepository.createUser(user);
  }
}
