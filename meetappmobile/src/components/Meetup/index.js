import React from 'react';

import DefaultImage from '~/assets/default_meetup.png';
import Info from './Info';
import {
  Container,
  Title,
  MeetupImage,
  MeetupImageContainer,
  DataContainer,
  MButton,
  StateTextContainer,
  StateText,
} from './styles';

export default function Meetup({ data, onSubscribe, onCancel }) {
  return (
    <Container>
      <MeetupImageContainer>
        <MeetupImage
          source={data.banner ? { uri: data.banner.url } : DefaultImage}
          resizeMode="cover"
        />
      </MeetupImageContainer>
      <DataContainer>
        <Title>{data.name}</Title>
        <Info iconName="event">{data.formattedDate}</Info>
        <Info iconName="location-on">{data.location}</Info>
        <Info iconName="person">{data.organizer.name}</Info>
        {data.state === 'showAlreadyRegistered' && (
          <StateTextContainer>
            <StateText>Inscrito</StateText>
          </StateTextContainer>
        )}
        {data.state === 'showAlreadyPast' && (
          <StateTextContainer>
            <StateText>Meetup já realizado</StateText>
          </StateTextContainer>
        )}
        {data.state === 'showOrganizer' && (
          <StateTextContainer>
            <StateText>Organizador</StateText>
          </StateTextContainer>
        )}
        {data.state === 'showSubscribe' && (
          <MButton onPress={onSubscribe}>Realizar inscrição</MButton>
        )}
        {data.state === 'showCancel' && (
          <MButton onPress={onCancel}>Cancelar inscrição</MButton>
        )}
      </DataContainer>
    </Container>
  );
}
