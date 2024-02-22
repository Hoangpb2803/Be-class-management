import { Body, Controller, Get } from '@nestjs/common';
import { LoginDto } from 'src/dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get('login')
    async login(@Body() data: LoginDto) {
        return this.authService.login(data)
    }

    @Get('refresh-token')
    updateToken(@Body("refreshToken") refreshToken: string) {
        return this.authService.generateNewToken(refreshToken)
    }
}
