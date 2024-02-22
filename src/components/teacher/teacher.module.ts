import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher_Schema } from 'src/models/teacher.model';
import { User_Schema } from 'src/models/user.model';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Teacher', schema: Teacher_Schema },
      { name: 'User', schema: User_Schema }
    ])
  ],
  controllers: [TeacherController],
  providers: [TeacherService, UserRepository]
})
export class TeacherModule { }
