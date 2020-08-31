import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { Title, SubTitle, Button, ErrorMessage } from './style';
import { EMAIL_REGEX } from '../../utilities/hooks/ModalPaymentContext/constants';
import {
  getPassportEmailId,
  createPassportEmailId,
  updatePassportInstagram,
  checkForValidTicket,
  updateTicketContactId,
  getPassportTickets,
} from '../../utilities/api/interactionManager';

import CrawlInfoIcon from './CrawlInfoIcon.png';
import CircleLogo from './CircleLogo.png';

interface Props {
  setCurrentScreenView: Function;
}

const Track = ({ setCurrentScreenView }: Props) => {
  const { push } = useHistory();
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [ticketCode, setTicketCode] = useState('');
  const [isTicketValid, setIsTicketValid] = useState(true);

  const [instagramHandle, setinstagramHandle] = useState('');

  const findOrCreateUser = async (email, viewTickets) => {
    const { data } = await getPassportEmailId(email);

    // (to view tickets): sets error message for non-existent users and users with no tickets
    if (viewTickets && !data) {
      setIsEmailValid(false);
      setEmail('');
      return;
    } else if (viewTickets && data) {
      const { data: hasTickets } = await getPassportTickets(data.id);
      if (hasTickets.length) push(`/passport/${data.id}/tickets`);
      else setIsEmailValid(false);
      return;
    }

    // (to add tickets): searches for existing user or creates new user
    let contactId = '';
    if (data) {
      contactId = data.id;
      // updates instagram handle for existing users
      if (instagramHandle) {
        await updatePassportInstagram(contactId, instagramHandle);
      }
    } else {
      const {
        data: { id },
      } = await createPassportEmailId(email, instagramHandle);
      contactId = id;
    }
    await findTicketCode(ticketCode, contactId);
  };

  const findTicketCode = async (code, contactId) => {
    let formattedCode = code.split('-').join('');
    formattedCode = formattedCode.toUpperCase();

    const { data } = await checkForValidTicket(formattedCode);
    if (data && !data.contact_id) {
      const { data: newContactId } = await updateTicketContactId(
        formattedCode,
        contactId
      );
      newContactId && push(`/passport/${newContactId.contact_id}/tickets`);
    } else {
      setIsTicketValid(false);
      setTicketCode('');
    }
  };

  // const formatTicketCode = (code) => {
  //   if (code.length === 3) {
  //     setTicketCode(code + '-');
  //   }
  // };

  const SupporterTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#ffffff',
      color: 'rgba(0, 0, 0, 0.87)',
      width: '100%',
      fontSize: theme.typography.pxToRem(14),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const socialMediaLinks = [
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/Send-Chinatown-Love-100872288240891',
    },
    { platform: 'instagram', url: 'https://instagram.com/sendchinatownlove' },
    {
      platform: 'wechat',
      url:
        'https://www.sendchinatownlove.com/uploads/1/3/1/9/131935948/wechat_scl.png',
    },
  ];

  return (
    <Container>
      <PassportCard>
        <Logo src={CircleLogo} alt="scl-log" />
        <InputContainer className="trackScreen top">
          <Title color="#a8192e">PASSPORT TO CHINATOWN</Title>
          <SubTitle>
            Enter your ticket code to start accumulating rewards you can use in
            Chinatown
          </SubTitle>

          <Column />

          <Column>
            <Label htmlFor="email-input">Email Address</Label>
            <InputField
              name="email-input"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValid(true);
              }}
              value={email}
              pattern={EMAIL_REGEX.source}
            />
            {!!email && !EMAIL_REGEX.test(email) && (
              <ErrorMessage>Please enter a valid email address.</ErrorMessage>
            )}
            {!isEmailValid && (
              <ErrorMessage>
                Sorry, there are no saved tickets tied to this email.
              </ErrorMessage>
            )}
          </Column>

          <Column>
            <Label htmlFor="ticket-code">Ticket Code</Label>
            <InputField
              name="ticket-code"
              type="text"
              onChange={(e) => {
                setTicketCode(e.target.value);
                setIsTicketValid(true);
              }}
              // onKeyUp={(e) => {
              //   if (e.key !== 'Backspace' || e.keyCode !== 8) {
              //     formatTicketCode(e.target['value']);
              //   }
              // }}
              value={ticketCode}
              maxLength={6}
            />
            {!isTicketValid && (
              <ErrorMessage>
                This is not a valid Ticket Code. Please check your ticket again
                and make sure you haven’t added this ticket before.
              </ErrorMessage>
            )}
          </Column>

          <Column>
            <Row className="row-no-margin">
              <Label htmlFor="instagram-handle">
                Instagram Handle <strong>(for Digital Giveaway)</strong>
              </Label>
              <SupporterTooltip
                title={
                  <React.Fragment>
                    <ToolTipTable>
                      <tbody>
                        <tr>
                          To be entered into our weekly Digital Giveaways, visit
                          3 merchants and post and tag{' '}
                          <strong>@sendchinatownlove</strong>
                          &nbsp;with your food crawl pictures on Instagram.
                          Enter your Instagram handle so we can track your
                          entries.
                        </tr>
                      </tbody>
                    </ToolTipTable>
                  </React.Fragment>
                }
                enterTouchDelay={10}
                leaveTouchDelay={6000}
                placement="left"
              >
                <div>
                  <img src={CrawlInfoIcon} alt="instagram-crawl-info" />
                </div>
              </SupporterTooltip>
            </Row>
            <InputField
              name="instagram-handle"
              type="text"
              onChange={(e) => setinstagramHandle(e.target.value)}
              value={instagramHandle}
              placeholder="@"
            />
            <SubTitle color="grey" size="11px" align="left">
              Optional
            </SubTitle>
          </Column>
        </InputContainer>

        <InputContainer className="bottom">
          <Button
            value="track-screen-button"
            className="button--red-filled"
            disabled={!email || !ticketCode || !isTicketValid}
            onClick={() => {
              findOrCreateUser(email, false);
            }}
          >
            Add Ticket
          </Button>
          {!!email && EMAIL_REGEX.test(email) && (
            <Button
              className="linkButton"
              disabled={!email}
              onClick={() => {
                findOrCreateUser(email, true);
              }}
            >
              View my tickets
            </Button>
          )}
        </InputContainer>
      </PassportCard>

      <Row>
        <ExternalLinks
          href="https://www.sendchinatownlove.com/food-crawl.html"
          target="_blank"
        >
          Learn More
        </ExternalLinks>
        <LinksContainer>
          {socialMediaLinks.map((social) => (
            <Icon href={social.url} target="_blank">
              <span className={`fa fa-${social.platform}`} />
            </Icon>
          ))}
        </LinksContainer>
      </Row>
    </Container>
  );
};

