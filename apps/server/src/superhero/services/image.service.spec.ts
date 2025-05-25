import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';
import { Superhero } from '../entities/superhero.entity';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockImageRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  count: jest.fn(),
  delete: jest.fn(),
});

const mockSuperheroRepository = () => ({
  findOneBy: jest.fn(),
});

const mockConfigService = {
  get: jest.fn().mockReturnValue(3), // maxImagesPerHero = 3
};

describe('ImageService', () => {
  let service: ImageService;
  let imageRepo: jest.Mocked<Repository<Image>>;
  let superheroRepo: jest.Mocked<Repository<Superhero>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        { provide: getRepositoryToken(Image), useFactory: mockImageRepository },
        {
          provide: getRepositoryToken(Superhero),
          useFactory: mockSuperheroRepository,
        },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
    imageRepo = module.get(getRepositoryToken(Image));
    superheroRepo = module.get(getRepositoryToken(Superhero));
  });

  describe('uploadForSuperhero', () => {
    it('should throw error if superhero is not found', async () => {
      superheroRepo.findOneBy.mockResolvedValue(null);
      await expect(service.uploadForSuperhero(1, 'img.jpg')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw error if max image limit is exceeded', async () => {
      superheroRepo.findOneBy.mockResolvedValue({ id: 1 } as Superhero);
      imageRepo.count.mockResolvedValue(3);

      await expect(service.uploadForSuperhero(1, 'img.jpg')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should save and return the image', async () => {
      const superhero = { id: 1 } as Superhero;
      const image = { id: 123, path: '/uploads/img.jpg', superhero } as Image;

      superheroRepo.findOneBy.mockResolvedValue(superhero);
      imageRepo.count.mockResolvedValue(0);
      imageRepo.create.mockReturnValue(image);
      imageRepo.save.mockResolvedValue(image);

      const result = await service.uploadForSuperhero(1, 'img.jpg');
      expect(imageRepo.save).toHaveBeenCalledWith(image);
      expect(result).toEqual(image);
    });
  });

  describe('deleteImageFromSuperhero', () => {
    it('should throw error if image not found', async () => {
      imageRepo.findOne.mockResolvedValue(null);
      await expect(service.deleteImageFromSuperhero(1, 1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw error if image does not belong to superhero', async () => {
      const image = { id: 1, superhero: { id: 999 } } as Image;
      imageRepo.findOne.mockResolvedValue(image);

      await expect(service.deleteImageFromSuperhero(1, 1)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should call delete if everything is valid', async () => {
      const image = { id: 1, superhero: { id: 1 } } as Image;
      imageRepo.findOne.mockResolvedValue(image);
      imageRepo.delete.mockResolvedValue({} as any);

      await service.deleteImageFromSuperhero(1, 1);
      expect(imageRepo.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('findAll', () => {
    it('should return all images with relations', async () => {
      const images = [{ id: 1 }, { id: 2 }] as Image[];
      imageRepo.find.mockResolvedValue(images);

      const result = await service.findAll();
      expect(result).toEqual(images);
    });
  });

  describe('delete', () => {
    it('should call repository delete method', async () => {
      imageRepo.delete.mockResolvedValue({} as any);
      await service.delete(1);
      expect(imageRepo.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('ensureImageLimitNotExceeded', () => {
    it('should throw error if count exceeds maxImages', async () => {
      imageRepo.count.mockResolvedValue(3);
      await expect(service.ensureImageLimitNotExceeded(1)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should pass if count is below maxImages', async () => {
      imageRepo.count.mockResolvedValue(2);
      await expect(
        service.ensureImageLimitNotExceeded(1),
      ).resolves.not.toThrow();
    });
  });
});
