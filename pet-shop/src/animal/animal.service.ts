import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Animal } from './animal.entity';
import { Repository } from 'typeorm';
import { AnimalDto } from './animal.dto';

@Injectable()
export class AnimalService {
  constructor(
    @Inject('ANIMAL_REPOSITORY')
    private animalRepository: Repository<Animal>,
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
    if (!animal) {
      throw new NotFoundException(`Animal with id ${id} was not found.`);
    }
    return animal;
  }

  public async createOneAnimal(animal: AnimalDto): Promise<Animal> {
    let createdAnimal = ((
      await this.animalRepository.insert(animal)
    ).identifiers[0]) as AnimalDto;
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