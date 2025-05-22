import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superhero } from './entities/superhero.entity';
import { Image } from './entities/image.entity';
import { ImageService } from './services/image.service';
import { SuperheroService } from './services/superhero.service';
import { SuperheroController } from './controllers/superhero.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero, Image])],
  providers: [ImageService, SuperheroService],
  controllers: [SuperheroController],
  exports: [],
})
export class SuperheroModule {}
