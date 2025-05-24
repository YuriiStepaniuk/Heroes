import { useForm } from 'react-hook-form';
import { SuperheroResponse } from '../../types/Superhero';
import Modal from '../UI/Modal';
import ErrorMessage from '../UI/ErrorMessage';
import { superheroFields } from './formFields';

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

        {superheroFields.map(
          ({ name, placeholder, validation, type, inputProps }) => {
            const isError = !!errors[name as keyof FormData];
            const commonClass = `w-full border rounded px-3 py-2 ${
              isError ? 'border-red-500' : 'border-gray-300'
            }`;

            return (
              <div key={name}>
                {type === 'textarea' ? (
                  <textarea
                    {...register(name as keyof FormData, validation)}
                    placeholder={placeholder}
                    className={commonClass}
                    {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                  />
                ) : (
                  <input
                    {...register(name as keyof FormData, validation)}
                    placeholder={placeholder}
                    className={commonClass}
                    {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
                  />
                )}
                {isError && (
                  <ErrorMessage
                    message={errors[name as keyof FormData]?.message as string}
                  />
                )}
              </div>
            );
          }
        )}

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
            {isSubmitting ? 'Editing...' : 'Edit'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SuperheroEditForm;
