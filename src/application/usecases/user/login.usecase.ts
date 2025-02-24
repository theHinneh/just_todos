import { Inject } from '@nestjs/common';
import { UserRepository } from '../../../domain/ports/user.repository';
import { UserDto } from '../../../domain/dto/user.dto';

export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string, password: string): Promise<UserDto | null> {
    return this.userRepository.login(email, password);
  }
}
