import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroService } from './superhero.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Superhero } from '../entities/superhero.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../dtos/pagination.dto';

describe('SuperheroService', () => {
  let service: SuperheroService;
  let repo: Repository<Superhero>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroService,
        {
          provide: getRepositoryToken(Superhero),
          useClass: Repository, // or a mock class
        },
      ],
    }).compile();

    service = module.get<SuperheroService>(SuperheroService);
    repo = module.get<Repository<Superhero>>(getRepositoryToken(Superhero));
  });

  describe('create', () => {
    it('should create and save a superhero', async () => {
      const dto = { nickname: 'Batman' } as any;
      const created = { id: 1, nickname: 'Batman' } as Superhero;

      jest.spyOn(repo, 'create').mockReturnValue(created);
      jest.spyOn(repo, 'save').mockResolvedValue(created);

      const result = await service.create(dto);

      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(created);
      expect(result).toEqual(created);
    });
  });

  describe('findOne', () => {
    it('should return superhero if found', async () => {
      const hero = { id: 1, nickname: 'Superman' } as Superhero;
      jest.spyOn(repo, 'findOne').mockResolvedValue(hero);

      const result = await service.findOne(1);
      expect(result).toEqual(hero);
    });

    it('should throw NotFoundException if not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return paginated superheroes', async () => {
      const mockData = [
        { id: 1, nickname: 'Hero1', images: [{ path: '/img1.png' }] },
        { id: 2, nickname: 'Hero2', images: [] },
      ];

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([mockData, 2]),
      };

      jest
        .spyOn(repo, 'createQueryBuilder')
        .mockReturnValue(mockQueryBuilder as any);

      const paginationDto = new PaginationDto();
      paginationDto.page = 1;
      paginationDto.limit = 10;
      const result = await service.findAll(paginationDto);

      expect(repo.createQueryBuilder).toHaveBeenCalledWith('superhero');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalled();
      expect(result.data.length).toBe(2);
      expect(result.total).toBe(2);
    });
  });
});
