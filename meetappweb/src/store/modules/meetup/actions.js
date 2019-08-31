export function createMeetupRequest(data) {
  return {
    type: '@meetup/CREATE_MEETUP_REQUEST',
    payload: { data },
  };
}
export function updateMeetupRequest(data) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { data },
  };
}
export function cancelMeetupRequest(data) {
  return {
    type: '@meetup/CANCEL_MEETUP_REQUEST',
    payload: { data },
  };
}
