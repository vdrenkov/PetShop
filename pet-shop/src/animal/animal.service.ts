import {
    Inject,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';

import { Animal } from './animal.entity';
import { DataSource, In, Repository } from 'typeorm';
import { AnimalDto } from './animal.dto';

  @Injectable()
  export class AnimalService {
    constructor(
      @Inject('ANIMAL_REPOSITORY')
      private animalRepository: Repository<Animal>,
      @Inject('DATA_SOURCE')
      private dataSource: DataSource,
    ) {}

    public async findAllAnimalsByKind(kind:string): Promise<Animal[]> {
      return this.animalRepository.find({
        where: { kind },
      });
    }
  
    public async findOneAnimal(id: number) {
      const animal = await this.animalRepository.findOne({
        where: { id: id },
      });
      return animal;
    }
  
    public async createOneAnimal(animal: AnimalDto): Promise<Animal> {
      let createdAnimal = (await (
        await this.animalRepository.insert(animal)
      ).identifiers[0]) as AnimalDto;
      // createdAnimal = await this.animalRepository.findOne({
      //   where: { id: createdAnimal.id },
      // });
      return createdAnimal;
    }
  
    public async deleteOneAnimal(id: number): Promise<any> {
      let persistedAnimal = await this.animalRepository.findOne({
        where: { id },
      });
      if (!persistedAnimal) {
        throw new NotFoundException(`Animal with id ${id} was not found.`);
      }
      persistedAnimal = (await this.animalRepository.delete({ id }))?.raw;
      return persistedAnimal;
    }
  }
  