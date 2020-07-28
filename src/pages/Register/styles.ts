import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;

  a {
    text-decoration: none;
    color: #3a3a3a;
  }
`;

export const Form = styled.form<FormProps>`
  width: 100%;
  max-width: 360px;
  margin: 0px auto;

  input {
    flex: 1;
    height: 50px;
    width: 100%;
    padding: 0 24px;
    border-radius: 5px;
    color: #3a3a3a;
    border: 2px solid #ccc;
    margin-top: 10px;

    ${(props) => props.hasError && css`
      border-color: #c53030;
    `}

    &::placeholder {
      color: #a8a8b3
    }
  }

  button {
    width: 100%;
    height: 50px;
    background: #04d361;
    border-radius: 5px;
    border: 0;
    color: #fff;
    margin-top: 10px;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
