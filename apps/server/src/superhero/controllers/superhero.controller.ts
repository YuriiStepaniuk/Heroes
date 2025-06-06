import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  UploadedFile,
  Query,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { SuperheroService } from '../services/superhero.service';
import { UpdateSuperheroDto } from '../dtos/superhero/update-superhero.dto';
import { CreateSuperheroDto } from '../dtos/superhero/create-superhero.dto';
import { LocalFileInterceptor } from 'src/common/interceptors/file.interceptor';
import { ImageService } from '../services/image.service';
import { Route } from 'src/enums/route.enum';
import { PaginationDto } from '../dtos/pagination.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { SuperheroResponseDto } from '../dtos/superhero/superhero-response.dto';

@Controller(Route.SUPERHEROS)
export class SuperheroController {
  constructor(
    private readonly superheroService: SuperheroService,
    private readonly imageService: ImageService,
  ) {}

  @Get()
  async list(@Query() paginationDto: PaginationDto) {
    return this.superheroService.findAll(paginationDto);
  }

  @Post()
  async create(@Body() dto: CreateSuperheroDto) {
    return this.superheroService.create(dto);
  }

  @Get(':id')
  @UseInterceptors(new TransformInterceptor(SuperheroResponseDto))
  async getOne(@Param('id') id: number) {
    return this.superheroService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateSuperheroDto) {
    return this.superheroService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.superheroService.remove(id);
  }

  @Post(':id/images')
  @LocalFileInterceptor('photo')
  async uploadImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = await this.imageService.uploadForSuperhero(id, file.filename);

    return {
      message: 'Image uploaded and linked to superhero',
      image,
    };
  }

  @Delete(':superheroId/images/:imageId')
  async deleteImage(
    @Param('superheroId', ParseIntPipe) superheroId: number,
    @Param('imageId', ParseIntPipe) imageId: number,
  ) {
    await this.imageService.deleteImageFromSuperhero(superheroId, imageId);
    return { message: 'Image deleted successfully' };
  }
}
