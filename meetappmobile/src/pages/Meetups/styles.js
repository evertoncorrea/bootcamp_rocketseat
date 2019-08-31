import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;
export const DateSelector = styled.View`
  align-self: center;
  align-content: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;
export const Button = styled(RectButton)``;
export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;

  width: 240px;
  text-align: center;
`;
export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;
