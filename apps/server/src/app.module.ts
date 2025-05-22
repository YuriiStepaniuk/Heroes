import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validationSchema';
import { DatabaseModule } from './database/database.module';
import { SuperheroModule } from './superhero/superhero.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    DatabaseModule,
    SuperheroModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
