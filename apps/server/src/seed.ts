import { DataSource } from 'typeorm';
import { Superhero } from './superhero/entities/superhero.entity';
import * as dotenv from 'dotenv';
import { Image } from './superhero/entities/image.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Superhero, Image],
  synchronize: process.env.DATABASE_SYNC === 'true',
});

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(Superhero);

  const count = await repo.count();
  if (count > 10) {
    console.log('Database already seeded');
    await AppDataSource.destroy();
    return;
  }

  const heroes = [
    {
      nickname: 'Superman',
      realName: 'Clark Kent',
      originDescription: 'From Krypton',
      superpowers: ['flight', 'strength', 'x-ray vision'],
      catchPhrase: 'Up, up and away!',
      images: [],
    },
    {
      nickname: 'Batman',
      realName: 'Bruce Wayne',
      originDescription: 'Gotham City',
      superpowers: ['martial arts', 'gadgets', 'stealth'],
      catchPhrase: 'I am vengeance.',
      images: [],
    },
    {
      nickname: 'Wonder Woman',
      realName: 'Diana Prince',
      originDescription: 'Themyscira',
      superpowers: ['super strength', 'combat skill', 'lasso of truth'],
      catchPhrase: 'In the name of all that is good!',
      images: [],
    },
    {
      nickname: 'Flash',
      realName: 'Barry Allen',
      originDescription: 'Central City',
      superpowers: ['super speed', 'time travel', 'phasing'],
      catchPhrase: "I'm the fastest man alive!",
      images: [],
    },
    {
      nickname: 'Green Lantern',
      realName: 'Hal Jordan',
      originDescription: 'Coast City',
      superpowers: ['power ring', 'flight', 'energy constructs'],
      catchPhrase: 'In brightest day, in blackest night...',
      images: [],
    },
    {
      nickname: 'Aquaman',
      realName: 'Arthur Curry',
      originDescription: 'Atlantis',
      superpowers: [
        'underwater breathing',
        'telepathy with sea creatures',
        'super strength',
      ],
      catchPhrase: 'The seas will rise!',
      images: [],
    },
    {
      nickname: 'Cyborg',
      realName: 'Victor Stone',
      originDescription: 'Metropolis',
      superpowers: ['cybernetic enhancements', 'technopathy', 'super strength'],
      catchPhrase: 'Booyah!',
      images: [],
    },
    {
      nickname: 'Spider-Man',
      realName: 'Peter Parker',
      originDescription: 'New York City',
      superpowers: ['wall-crawling', 'spider sense', 'super agility'],
      catchPhrase: 'With great power comes great responsibility.',
      images: [],
    },
    {
      nickname: 'Iron Man',
      realName: 'Tony Stark',
      originDescription: 'New York City',
      superpowers: [
        'powered armor suit',
        'genius intellect',
        'energy repulsors',
      ],
      catchPhrase: 'I am Iron Man.',
      images: [],
    },
    {
      nickname: 'Captain America',
      realName: 'Steve Rogers',
      originDescription: 'Brooklyn',
      superpowers: [
        'enhanced strength',
        'expert tactician',
        'indestructible shield',
      ],
      catchPhrase: 'I can do this all day.',
      images: [],
    },
  ];

  for (const heroData of heroes) {
    const hero = repo.create(heroData);
    await repo.save(hero);
  }

  console.log('Database seeded!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
