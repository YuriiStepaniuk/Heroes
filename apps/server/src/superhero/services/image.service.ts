import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Superhero } from '../entities/superhero.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Superhero)
    private readonly superheroRepository: Repository<Superhero>,
  ) {}

  async uploadForSuperhero(
    superheroId: number,
    filename: string,
  ): Promise<Image> {
    const superhero = await this.superheroRepository.findOneBy({
      id: superheroId,
    });

    if (!superhero) {
      throw new NotFoundException(`Superhero with ID ${superheroId} not found`);
    }

    const image = this.imageRepository.create({
      path: `/uploads/${filename}`,
      superhero,
    });

    return this.imageRepository.save(image);
  }

  async findAll(): Promise<Image[]> {
    return this.imageRepository.find({ relations: ['superhero'] });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.imageRepository.delete(id);
  }
}
