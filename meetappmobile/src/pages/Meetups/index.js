/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

import { format, subDays, addDays, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import Header from '~/components/Header';

import { Container, DateSelector, Button, Title, List } from './styles';

function Meetups({ isFocused }) {
  const profile = useSelector(state => state.user.profile);

  const [filterDate, setFilterDate] = useState(new Date());
  const dateFormatted = useMemo(
    () => format(filterDate, "d 'de' MMMM", { locale: pt }),
    [filterDate]
  );

  const [nextPage, setNextPage] = useState(1);
  const [reachedLast, setReachedLast] = useState(false);
  const [meetups, setMeetups] = useState([]);
  const [refresh, requireRefresh] = useState(0);
  let loading = false;

  function setMeetupState(meetup) {
    if (meetup.Subscriptions.length > 0) return 'showAlreadyRegistered';
    if (meetup.organizer_id === profile.id) return 'showOrganizer';
    return 'showSubscribe';
  }

  async function loadMeetups() {
    if (loading || reachedLast) return;
    loading = true;

    const isoDate = format(filterDate, 'yyyy-MM-dd');
    const response = await api.get(
      `meetupssubscriptions/?page=${nextPage}&date=${isoDate}`
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
  }, []);

  useEffect(() => {
    loadMeetups();
  }, [filterDate]);

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

  async function resetDate(date) {
    setNextPage(1);
    setReachedLast(false);
    setMeetups([]);
    setFilterDate(date);
  }

  async function handleSubtractDay() {
    resetDate(subDays(filterDate, 1));
  }

  async function handleAddDay() {
    resetDate(addDays(filterDate, 1));
  }

  async function handleSubscribe(id) {
    await api
      .post(`/meetups/${id}/subscriptions`)
      .then(response => {
        setMeetups(
          meetups.map(meetup =>
            meetup.id === response.data.meetup_id
              ? {
                  ...meetup,
                  Subscriptions: [{ id: response.data.id }],
                  state: 'showAlreadyRegistered',
                }
              : meetup
          )
        );
        Alert.alert('Meetapp', 'Inscrição realizada com sucesso');
      })
      .catch(error => {
        const errorMsg =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Erro na inscricão';
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
        <DateSelector>
          <Button onPress={handleSubtractDay}>
            <Icon name="chevron-left" size={40} color="#fff" />
          </Button>
          <Title>{dateFormatted}</Title>
          <Button onPress={handleAddDay}>
            <Icon name="chevron-right" size={40} color="#fff" />
          </Button>
        </DateSelector>
        <List
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup onSubscribe={() => handleSubscribe(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Meetups);
