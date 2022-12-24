import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AnimalController } from './animal.controller';
import { animalProviders } from './animal.providers';
import { AnimalService } from './animal.service';


@Module({
  imports: [DatabaseModule],
  controllers: [AnimalController],
  providers: [...animalProviders, AnimalService],
  exports: [],
})
export class AnimalModule {}