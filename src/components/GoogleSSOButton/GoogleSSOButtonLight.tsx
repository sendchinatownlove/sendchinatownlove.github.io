import React from 'react';
import styled from 'styled-components';
import GoogleIcon from './GoogleLogo';

interface Props {
  handleClick: (args: any) => void;
}

const SSOButton = (props: Props) => {
  return (
    <Button type="button">
      <GoogleIcon width="36" height="36" />
      <Text>Sign in with Google</Text>
    </Button>
  );
};

export default SSOButton;

const Button = styled.button`
  background: white;
  // box-shadow: 0px 0px 1px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
  border: 0px solid white;
  // border-radius: 2px;
  // width: 180px;
  // height: 40px;
  border-radius: 8px;
  width: 370px;
  height: 80px;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  align-items: center;

  &:hover,
  &:active {
    background: rgb(238, 238, 238);
  }
`;

const Text = styled.span`
  margin-left: 24px;
  font-size: 28px;
  font-weight: 500;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  color: rgba(0, 0, 0, 0.54);
`;
