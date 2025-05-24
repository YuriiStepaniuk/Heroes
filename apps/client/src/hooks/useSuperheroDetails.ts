import { useEffect, useState } from 'react';
import { SuperheroResponse } from '../types/Superhero';
import { superHeroService } from '../services/SuperheroService';

const useSuperheroDetails = (id: string | undefined) => {
  const [hero, setHero] = useState<SuperheroResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const fetchHero = async () => {
      setLoading(true);
      try {
        const data = await superHeroService.fetchSuperheroById(id);
        setHero(data);
      } catch (error) {
        console.error('Failed to fetch superhero details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [id]);

  return { hero, setHero, loading };
};

export default useSuperheroDetails;
