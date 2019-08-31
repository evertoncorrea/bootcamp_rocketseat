import React from 'react';

import logoImage from '~/assets/logo.png';
import { Container, Logo } from './styles';

export default function Header() {
  return (
    <>
      <Container>
        <Logo source={logoImage} resizeMode="cover" />
      </Container>
    </>
  );
}
