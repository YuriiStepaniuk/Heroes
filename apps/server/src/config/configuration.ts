import { Environment } from 'src/enums/environment.enum';

const configuration = () => ({
  port: parseInt(process.env.PORT || '3000', 10),

  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    sync: process.env.NODE_ENV === Environment.DEV,
  },

  maxImagesPerHero: parseInt(process.env.MAX_IMAGES_PER_HERO || '5', 10),
});

export default configuration;
export type ConfigType = ReturnType<typeof configuration>;
