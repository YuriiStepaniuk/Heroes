import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superhero } from './entities/superhero.entity';
import { Image } from './entities/image.entity';
import { ImageService } from './services/image.service';
import { SuperheroService } from './services/superhero.service';
import { SuperheroController } from './controllers/superhero.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero, Image]), ConfigModule],
  providers: [ImageService, SuperheroService],
  controllers: [SuperheroController],
  exports: [],
})
export class SuperheroModule {}
