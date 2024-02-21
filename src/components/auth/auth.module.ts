import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from 'src/repositories/auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User_Schema } from 'src/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: User_Schema }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository]
})
export class AuthModule { }
