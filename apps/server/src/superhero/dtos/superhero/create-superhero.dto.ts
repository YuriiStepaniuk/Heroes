import {
  IsArray,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  realName: string;

  @IsString()
  @IsNotEmpty()
  originDescription: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  superpowers: string[];

  @IsString()
  @IsNotEmpty()
  catchPhrase: string;
}
