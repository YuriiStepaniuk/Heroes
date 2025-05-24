import { useForm } from 'react-hook-form';
import { SuperheroResponse } from '../../types/Superhero';
import Modal from '../UI/Modal';

interface SuperheroEditFormProps {
  hero: SuperheroResponse;
  onClose: () => void;
  onSave: (updatedHero: Partial<SuperheroResponse>) => void;
}

type FormData = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
};

const SuperheroEditForm = ({
  hero,
  onClose,
  onSave,
}: SuperheroEditFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      nickname: hero.nickname,
      realName: hero.realName,
      originDescription: hero.originDescription,
      superpowers: hero.superpowers.join(', '),
      catchPhrase: hero.catchPhrase,
    },
  });
  const onSubmit = (data: FormData) => {
    const updatedHero: Partial<SuperheroResponse> = {
      ...data,
      superpowers: data.superpowers.split(',').map((s) => s.trim()),
    };
    onSave(updatedHero);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        <h3 className="text-lg font-bold mb-4">Edit Superhero</h3>

        <div>
          <input
            {...register('nickname', { required: 'Nickname is required' })}
            placeholder="Nickname"
            className={`w-full border rounded px-3 py-2 ${
              errors.nickname ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.nickname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nickname.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register('realName', { required: 'Real Name is required' })}
            placeholder="Real Name"
            className={`w-full border rounded px-3 py-2 ${
              errors.realName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.realName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.realName.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register('originDescription', {
              required: 'Origin description is required',
            })}
            placeholder="Origin Description"
            className={`w-full border rounded px-3 py-2 ${
              errors.originDescription ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.originDescription && (
            <p className="text-red-500 text-sm mt-1">
              {errors.originDescription.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register('superpowers', {
              required: 'Superpowers are required',
            })}
            placeholder="Superpowers (comma separated)"
            className={`w-full border rounded px-3 py-2 ${
              errors.superpowers ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.superpowers && (
            <p className="text-red-500 text-sm mt-1">
              {errors.superpowers.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register('catchPhrase', {
              required: 'Catchphrase is required',
            })}
            placeholder="Catchphrase"
            className={`w-full border rounded px-3 py-2 ${
              errors.catchPhrase ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.catchPhrase && (
            <p className="text-red-500 text-sm mt-1">
              {errors.catchPhrase.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SuperheroEditForm;
