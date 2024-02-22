import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student_Schema } from 'src/models/student.model';
import { UserRepository } from 'src/repositories/user.repository';
import { User_Schema } from 'src/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: Student_Schema },
      { name: 'User', schema: User_Schema }
    ])
  ],
  controllers: [StudentController],
  providers: [StudentService, UserRepository]
})
export class StudentModule { }
