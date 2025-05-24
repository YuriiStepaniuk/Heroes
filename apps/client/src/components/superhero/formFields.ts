import { separatedWordsWithComma } from '../../utils/regex/separateWordsWithComma';

export type FieldType = 'input' | 'textarea' | 'select' | 'checkbox';

type SuperheroFormData = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
};

export interface FormField {
  name: keyof SuperheroFormData;
  label?: string;
  placeholder?: string;
  type?: FieldType;
  validation?: any;
  inputProps?: React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement
  >;
}

export const superheroFields: FormField[] = [
  {
    name: 'nickname',
    placeholder: 'Nickname',
    type: 'input',
    validation: { required: 'Nickname is required' },
    inputProps: { type: 'text' },
  },
  {
    name: 'realName',
    placeholder: 'Real Name',
    type: 'input',
    validation: { required: 'Real Name is required' },
    inputProps: { type: 'text' },
  },
  {
    name: 'originDescription',
    placeholder: 'Origin Description',
    type: 'textarea',
    validation: { required: 'Origin description is required' },
  },
  {
    name: 'superpowers',
    placeholder: 'Superpowers (comma separated)',
    type: 'input',
    validation: {
      required: 'Superpowers are required',
      pattern: {
        value: separatedWordsWithComma,
        message: 'Superpowers must be comma-separated words',
      },
    },
    inputProps: { type: 'text' },
  },
  {
    name: 'catchPhrase',
    placeholder: 'Catchphrase',
    type: 'input',
    validation: { required: 'Catchphrase is required' },
    inputProps: { type: 'text' },
  },
];
