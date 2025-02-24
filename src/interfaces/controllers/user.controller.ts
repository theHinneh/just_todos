import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUseCase } from '../../application/usecases/user/login.usecase';
import { SuccessResponse } from '../../domain/dto/success-response.dto';
import { UserDto } from '../../domain/dto/user.dto';
import { ErrorResponse } from '../../domain/dto/error-response.dto';
import { GenerateTokenService } from '../../infrastructure/adapters/jwt/ports/generate-token.service';
import { User } from '../../domain/entities/user.entity';
import { SignupUseCase } from '../../application/usecases/user/signup.usecase';
import { Public } from '../../infrastructure/config/public-route.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly generateToken: GenerateTokenService,
    private readonly signupUseCase: SignupUseCase,
  ) {}

  @Public()
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<SuccessResponse<UserDto | null>> {
    try {
      const user = await this.loginUseCase.execute(email, password);

      if (!user) {
        throw new HttpException(
          new ErrorResponse({
            status: 'error',
            message: 'Could not log in user',
            error: 'User not found',
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      const jwtPayload = { sub: user.id, email: user.email };
      const access_token = await this.generateToken.execute(jwtPayload);

      return new SuccessResponse({
        data: user,
        status: HttpStatus.OK,
        message: 'User logged in successfully',
        access_token,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new HttpException(
          new ErrorResponse({
            status: 'error',
            message: 'Could not log in user',
            error: error.message,
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        new ErrorResponse({
          status: 'error',
          message: 'Could not log in user',
          error: 'Unknown error',
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Post('signup')
  async signup(@Body() data: User): Promise<SuccessResponse<UserDto>> {
    try {
      const user = await this.signupUseCase.execute(data);
      const jwtPayload = { sub: user.id, email: user.email };
      const access_token = await this.generateToken.execute(jwtPayload);

      return new SuccessResponse({
        data: user,
        status: HttpStatus.CREATED,
        message: 'User created successfully',
        access_token,
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        throw new HttpException(
          new ErrorResponse({
            status: 'error',
            message: 'Could not create user',
            error: error.message,
          }),
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        new ErrorResponse({
          status: 'error',
          message: 'Could not create user',
          error: 'Unknown error',
        }),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
