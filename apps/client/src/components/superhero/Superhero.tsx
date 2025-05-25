import { useState } from 'react';
import { CreateSuperheroDto } from '../../types/Superhero';
import SuperheroCard from './SuperheroCard';
import Pagination from '../Pagination';
import SuperheroCreateForm from './SuperheroCreateForm';
import useModal from '../../hooks/useModal';
import useSuperheroes from '../../hooks/useSuperheros';
import { superHeroService } from '../../services/SuperheroService';
import { toast } from 'react-toastify';

const Superhero = () => {
  const { isOpen: showCreateModal, openModal, closeModal } = useModal();
  const [page, setPage] = useState(1);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const { superheroes, totalPages, loading, error } = useSuperheroes(
    page,
    refreshFlag
  );

  const handleCreateHero = async (newHero: CreateSuperheroDto) => {
    try {
      await superHeroService.createSuperhero(newHero);
      toast.success('Successfully create new hero!');
      closeModal();
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error('Failed to create hero:', error);
      toast.success('Error occured while deleting hero');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Data is not accessible. Please make sure the server is running.
      </div>
    );
  }

  if (!superheroes || superheroes.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        No heroes yet. Feel free to add heroes with the Add button.
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded m-4"
      >
        Add Hero
      </button>

      {showCreateModal && (
        <SuperheroCreateForm onClose={closeModal} onCreate={handleCreateHero} />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {superheroes?.map((hero) => (
          <SuperheroCard key={hero.id} hero={hero} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Superhero;
