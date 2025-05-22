import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Superhero } from '../entities/superhero.entity';
import { DeleteResult, FindOptionsRelations, Repository } from 'typeorm';
import { CreateSuperheroDto } from '../dtos/superhero/create-superhero.dto';
import { UpdateSuperheroDto } from '../dtos/superhero/update-superhero.dto';

@Injectable()
export class SuperheroService {
  constructor(
    @InjectRepository(Superhero)
    private readonly superheroRepository: Repository<Superhero>,
  ) {}
  private readonly relations: FindOptionsRelations<Superhero> = {
    images: true,
  };

  async create(data: CreateSuperheroDto): Promise<Superhero> {
    const hero = this.superheroRepository.create(data);
    return this.superheroRepository.save(hero);
  }

  async findAll(): Promise<Superhero[]> {
    return this.superheroRepository.find({ relations: this.relations });
  }

  async findOne(id: number): Promise<Superhero> {
    const hero = await this.superheroRepository.findOne({
      where: { id },
      relations: this.relations,
    });
    if (!hero) {
      throw new NotFoundException(`Superhero with ID ${id} not found`);
    }
    return hero;
  }

  async update(id: number, data: UpdateSuperheroDto): Promise<Superhero> {
    await this.superheroRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.superheroRepository.delete(id);
  }
}
