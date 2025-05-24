import { SuperheroResponse } from '../../types/Superhero';
import { getImageUrl } from '../../utils/getImagePath';

interface HeroImagesProps {
  images: SuperheroResponse['images'];
  altText: string;
  onDeleteImage: (imageId: number) => void;
}

const HeroImages: React.FC<HeroImagesProps> = ({
  images,
  altText,
  onDeleteImage,
}) => {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {images.map((img) => (
        <div key={img.id} className="relative w-[150px] h-[150px] group">
          <img
            src={getImageUrl(img.path)}
            alt={altText}
            className="w-full h-full object-cover rounded"
          />
          <button
            onClick={() => onDeleteImage(img.id)}
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm"
            title="Delete image"
            type="button"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default HeroImages;
