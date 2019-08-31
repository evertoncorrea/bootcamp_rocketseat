import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, InfoText } from './styles';

export default function Info({ iconName, children }) {
  return (
    <Container>
      <Icon name={iconName} size={15} color="#999" />
      <InfoText>{children}</InfoText>
    </Container>
  );
}
