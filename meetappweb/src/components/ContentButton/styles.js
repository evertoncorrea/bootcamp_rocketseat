import styled from 'styled-components';
import { darken } from 'polished';

export const Button = styled.button`
  padding: 0 20px;
  height: 34px;
  background: ${props => props.backgroundColor || '#d44059'};
  color: #fff;
  border: 0;
  border-radius: 4px;
  transition: background 0.2s;
  font-size: 16px;

  > * {
    vertical-align: middle;
  }

  &:hover {
    background: ${props => darken(0.09, props.backgroundColor || '#d44059')};
  }

  span {
    margin-left: 10px;
  }
`;
