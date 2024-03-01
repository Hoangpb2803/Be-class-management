import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course_Schema } from 'src/models/course.model';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "Course", schema: Course_Schema
    }])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule { }
