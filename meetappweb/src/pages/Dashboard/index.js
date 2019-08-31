import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

import pt from 'date-fns/locale/pt';
import { MdControlPoint, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';

import history from '~/services/history';

import ContentButton from '~/components/ContentButton';
import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      const data = response.data.map(item => {
        return {
          ...item,
          formattedDate: format(
            parseISO(item.date),
            "d 'de' MMMM', às' HH'h'",
            {
              locale: pt,
            }
          ),
        };
      });

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  function handleNewMeetup() {
    history.push('/edit');
  }

  function handleDetails(id) {
    history.push(`/details/${id}`);
  }

  return (
    <Container>
      <header>
        <nav>
          <strong>Meus Meetups</strong>
        </nav>
        <aside>
          <ContentButton onClick={handleNewMeetup}>
            <MdControlPoint color="#fff" size="20px" />
            <span>Novo Meetup</span>
          </ContentButton>
        </aside>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Meetup key={meetup.id} past={meetup.past}>
            <nav>
              <strong>{meetup.name}</strong>
            </nav>
            <aside>
              <span>{meetup.formattedDate}</span>
              <button
                type="button"
                onClick={() => {
                  handleDetails(meetup.id);
                }}
              >
                <MdChevronRight color="#fff" size="26" />
              </button>
            </aside>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
