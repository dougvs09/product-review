import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { SigninAndSignup } from '@components/SigninAndSignup';
import { useAuth } from '@hooks/useAuth';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import {
  Container,
  DropdownMenuArrow,
  DropdownMenuButton,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  HeaderWrapper,
  Logo,
  ReviewLink,
  UserWrapper,
} from './styles';

export const Header: React.FC = () => {
  const { user, SignOut } = useAuth();

  const handleLogout = async () => {
    await SignOut();
  };

  return (
    <Container>
      <HeaderWrapper>
        <Link href="/" passHref>
          <Logo>
            <span>P</span>
            <span>R</span>
          </Logo>
        </Link>
        {!user ? (
          <SigninAndSignup />
        ) : (
          <UserWrapper>
            <Link href="/review/create" passHref>
              <ReviewLink>Criar uma review</ReviewLink>
            </Link>
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <DropdownMenuButton>
                  <Image src={user.avatarUrl} height={40} width={40} />
                </DropdownMenuButton>
              </DropdownMenuPrimitive.Trigger>
              <DropdownMenuContent sideOffset={5}>
                <DropdownMenuArrow />
                <DropdownMenuItem>
                  <Link href={`/users/${user.id}`}>
                    <a>Minha conta</a>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                  <button type="button">Fazer logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPrimitive.Root>
          </UserWrapper>
        )}
      </HeaderWrapper>
    </Container>
  );
};
