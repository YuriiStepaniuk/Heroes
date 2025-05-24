import { useForm } from 'react-hook-form';
import Modal from '../UI/Modal';
import ErrorMessage from '../UI/ErrorMessage';
import { FormField, superheroFields } from './formFields';

interface SuperheroCreateFormProps {
  onClose: () => void;
  onCreate: (newHero: CreateSuperheroDto) => void;
}

type FormData = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
};

export interface CreateSuperheroDto {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string[];
  catchPhrase: string;
}

const SuperheroCreateForm = ({
  onClose,
  onCreate,
}: SuperheroCreateFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newHero: CreateSuperheroDto = {
      ...data,
      superpowers: data.superpowers
        ? data.superpowers
            .split(',')
            .map((sp) => sp.trim())
            .filter(Boolean)
        : [],
    };
    onCreate(newHero);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
        <h3 className="text-lg font-bold mb-4">Create New Superhero</h3>

        {superheroFields.map((field: FormField) => {
          const isError = !!errors[field.name];
          const commonClass = `w-full border rounded px-3 py-2 ${
            isError ? 'border-red-500' : 'border-gray-300'
          }`;

          return (
            <div key={field.name}>
              {field.type === 'textarea' ? (
                <textarea
                  {...register(field.name, field.validation)}
                  placeholder={field.placeholder}
                  className={commonClass}
                  {...field.inputProps}
                />
              ) : (
                <input
                  {...register(field.name, field.validation)}
                  placeholder={field.placeholder}
                  className={commonClass}
                  {...field.inputProps}
                />
              )}
              {isError && (
                <ErrorMessage message={errors[field.name]?.message} />
              )}
            </div>
          );
        })}

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
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SuperheroCreateForm;
