import { Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '../../application/usecases/user/login.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(email: string, password: string) {
    return this.loginUseCase.execute(email, password);
  }
}
