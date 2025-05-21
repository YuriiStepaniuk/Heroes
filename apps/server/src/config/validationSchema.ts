import * as Joi from 'joi';
import { Environment } from 'src/enums/environment.enum';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required().default(Environment.DEV),

  PORT: Joi.number().required().default(3000),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
