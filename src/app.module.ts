import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './components/auth/auth.module';
import { MajorModule } from './components/major/major.module';
import { StudentModule } from './components/student/student.module';
import { TeacherModule } from './components/teacher/teacher.module';
import { ClassModule } from './components/class/class.module';
import { CourseModule } from './components/course/course.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DB_CONNECTION_STRING
      })
    }),
    AuthModule,
    MajorModule,
    StudentModule,
    TeacherModule,
    ClassModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
