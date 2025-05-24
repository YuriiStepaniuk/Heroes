import { useNavigate, useParams } from 'react-router-dom';
import SuperheroEditForm from './SuperheroEditForm';
import ConfirmationModal from '../UI/ConfirmationModal';
import ImageUpload from '../ImageUpload';
import HeroInfo from './HeroInfo';
import HeroImages from './HeroImages';
import { toast } from 'react-toastify';
import useSuperheroDetails from '../../hooks/useSuperheroDetails';
import useModal from '../../hooks/useModal';
import { superHeroService } from '../../services/SuperheroService';
import { useHeroImages } from '../../hooks/useHeroImages';
import { AppRoutes } from '../../routes/AppRoutes';
import { SuperheroResponse } from '../../types/Superhero';

const SuperheroDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hero, setHero, loading } = useSuperheroDetails(id);

  const editHeroModal = useModal();
  const deleteHeroModal = useModal();
  const deleteImageModal = useModal();

  const {
    handleImageUploaded,
    onDeleteImageClick,
    confirmDeleteImage,
    cancelDeleteImage,
  } = useHeroImages({ hero, setHero, deleteImageModal });

  const handleDeleteHero = async () => {
    if (!hero) return;
    try {
      await superHeroService.deleteSuperhero(hero.id);
      deleteHeroModal.closeModal();
      toast.success('Hero deleted successfully!');
      navigate(AppRoutes.Superheros);
    } catch (error) {
      console.error('Failed to delete hero:', error);
      toast.error('Failed to delete hero. Please try again.');
    }
  };

  const handleSaveHero = async (updatedHero: Partial<SuperheroResponse>) => {
    if (!hero) return;
    try {
      await superHeroService.updateSuperhero(hero.id, updatedHero);
      setHero((prev) => (prev ? { ...prev, ...updatedHero } : prev));
      editHeroModal.closeModal();
      toast.success('Hero updated successfully!');
    } catch (error) {
      console.error('Failed to update hero:', error);
      toast.error('Failed to update hero.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!hero) return <div>Hero not found</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Action buttons aligned right */}
      <div className="flex justify-end space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={editHeroModal.openModal}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          onClick={deleteHeroModal.openModal}
        >
          Delete
        </button>
      </div>

      {/* Main content: info on left, upload and images stacked on right */}
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left side: Hero info and ImageUpload stacked */}
        <div className="flex-1 space-y-6">
          <HeroInfo hero={hero} />
          <ImageUpload heroId={hero.id} onImageUploaded={handleImageUploaded} />
        </div>

        {/* Right side: Hero Images */}
        <div className="flex-1 mt-8 md:mt-0">
          <HeroImages
            images={hero.images}
            altText={hero.nickname}
            onDeleteImage={onDeleteImageClick}
          />
        </div>
      </div>

      {editHeroModal.isOpen && hero && (
        <SuperheroEditForm
          hero={hero}
          onClose={editHeroModal.closeModal}
          onSave={handleSaveHero}
        />
      )}

      {deleteHeroModal.isOpen && hero && (
        <ConfirmationModal
          message={`Are you sure you want to delete hero ${hero.nickname}?`}
          onConfirm={handleDeleteHero}
          onCancel={deleteHeroModal.closeModal}
        />
      )}

      {deleteImageModal.isOpen && (
        <ConfirmationModal
          message="Are you sure you want to delete this image?"
          onConfirm={confirmDeleteImage}
          onCancel={cancelDeleteImage}
        />
      )}
    </div>
  );
};

export default SuperheroDetails;
