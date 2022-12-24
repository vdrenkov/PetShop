import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AnimalDto } from './animal.dto';
import { AnimalService } from './animal.service';

@Controller('animal')
export class AnimalController {
  constructor(private animalService: AnimalService) { }

  @Get()
  async getAllAnimalsByKind(@Query('kind') kind: string) {
    return await this.animalService.findAllAnimalsByKind(kind);
  }

  @Get(':animalID')
  async getAnimal(@Param('animalID') animalID: number) {
    return await this.animalService.findOneAnimal(animalID);
  }

  @Post()
  async addAnimal(@Body() animal: AnimalDto) {
    return await this.animalService.createOneAnimal(animal);
  }

  @Delete()
  async deleteAnimal(@Query('animalID') animalID: number) {
    return await this.animalService.deleteOneAnimal(animalID);
  }
}