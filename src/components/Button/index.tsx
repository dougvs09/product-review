import { ComponentProps } from 'react';

import { ButtonComponent } from './styles';

type ButtonTypes = ComponentProps<typeof ButtonComponent>;

export const Button: React.FC<ButtonTypes> = ({
  children,
  ...props
}: ButtonTypes) => <ButtonComponent {...props}>{children}</ButtonComponent>;
