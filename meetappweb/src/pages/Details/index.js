import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  MdModeEdit,
  MdDeleteForever,
  MdLocationOn,
  MdEvent,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parseISO, isBefore } from 'date-fns';

import api from '~/services/api';
import history from '~/services/history';

import ContentButton from '~/components/ContentButton';
import { Container, Description, TimeLocation } from './styles';
import DefaultMeetup from '~/assets/default_meetup.png';
import { cancelMeetupRequest } from '../../store/modules/meetup/actions';

const dateFormat = "d 'de' MMMM', às' HH'h'";

export default function Details({ ...props }) {
  const dispatch = useDispatch();

  const [meetup, setMeetup] = useState({});
  const [id, setId] = useState(null);

  async function loadMeetup(meetupId) {
    const response = await api.get(`meetups/${meetupId}`, {
      params: { meetupId },
    });

    if (!response.data) {
      toast.error('Meetup não existente');
      history.push(`/dashboard`);
      return;
    }

    const data = Object.assign(response.data, {
      dateFormatted: format(parseISO(response.data.date), dateFormat),
    });
    setMeetup(data);
  }

  useEffect(() => {
    const { id: paramId } = props.match.params;
    if (paramId != null) setId(paramId);

    if (id != null) {
      loadMeetup(id);
    }
  }, [id, props.match.params]);

  function handleEdit() {
    if (isBefore(parseISO(meetup.date), new Date())) {
      toast.error('Meetups antigos não podem ser editados');
      return;
    }
    history.push(`/edit/${id}`);
  }
  async function handleCancel() {
    dispatch(cancelMeetupRequest({ id }));
  }

  return (
    <Container>
      <header>
        <nav>
          <strong>{meetup.name}</strong>
        </nav>
        <aside>
          <ContentButton onClick={handleEdit} backgroundColor="#4dbaf9">
            <MdModeEdit color="#fff" size="20px" />
            <span>Editar</span>
          </ContentButton>
          <ContentButton onClick={handleCancel}>
            <MdDeleteForever color="#fff" size="20px" />
            <span>Cancelar</span>
          </ContentButton>
        </aside>
      </header>
      <img
        src={meetup && meetup.banner ? meetup.banner.url : DefaultMeetup}
        alt=""
      />
      <Description>{meetup.description}</Description>
      <TimeLocation>
        <MdEvent color="rgba(255, 255, 255, 0.6)" size="18px" />
        <span>{meetup.dateFormatted}</span>
        <MdLocationOn color="rgba(255, 255, 255, 0.6)" size="18px" />
        <span>{meetup.location}</span>
      </TimeLocation>
    </Container>
  );
}
