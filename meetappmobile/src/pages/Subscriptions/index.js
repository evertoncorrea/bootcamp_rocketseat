/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { format, parseISO, isAfter } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import Header from '~/components/Header';

import { Container, List } from './styles';

function Subscriptions({ isFocused }) {
  const [nextPage, setNextPage] = useState(1);
  const [reachedLast, setReachedLast] = useState(false);
  const [meetups, setMeetups] = useState([]);
  const [refresh, requireRefresh] = useState(0);
  let loading = false;

  function setMeetupState(meetup) {
    if (isAfter(parseISO(meetup.date), new Date())) return 'showCancel';
    return 'showAlreadyPast';
  }

  async function loadMeetups() {
    if (loading || reachedLast) return;
    loading = true;

    const response = await api.get(
      `meetupssubscriptions/?page=${nextPage}&onlyRegisteredMeetups=true&onlyFutureMeetups=true`
    );
    const data = response.data.map(item => {
      return {
        ...item,
        formattedDate: format(parseISO(item.date), "d 'de' MMMM', às' HH'h'", {
          locale: pt,
        }),
        state: setMeetupState(item),
      };
    });

    if (data.length === 0) setReachedLast(true);
    setNextPage(nextPage + 1);
    setMeetups([...meetups, ...data]);
    loading = false;
  }

  useEffect(() => {
    loadMeetups();
    requireRefresh(0);
  }, [refresh]);

  useEffect(() => {
    if (isFocused) {
      setNextPage(1);
      setReachedLast(false);
      setMeetups([]);
      requireRefresh(1);
    }
  }, [isFocused]);

  async function handleCancel(id) {
    await api
      .delete(`/subscriptions/${id}`)
      .then(() => {
        setMeetups(meetups.filter(meetup => meetup.Subscriptions[0].id !== id));
        Alert.alert('Meetapp', 'Participação no meetup cancelada com sucesso');
      })
      .catch(error => {
        const errorMsg =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Erro no cancelamento';
        Alert.alert('Erro', errorMsg);
      });
  }

  async function handleEndReached() {
    loadMeetups();
  }

  return (
    <Background>
      <Container>
        <Header />
        <List
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              onCancel={() => handleCancel(item.Subscriptions[0].id)}
              data={item}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
