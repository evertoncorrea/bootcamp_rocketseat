import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdControlPoint } from 'react-icons/md';

import { updateProfileRequest } from '~/store/modules/user/actions';

import ContentButton from '~/components/ContentButton';

import { Container, ButtonContainer } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de e-mail" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <ButtonContainer>
          <ContentButton type="submit">
            <MdControlPoint color="#fff" size="20" />
            <span>Salvar Perfil</span>
          </ContentButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
