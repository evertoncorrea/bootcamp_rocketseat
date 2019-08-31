import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  background-color: #fff;
  margin-bottom: 30px;
  border-radius: 4px;
`;

export const MeetupImage = styled.Image`
  flex: 1;
  height: undefined;
  width: undefined;
  align-self: stretch;
`;

export const MeetupImageContainer = styled.View`
  width: 100%;
  height: 140px;
`;

export const DataContainer = styled.View`
  padding: 15px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;

export const MButton = styled(Button)`
  margin-top: 15px;
`;

export const StateTextContainer = styled.View`
  margin-top: 15px;

  height: 46px;
  background: #fff;
  border-radius: 4px;
  border-width: 2px;
  border-color: #f94d6a;

  align-items: center;
  justify-content: center;
`;
export const StateText = styled.Text`
  color: #f94d6a;
  font-weight: bold;
  font-size: 16px;
`;
