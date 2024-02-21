import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from 'src/dtos/login.dto';
import { RegisterDto } from 'src/dtos/register.dto';
import { AuthService } from './auth.service';
import { ResponseData } from 'src/constants/response-data';
import { I_User } from 'src/interfaces/user.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get('login')
    async login(@Body() data: LoginDto) {
        return this.authService.login(data)
    }

    @Post('register')
    createNewUser(@Body() data: RegisterDto): Promise<ResponseData<I_User>> {
        return this.authService.register(data)
    }

    @Get('refresh-token')
    updateToken(@Body("refreshToken") refreshToken: string) {
        return this.authService.generateNewToken(refreshToken)
    }
}
