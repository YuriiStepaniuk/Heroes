import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { SuperheroService } from '../services/superhero.service';
import { UpdateSuperheroDto } from '../dtos/superhero/update-superhero.dto';
import { CreateSuperheroDto } from '../dtos/superhero/create-superhero.dto';

@Controller('superheros')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Get()
  async list() {
    return this.superheroService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateSuperheroDto) {
    return this.superheroService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateSuperheroDto) {
    return this.superheroService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.superheroService.remove(id);
  }
}
