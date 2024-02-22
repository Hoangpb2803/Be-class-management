import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { E_Message } from 'src/constants/message.enum';
import { ResponseData } from 'src/constants/response-data';
import { LoginDto } from 'src/dtos/login.dto';
import { RegisterDto } from 'src/dtos/register.dto';
import { I_User } from 'src/interfaces/user.interface';
import { AuthRepository } from 'src/repositories/auth.repository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepo: AuthRepository,
    ) { }

    async login(data: LoginDto) {
        const user = await this.authRepo.emailExists(data.email)
        if (!user) {
            throw new HttpException("This email dosen't exist!!! ", HttpStatus.NOT_FOUND)
        }
        const isEqual = await this.authRepo.compareUserInfo(data.password, user.password)
        if (!isEqual) {
            throw new HttpException("Your login information is wrong!!! ", HttpStatus.UNAUTHORIZED)
        }
        const tokens = this.generateAccessToken(user)
        return { ...tokens }
    }

    async register(data: RegisterDto): Promise<ResponseData<I_User>> {
        const checkExist = await this.authRepo.emailExists(data.email)
        if (checkExist) {
            throw new HttpException("This email already exist!!! ", HttpStatus.CONFLICT)
        }
        const new_user = await this.authRepo.createNewUser(data)
        return new ResponseData(HttpStatus.CREATED, E_Message.REGISTER, new_user)
    }

    private generateAccessToken(payload: I_User) {
        const { _id, name, role } = payload
        const access_token = jwt.sign({ _id, name, role }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1m' })
        const refresh_token = jwt.sign({ _id, name, role }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' })

        return { access_token, refresh_token }
    }

    async generateNewToken(refreshToken: string) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
            if (decoded) {
                const payload = {
                    _id: (decoded as jwt.JwtPayload)._id,
                    name: (decoded as jwt.JwtPayload).name,
                    role: (decoded as jwt.JwtPayload).role
                }
                const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1m' })
                return { access_token }
            }
        } catch (error) {
            throw new HttpException("token is invalid!", HttpStatus.UNAUTHORIZED)
        }
    }
}
