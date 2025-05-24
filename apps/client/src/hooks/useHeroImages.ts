import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { superHeroService } from '../services/SuperheroService';
import { SuperheroResponse } from '../types/Superhero';
import { UseModalReturn } from './useModal';

interface UseHeroImagesParams {
  hero: SuperheroResponse | null;
  setHero: Dispatch<SetStateAction<SuperheroResponse | null>>;
  deleteImageModal: UseModalReturn;
}

export function useHeroImages({
  hero,
  setHero,
  deleteImageModal,
}: UseHeroImagesParams) {
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);

  const handleImageUploaded = (newImage: { id: number; path: string }) => {
    setHero((prev) =>
      prev ? { ...prev, images: [...prev.images, newImage] } : prev
    );
  };

  const onDeleteImageClick = (imageId: number) => {
    setImageToDelete(imageId);
    deleteImageModal.openModal();
  };

  const confirmDeleteImage = async () => {
    if (!imageToDelete || !hero) return;

    try {
      await superHeroService.deleteHeroImage(hero.id, imageToDelete);
      setHero((prev) =>
        prev
          ? {
              ...prev,
              images: prev.images.filter((img) => img.id !== imageToDelete),
            }
          : prev
      );
      toast.success('Image deleted successfully!');
    } catch (error) {
      console.error('Failed to delete image:', error);
      toast.error('Failed to delete image. Please try again.');
    } finally {
      deleteImageModal.closeModal();
      setImageToDelete(null);
    }
  };

  const cancelDeleteImage = () => {
    deleteImageModal.closeModal();
    setImageToDelete(null);
  };

  return {
    imageToDelete,
    handleImageUploaded,
    onDeleteImageClick,
    confirmDeleteImage,
    cancelDeleteImage,
  };
}
