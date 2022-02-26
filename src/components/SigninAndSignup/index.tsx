import React, { FormEvent, useState } from 'react';
import { BsGithub, BsGoogle, BsEye, BsEyeSlash } from 'react-icons/bs';

import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { useAuth } from '@hooks/useAuth';

import {
  Container,
  Form,
  Input,
  ModalContainer,
  ProviderButton,
  ViewPassword,
} from './styles';

export const SigninAndSignup: React.FC = () => {
  const { SignIn } = useAuth();
  const [signinOrSignup, setSigninOrSignup] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typePassword, setTypePassword] = useState('password');

  const handlePasswordSignup = (e: FormEvent) => {
    e.preventDefault();

    if (!password || !email) {
      return;
    }
    SignIn('password', email, password);
  };

  return (
    <Container>
      <Button
        type="button"
        size="xsm"
        color="purple"
        onClick={() => setSigninOrSignup('signup')}
      >
        SignUp
      </Button>
      <Button
        type="button"
        size="xsm"
        color="white"
        onClick={() => setSigninOrSignup('signin')}
      >
        SignIn
      </Button>
      {signinOrSignup === 'signin' && (
        <Modal size="md" onClick={() => setSigninOrSignup('')}>
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
            <Form onSubmit={handlePasswordSignup}>
              <Input
                type="text"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type={typePassword}
                required
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <ViewPassword
                type="button"
                onClick={() =>
                  typePassword === 'password'
                    ? setTypePassword('text')
                    : setTypePassword('password')
                }
              >
                {typePassword === 'password' ? <BsEye /> : <BsEyeSlash />}
              </ViewPassword>
              <Button type="submit" size="sm" color="white">
                Entrar
              </Button>
            </Form>
          </ModalContainer>
        </Modal>
      )}
      {signinOrSignup === 'signup' && (
        <Modal size="sm" onClick={() => setSigninOrSignup('')}>
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
