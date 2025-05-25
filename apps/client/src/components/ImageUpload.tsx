import { useState, FC, ChangeEvent } from 'react';
import { superHeroService } from '../services/SuperheroService';
import { toast } from 'react-toastify';

interface Image {
  id: number;
  path: string;
}

interface ImageUploadProps {
  heroId: number;
  onImageUploaded: (newImage: Image) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ heroId, onImageUploaded }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await superHeroService.uploadImage(heroId, formData);
      onImageUploaded(response.image);
      toast.success('Image uploaded successfully!');
    } catch (err) {
      toast.error('Failed to upload image');
      console.error(err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="my-4">
      <label htmlFor="image-upload" className="block mb-2 font-semibold">
        Upload Image
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUpload;
