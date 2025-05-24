import { useState, useEffect } from 'react';
import { apiConfig } from '../config/configuration';
import { SuperheroCardResponse } from '../types/Superhero';
import { superHeroService } from '../services/SuperheroService';

const useSuperheroes = (page: number, refreshFlag: boolean) => {
  const [superheroes, setSuperheroes] = useState<
    SuperheroCardResponse[] | null
  >(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuperheroes = async () => {
      setLoading(true);
      try {
        const data = await superHeroService.fetchSuperheroes(
          page,
          apiConfig.PAGE_SIZE
        );

        setSuperheroes(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch superheroes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuperheroes();
  }, [page, refreshFlag]);

  return { superheroes, totalPages, loading };
};

export default useSuperheroes;
