import { takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

function saveSuccess(id) {
  toast.success('Meetup salvo com sucesso');
  history.push(`/details/${String(id)}`);
}

export function* createMeetup({ payload }) {
  try {
    const response = yield call(api.post, 'meetups', payload.data);

    saveSuccess(response.data.id);
  } catch (err) {
    toast.error('Erro ao criar meetup, confira seus dados!');
  }
}

export function* updateMeetup({ payload }) {
  try {
    const response = yield call(
      api.put,
      `meetups/${payload.data.id}`,
      payload.data
    );

    saveSuccess(response.data.id);
  } catch (err) {
    toast.error('Erro ao salvar meetup, confira seus dados!');
  }
}

export function* cancelMeetup({ payload }) {
  try {
    yield call(api.delete, `meetups/${payload.data.id}`);

    toast.success('Meetup cancelado com sucesso');
    history.push(`/dashboard`);
  } catch (err) {
    toast.error('Erro ao cancelar meetup!');
  }
}

export default all([
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
  takeLatest('@meetup/CANCEL_MEETUP_REQUEST', cancelMeetup),
]);
