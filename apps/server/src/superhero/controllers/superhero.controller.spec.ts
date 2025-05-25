import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroController } from '../controllers/superhero.controller';
import { SuperheroService } from '../services/superhero.service';
import { ImageService } from '../services/image.service';
import { PaginationDto } from '../dtos/pagination.dto';

describe('SuperheroController', () => {
  let controller: SuperheroController;
  let superheroService: Partial<Record<keyof SuperheroService, jest.Mock>>;
  let imageService: Partial<Record<keyof ImageService, jest.Mock>>;

  beforeEach(async () => {
    superheroService = {
      findAll: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    imageService = {
      uploadForSuperhero: jest.fn(),
      deleteImageFromSuperhero: jest.fn(),
      ensureImageLimitNotExceeded: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroController],
      providers: [
        { provide: SuperheroService, useValue: superheroService },
        { provide: ImageService, useValue: imageService },
      ],
    }).compile();

    controller = module.get<SuperheroController>(SuperheroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return paginated superheroes', async () => {
      const mockResult = {
        data: [],
        total: 0,
        totalPages: 0,
        page: 1,
        limit: 10,
      };
      superheroService.findAll!.mockResolvedValue(mockResult);

      const paginationDto = new PaginationDto();
      paginationDto.page = 1;
      paginationDto.limit = 10;
      const result = await controller.list(paginationDto);
      expect(superheroService.findAll).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
      expect(result).toBe(mockResult);
    });
  });

  describe('create', () => {
    it('should create a superhero', async () => {
      const dto = {
        nickname: 'HeroX',
        realName: 'John Doe',
        originDescription: 'Born in a lab',
        superpowers: ['flight', 'strength'],
        catchPhrase: 'To the skies!',
      };

      const createdHero = {
        id: 1,
        ...dto,
      };
      superheroService.create!.mockResolvedValue(createdHero);

      const result = await controller.create(dto);
      expect(superheroService.create).toHaveBeenCalledWith(dto);
      expect(result).toBe(createdHero);
    });
  });

  describe('getOne', () => {
    it('should return a superhero by id', async () => {
      const hero = { id: 1, nickname: 'HeroX' };
      superheroService.findOne!.mockResolvedValue(hero);

      const result = await controller.getOne(1);
      expect(superheroService.findOne).toHaveBeenCalledWith(1);
      expect(result).toBe(hero);
    });
  });

  describe('update', () => {
    it('should update a superhero', async () => {
      const dto = { nickname: 'UpdatedHero' };
      const updatedHero = { id: 1, nickname: 'UpdatedHero' };
      superheroService.update!.mockResolvedValue(updatedHero);

      const result = await controller.update(1, dto);
      expect(superheroService.update).toHaveBeenCalledWith(1, dto);
      expect(result).toBe(updatedHero);
    });
  });

  describe('remove', () => {
    it('should remove a superhero', async () => {
      const deleteResult = { affected: 1 };
      superheroService.remove!.mockResolvedValue(deleteResult);

      const result = await controller.remove(1);
      expect(superheroService.remove).toHaveBeenCalledWith(1);
      expect(result).toBe(deleteResult);
    });
  });

  describe('uploadImage', () => {
    it('should upload an image for a superhero', async () => {
      const file = { filename: 'image.png' } as Express.Multer.File;
      const image = { id: 1, path: '/uploads/image.png' };
      imageService.uploadForSuperhero!.mockResolvedValue(image);

      const result = await controller.uploadImage(1, file);
      expect(imageService.uploadForSuperhero).toHaveBeenCalledWith(
        1,
        file.filename,
      );
      expect(result).toEqual({
        message: 'Image uploaded and linked to superhero',
        image,
      });
    });
  });

  describe('deleteImage', () => {
    it('should delete an image from a superhero', async () => {
      imageService.deleteImageFromSuperhero!.mockResolvedValue(undefined);

      const result = await controller.deleteImage(1, 10);
      expect(imageService.deleteImageFromSuperhero).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual({ message: 'Image deleted successfully' });
    });
  });
});