export default Track;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 367px;
  margin: 0 auto;
`;

const PassportCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  width: 367px;
  margin: 50px 0px 0px;
  z-index: 0;
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25));
`;

const Logo = styled.img`
  z-index: 10;
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 50%;
  margin-bottom: -50px;
`;

export const InputContainer = styled.div`
  background-color: white;
  padding: 25px 20px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;

  &.trackScreen {
    padding-top: 60px;
  }

  &.top {
    border-radius: 20px 20px 0px 0px;
    border-bottom: 1px dashed #dedede;
  }

  &.bottom {
    padding-top: 25px;
    border-radius: 0px 0px 20px 20px;
    border-top: 1px dashed #dedede;
    text-align: center;
  }

  &.red {
    color: #a8192e;
  }
`;

const Label = styled.label`
  font-size: 13px;
`;

const Column = styled.div`
  margin: 15px 0;
`;

const InputField = styled.input`
  width: 100%;
  height: 45px;
  border: 1px solid #dadada;
  margin-top: 8px;
  padding-left: 1em;
  border-radius: 5px;
  outline: none;
  -webkit-appearance: none;

  :invalid {
    border: 1px solid red;
  }
`;

const ToolTipTable = styled.table`
  width: 100%;
`;

// FOOTER
export const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0 25px;
  width: 100%;
  justify-content: space-between;

  &.row-no-margin {
    margin: 0 auto;
  }
`;

export const ExternalLinks = styled.a`
  font-weight: bold;
  text-transform: uppercase;
  color: black;
  font-size: 12px;
  margin: 20px;
  cursor: pointer;
  letter-spacing: 2px;
`;

const LinksContainer = styled.div`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
`;

const Icon = styled.a`
  text-decoration: none;
  color: #a8192e;
  padding: 0 15px;
  font-size: 22px;
`;
