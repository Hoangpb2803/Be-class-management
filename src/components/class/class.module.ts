import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Class_Schema } from 'src/models/class.model';
import { ClassRepository } from 'src/repositories/class.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: "Class", schema: Class_Schema
    }])
  ],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository]
})
export class ClassModule { }
