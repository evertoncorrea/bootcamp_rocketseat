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
    }
  }
  ul {
    margin-top: 40px;
  }
`;
export const Meetup = styled.li`
  margin-top: 10px;
  padding: 20px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: space-between;

  nav {
    strong {
      color: #fff;
      font-size: 20px;
      font-weight: normal;
    }
  }

  aside {
    display: flex;
    align-items: center;

    span {
      margin-right: 20px;
      color: rgba(255, 255, 255, 0.6);
    }
    button {
      background: none;
      border: none;
    }
  }
`;
