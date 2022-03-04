import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsGithub, BsGoogle } from 'react-icons/bs';

import { Modal } from '@components/Modal';
import { useAuth } from '@hooks/useAuth';

import {
  Container,
  Form,
  InputGroup,
  ModalContainer,
  ProviderButton,
  Errors,
  ButtonSignAndSignup,
  EnterButton,
} from './styles';

type FormTypes = {
  email: string;
  password: string;
};

export const SigninAndSignup: React.FC = () => {
  const { SignIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>();

  const [signinOrSignup, setSigninOrSignup] = useState('');

  const handleSigninOrSignup = (method: string) => {
    setSigninOrSignup(method);
  };

  const handlePasswordSignup: SubmitHandler<FormTypes> = (data) => {
    SignIn('password', data.email, data.password);
  };

  return (
    <Container>
      <ButtonSignAndSignup
        type="button"
        size="xsm"
        color="purple"
        onClick={() => handleSigninOrSignup('signup')}
      >
        SignUp
      </ButtonSignAndSignup>
      <ButtonSignAndSignup
        type="button"
        size="xsm"
        color="white"
        onClick={() => handleSigninOrSignup('signin')}
      >
        SignIn
      </ButtonSignAndSignup>
      {signinOrSignup === 'signin' && (
        <Modal onClick={() => handleSigninOrSignup('')}>
          <ModalContainer>
            <h1>Entre em sua conta</h1>
            <ProviderButton
              type="button"
              size="lg"
              color="salmon"
              onClick={() => SignIn('google')}
            >
              <BsGoogle /> Entre com o Google
            </ProviderButton>
            <ProviderButton
              type="button"
              size="lg"
              color="black"
              onClick={() => SignIn('github')}
            >
              <BsGithub /> Entre com o Github
            </ProviderButton>
            <span>Ou entre com seu email e senha</span>
            <Form onSubmit={handleSubmit(handlePasswordSignup)}>
              <InputGroup>
                <input
                  type="text"
                  placeholder="Email"
                  {...register('email', { required: true })}
                />
                {errors.email?.type === 'required' && (
                  <Errors>Is required</Errors>
                )}
              </InputGroup>
              <InputGroup>
                <input
                  type="password"
                  placeholder="Senha"
                  {...register('password', { required: true })}
                />
                {errors.password?.type === 'required' && (
                  <Errors>Is required</Errors>
                )}
              </InputGroup>
              <EnterButton type="submit" size="sm" color="white">
                Entrar
              </EnterButton>
            </Form>
          </ModalContainer>
        </Modal>
      )}
      {signinOrSignup === 'signup' && (
        <Modal onClick={() => handleSigninOrSignup('')}>
          <ModalContainer>
            <h1>Crie sua conta</h1>
            <ProviderButton type="button" size="lg" color="salmon">
              <BsGoogle /> Crie com o Google
            </ProviderButton>
            <ProviderButton type="button" size="lg" color="black">
              <BsGithub /> Crie com o Github
            </ProviderButton>
          </ModalContainer>
        </Modal>
      )}
    </Container>
  );
};
