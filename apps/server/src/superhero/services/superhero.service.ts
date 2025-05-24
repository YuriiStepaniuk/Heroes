import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Superhero } from '../entities/superhero.entity';
import { DeleteResult, FindOptionsRelations, Repository } from 'typeorm';
import { CreateSuperheroDto } from '../dtos/superhero/create-superhero.dto';
import { UpdateSuperheroDto } from '../dtos/superhero/update-superhero.dto';
import { PaginationDto } from '../dtos/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/common/constants/pagination.constants';

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

  async findAll(paginationDto: PaginationDto): Promise<{
    data: { id: number; nickname: string; imagePath?: string }[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  }> {
    const { page = 1, limit = DEFAULT_PAGE_SIZE } = paginationDto;
    const skip = (page - 1) * limit;

    // Query builder to get superheroes with one image path
    const qb = this.superheroRepository
      .createQueryBuilder('superhero')
      .leftJoinAndSelect(
        'superhero.images',
        'image',
        'image.id = (SELECT MIN(i.id) FROM image i WHERE i."superheroId" = "superhero"."id")',
      )
      .select(['superhero.id', 'superhero.nickname', 'image.path'])
      .skip(skip)
      .take(limit);

    const [data, total] = await qb.getManyAndCount();

    const result = data.map((hero) => ({
      id: hero.id,
      nickname: hero.nickname,
      imagePath: hero.images?.[0]?.path,
    }));

    return {
      data: result,
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
    };
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
