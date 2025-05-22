import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from 'src/config/configuration';
import { Image } from 'src/superhero/entities/image.entity';
import { Superhero } from 'src/superhero/entities/superhero.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigType>) => ({
        type: 'postgres',
        host: configService.get('database.host', { infer: true }),
        port: configService.get('database.port', { infer: true }),
        username: configService.get('database.user', { infer: true }),
        password: configService.get('database.password', { infer: true }),
        database: configService.get('database.name', { infer: true }),
        entities: [Superhero, Image],
        synchronize: configService.get('database.sync', { infer: true }),
      }),
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
