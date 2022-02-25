import { SubmitHandler, useForm } from 'react-hook-form';
import { MdClear } from 'react-icons/md';

import {
  Button,
  Clear,
  Errors,
  Form,
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
  } = useForm<FormTypes>();

  const category = watch('category');

  const clearInput = (
    name: 'price' | 'title' | 'description' | 'dayOfPurchase' | 'rate'
  ) => {
    resetField(name);
  };

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
          placeholder="Insira aqui uma descrição breve sobre o produto e o que você achou dele"
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
          placeholder="R$ 1.999,99"
          {...register('price', {
            required: true,
            pattern: /([0-9]{1,3}[,])([0-9]{1})/,
          })}
        />
        {errors.price?.type === 'required' && <Errors>Is required</Errors>}
        {errors.price?.type === 'pattern' && (
          <Errors>Formato aceito: ...000,00</Errors>
        )}
        <Clear type="button" onClick={() => clearInput('price')}>
          <MdClear color="#FFF" />
        </Clear>
      </InputGroup>

      <InputGroup>
        <Label required htmlFor="rate">
          Rate
        </Label>
        <input
          placeholder="Coloque uma nota de 1,0 a 5,0"
          {...register('rate', {
            required: true,
            pattern: /([0-9]{1}[,])([0-9]{2})/,
          })}
        />
        {errors.price?.type === 'required' && <Errors>Is required</Errors>}
        {errors.price?.type === 'pattern' && (
          <Errors>Formato aceito: 0,00</Errors>
        )}
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
          <option value="smartphone">Smartphone</option>
          <option value="television">Television</option>
          <option value="notebook">Notebook</option>
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
          {category === 'smartphone' && (
            <>
              <option value="samsung">Samsung</option>
              <option value="apple">Apple</option>
              <option value="xiaomi">Xiaomi</option>
              <option value="motorola">Motorola</option>
              <option value="other">Other</option>
            </>
          )}
          {category === 'notebook' && (
            <>
              <option value="dell">Dell</option>
              <option value="apple">Apple</option>
              <option value="vaio">Vaio</option>
              <option value="samsung">Samsung</option>
              <option value="lenovo">Lenovo</option>
              <option value="other">Other</option>
            </>
          )}
          {category === 'television' && (
            <>
              <option value="samsung">Samsung</option>
              <option value="lg">LG</option>
              <option value="philco">Philco</option>
              <option value="sony">Sony</option>
              <option value="other">Other</option>
            </>
          )}
        </select>
        {errors.brand && <Errors>Is required</Errors>}
      </SelectGroup>

      <InputGroup>
        <Label required htmlFor="dayOfPurchase">
          Day of purchase
        </Label>
        <input
          type="date"
          {...register('dayOfPurchase', {
            required: true,
          })}
        />
        {errors.dayOfPurchase && <Errors>Is required</Errors>}
      </InputGroup>
      <Button color="purple" size="all" loading={loading} type="submit">
        {!loading ? 'Enviar' : <Spinner />}
      </Button>
    </Form>
  );
};
