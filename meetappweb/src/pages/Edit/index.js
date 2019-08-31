import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import {
  parse,
  isDate,
  isValid,
  isAfter,
  isBefore,
  format,
  parseISO,
} from 'date-fns';

import { Form, Input } from '@rocketseat/unform';
import { MdControlPoint } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  createMeetupRequest,
  updateMeetupRequest,
} from '~/store/modules/meetup/actions';

import ContentButton from '~/components/ContentButton';
import ImageInput from './ImageInput';
import { Container, ButtonContainer } from './styles';

const dateFormat = 'dd/MM/yyyy HH:mm';

export default function Edit({ ...props }) {
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

    if (isBefore(parseISO(response.data.date), new Date())) {
      toast.error('Meetups antigos não podem ser editados');
      history.push(`/details/${response.data.id}`);
      return;
    }

    const data = Object.assign(response.data, {
      date: format(parseISO(response.data.date), dateFormat),
    });
    setMeetup(data);
  }

  useEffect(() => {
    const { id: paramId } = props.match.params;
    if (paramId != null) setId(paramId);

    if (id != null) {
      loadMeetup(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, props.match.params]);

  async function handleSubmit(data) {
    data.date = parse(data.date, dateFormat, new Date());
    if (id == null) {
      dispatch(createMeetupRequest(data));
    } else {
      dispatch(updateMeetupRequest({ ...data, id }));
    }
  }
  const schema = Yup.object().shape({
    name: Yup.string().required('Insira o título'),
    description: Yup.string().required('Insira a descrição'),
    date: Yup.string()
      .test('isdtold', 'Insira uma data que ainda não aconteceu', value => {
        const parsed = parse(value, dateFormat, new Date());
        return isAfter(parsed, new Date());
      })
      .test(
        'isdtinvalid',
        'Insira uma data no formato dd/mm/aaaa hh:mm - ex.: 15/01/2020 20:00',
        value => {
          const parsed = parse(value, dateFormat, new Date());
          return isDate(parsed) && isValid(parsed);
        }
      ),
    location: Yup.string().required('Insira a localização'),
    banner_id: Yup.number(),
  });

  return (
    <Container>
      <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
        <ImageInput name="banner_id" />
        <Input name="name" placeholder="Titulo do Meetup" />
        <Input name="description" placeholder="Descrição completa" />
        <Input name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />
        <ButtonContainer>
          <ContentButton type="submit">
            <MdControlPoint color="#fff" size="20" />
            <span>Salvar Meetup</span>
          </ContentButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
