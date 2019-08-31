import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    width: 100%;
    max-width: 900px;
    justify-content: space-between;

    nav > strong {
      color: #fff;
      font-size: 32px;
    }

    aside {
      display: flex;
      align-items: center;

      button {
        margin-left: 15px;
      }
    }
  }

  img {
    margin-top: 30px;
  }
`;

export const Description = styled.div`
  margin-top: 30px;
  white-space: pre-line;
  font-size: 16px;
  color: #fff;
  text-align: justify;
`;

export const TimeLocation = styled.div`
  margin-top: 30px;

  > * {
    vertical-align: middle;
  }

  span {
    color: rgba(255, 255, 255, 0.6);
    margin-left: 5px;
    margin-right: 20px;
  }
`;
