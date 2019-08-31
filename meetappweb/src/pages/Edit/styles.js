import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 45px;

    > div {
      margin-bottom: 15px;
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 18px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    textarea {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 15px 15px;
      color: #fff;
      margin: 0 0 10px;
      font-size: 18px;
      height: 100px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 10px;
  text-align: right;
`;

export const Image = styled.div`
  border: 2px;
  border-color: #fff;
  width: 100%;
  height: 300px;
`;
