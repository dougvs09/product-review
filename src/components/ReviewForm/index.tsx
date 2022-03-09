import { DetailedHTMLProps, OptionHTMLAttributes } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdClear } from 'react-icons/md';
import { useQuery } from 'react-query';

import { api } from 'utils/api';

import {
  Clear,
  Errors,
  Form,
  FormButton,
  InputGroup,
  Label,
  SelectGroup,
  Spinner,
  TextareaGroup,
} from './styles';

export type FormTypes = {
  title: string;
  description: string;
  brand: string;
  dayOfPurchase: string;
  category: string;
  price: string;
  rate: string;
};

type ReviewFormTypes = {
  handleCreateReview: SubmitHandler<FormTypes>;
  loading: boolean;
};

type CategoryType = {
  id: string;
  name: string;
  brands: string[];
};

type BrandsOptions = DetailedHTMLProps<
  OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>[];

export const ReviewForm: React.FC<ReviewFormTypes> = ({
  handleCreateReview,
  loading,
}: ReviewFormTypes) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    resetField,
    setValue,
  } = useForm<FormTypes>();

  const category = watch('category');

  const clearInput = (
    name: 'price' | 'title' | 'description' | 'dayOfPurchase' | 'rate'
  ) => {
    resetField(name);
  };

  const { data: categories } = useQuery<CategoryType[], Error>(
    'categories',
    async () => {
      const response = await api.get('/category');
      return response.data;
    }
  );

  return (
    <Form onSubmit={handleSubmit(handleCreateReview)}>
      <InputGroup>
        <Label required htmlFor="title">
          Title
        </Label>
        <input
          placeholder="Insira aqui o nome do produto"
          {...register('title', { required: true })}
        />
        {errors.title && <Errors>Is required</Errors>}
        <Clear type="button" onClick={() => clearInput('title')}>
          <MdClear color="#FFF" />
        </Clear>
      </InputGroup>

      <TextareaGroup>
        <Label required htmlFor="description">
          Description
        </Label>
        <textarea
          placeholder="Insira aqui uma breve descrição sobre o produto e o que você achou dele"
          {...register('description', { required: true })}
        />
        {errors.description && <Errors>Is required</Errors>}
        <Clear type="button" onClick={() => clearInput('description')}>
          <MdClear color="#FFF" />
        </Clear>
      </TextareaGroup>

      <InputGroup>
        <Label required htmlFor="price">
          Price
        </Label>
        <input
          placeholder="Ex: 1999 (mil novecentos e noventa e nove)"
          {...register('price', {
            required: true,
            valueAsNumber: true,
            onChange: (e) => {
              const clean = e.target.value
                .replace(/[.]/g, '')
                .replace(/[,][0-9]{2}/, '')
                .trim();
              const brl = Intl.NumberFormat('pt-BR').format(clean);
              setValue('price', brl);
            },
          })}
        />
        {errors.price?.type === 'required' && <Errors>Is required</Errors>}
        <Clear type="button" onClick={() => clearInput('price')}>
          <MdClear color="#FFF" />
        </Clear>
      </InputGroup>

      <InputGroup>
        <Label required htmlFor="rate">
          Rate
        </Label>
        <input
          placeholder="Coloque uma nota de 1 a 5"
          {...register('rate', {
            required: true,
            valueAsNumber: true,
            validate: (v) => +v <= 5,
          })}
        />
        {errors.rate?.type === 'required' && <Errors>Is required</Errors>}
        {errors.rate?.type === 'validate' && <Errors>Is better than 5</Errors>}
        <Clear type="button" onClick={() => clearInput('rate')}>
          <MdClear color="#FFF" />
        </Clear>
      </InputGroup>

      <SelectGroup>
        <Label required htmlFor="category">
          Category
        </Label>
        <select
          defaultValue="DEFAULT"
          {...register('category', {
            validate: (v) => v !== 'Choose your category',
          })}
        >
          <option value="DEFAULT" hidden disabled>
            Choose your category
          </option>
          {categories?.map((data) => (
            <option value={data.id} key={data.id}>
              {data.name}
            </option>
          ))}
        </select>
        {errors.category && <Errors>Is required</Errors>}
      </SelectGroup>

      <SelectGroup>
        <Label required htmlFor="brand">
          Brand
        </Label>
        <select
          defaultValue="DEFAULT"
          {...register('brand', {
            validate: (v) => v !== 'Choose your brand',
          })}
        >
          <option value="DEFAULT" hidden disabled>
            Choose your brand
          </option>
          {categories?.map((data) => {
            const brands: BrandsOptions = [];
            if (data.id === category) {
              data.brands.forEach((brand) => {
                brands.push(
                  <option value={brand} key={brand}>
                    {brand}
                  </option>
                );
              });
            }

            return brands;
          })}
        </select>
        {errors.brand && <Errors>Is required</Errors>}
      </SelectGroup>

      <InputGroup>
        <Label required htmlFor="dayOfPurchase">
          Day of purchase
        </Label>
        <input
          className="date"
          type="date"
          {...register('dayOfPurchase', {
            required: true,
          })}
        />
        {errors.dayOfPurchase && <Errors>Is required</Errors>}
      </InputGroup>
      <FormButton color="purple" size="all" loading={loading} type="submit">
        {!loading ? 'Enviar' : <Spinner />}
      </FormButton>
    </Form>
  );
};
