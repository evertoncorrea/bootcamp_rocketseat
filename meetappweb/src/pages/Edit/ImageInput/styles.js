import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 200px;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.3);

  div {
    display: ${props => (!props.visible ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 55px;

    strong {
      margin-top: 5px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 18px;
    }
  }
  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 100%;
      width: 100%;
      display: ${props => (props.visible ? 'unset' : 'none')};
    }

    input {
      display: none;
    }
  }
`;
