import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Logo } from '../../components/Logos/Logos';
import GoogleSSOButtonLight from '../../components/GoogleSSOButton/GoogleSSOButtonLight';
import Footer from '../../components/Footer/Footer';

import {
  getAuthGoogle,
  requestAuthPasswordless,
} from '../../utilities/api/interactionManager';

const DistributorLoginView = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO ask about email validation
    requestAuthPasswordless(email);
  };

  const handleGoogleSSOClick = () => {
    getAuthGoogle();
  };
  return (
    <Main>
      <Nav>
        <a href="/">
          <Logo />
        </a>
      </Nav>
      <Header>
        <Heading>Distributor Dashboard: Gift-a-Meal Tracker</Heading>
      </Header>
      <Section>
        <Paragraph>
          Please enter the email you have provided to the Send Chinatown Love
          Team. You'll receive a unique link in your email to access your Gift a
          Meal Distributor Dashboard shortly - this link will expire in 10
          minutes.
        </Paragraph>

        <Form onSubmit={handleSubmit}>
          <Label>
            Email Address
            <Input value={email} onChange={handleChange} type="text" />
          </Label>
          <SubmitBtn>Send Link</SubmitBtn>
        </Form>
        <span>
          Forgot your email? Send us a message at{' '}
          <a href="mailto:hello@sendchinatownlove.com">
            hello@sendchinatownlove.com
          </a>
        </span>
        <SeparatorWrapper>
          <Divider />
          <SSOText>Or sign in with Google</SSOText>
        </SeparatorWrapper>
        <GoogleSSOButtonLight handleClick={handleGoogleSSOClick} />
      </Section>
      <Footer />
    </Main>
  );
};

export default DistributorLoginView;

const Main = styled.main`
  width: 100%;
  min-height: 100%;
`;

const Nav = styled.nav`
  margin: 22px 130px;
`;

const Header = styled.header`
  width: 100%;
  height: 218px;
  background: rgb(168, 25, 46);
  padding: 82px 0 0 129px;
  box-sizing: border-box;
`;

const Heading = styled.h1`
  color: white;
  font-size: 24px;
`;

const Section = styled.section`
  margin: 0 130px 80px;
`;

const Paragraph = styled.p`
margin: 54px 0 92px;
font-size: 24px
width: 821px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Label = styled.label`
  display: inline-block;
  width: 680px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 28px;
  height: 56px;
`;
const SubmitBtn = styled.button`
  margin-left: 54px;
  width: 348px;
  height: 56px;
  box-sizing: border-box;
  padding: 18px 0;
  color: white;
  background: rgb(18, 18, 18);
  font-weight: bold;
  border: 0px solid white;
  border-radius: 50px;
  text-transform: uppercase;

  &:hover {
    background: rgb(171, 25, 46);
  }
`;

const SeparatorWrapper = styled.div`
  margin: 74px 0 40px;
  width: 372px;
  position: relative;
  display: flex;
  justify-content: center;
`;
const Divider = styled.div`
  z-index: -1;
  position: absolute;
  top: 10px;
  width: 372px;
  border-bottom: 1px solid rgb(156, 156, 156);
`;

const SSOText = styled.span`
  font-size: 18px;
  background: white;
  width: 212px;
  text-align: center;
`;
