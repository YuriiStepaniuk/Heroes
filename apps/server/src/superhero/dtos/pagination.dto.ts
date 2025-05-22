import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;

  get skip(): number {
    return ((this.page ?? 1) - 1) * (this.limit ?? 5);
  }
}
