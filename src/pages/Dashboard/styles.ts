import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  max-width: 100%;
  align-content: space-between;
`;

export const Card = styled.div`
  display: flex;
  width: 100%;
  background: #3297a8;
  height: 50px;
  border-radius: 5px;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  margin: 5px;

  a {
    text-decoration: none;
    color: #ffffff;
  }
`;

export const Balance = styled.div`
  margin-top: 20px;
`;

export const Bills = styled.div`
  margin-top: 50px;
  max-width: 700px;

  div {
    margin: 10px 0px;
    flex: 1;

    span {
      margin-right: 5px;
    }
  }
`;
