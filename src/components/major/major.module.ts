import { Module } from '@nestjs/common';
import { MajorController } from './major.controller';
import { MajorService } from './major.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Major_Schema } from 'src/models/major.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Major', schema: Major_Schema }
    ])
  ],
  controllers: [MajorController],
  providers: [MajorService]
})
export class MajorModule { }
