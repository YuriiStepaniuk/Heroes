import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';
import { DeleteResult, FindOptionsRelations, Repository } from 'typeorm';
import { Superhero } from '../entities/superhero.entity';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from 'src/config/configuration';
import { UPLOADS_ROUTE_PREFIX } from 'src/common/constants/storage.constants';

@Injectable()
export class ImageService {
  private readonly maxImages: number;
  private readonly relations: FindOptionsRelations<Image> = {
    superhero: true,
  };

  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Superhero)
    private readonly superheroRepository: Repository<Superhero>,
    private readonly configService: ConfigService<ConfigType>,
  ) {
    this.maxImages = this.configService.get<number>('maxImagesPerHero', {
      infer: true,
    });
  }

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

    await this.ensureImageLimitNotExceeded(superheroId);

    const image = this.imageRepository.create({
      path: `${UPLOADS_ROUTE_PREFIX}/${filename}`,
      superhero,
    });

    return this.imageRepository.save(image);
  }

  async findAll(): Promise<Image[]> {
    return this.imageRepository.find({ relations: this.relations });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.imageRepository.delete(id);
  }

  async ensureImageLimitNotExceeded(superheroId: number): Promise<void> {
    const count = await this.imageRepository.count({
      where: { superhero: { id: superheroId } },
    });

    if (count >= this.maxImages) {
      throw new BadRequestException(
        `Superhero can only have up to ${this.maxImages} images`,
      );
    }
  }
}
