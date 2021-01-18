import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Title, SubTitle, Button, ErrorMessage } from '../style';
import { socialMediaLinks } from '../../../consts';
import {
  getPassportEmailId,
  createPassportEmailId,
  updatePassportInstagram,
  checkForValidTicket,
  updateTicketContactId,
  getPassportTickets,
  getUploadUrl,
  sendImage,
} from '../../../utilities/api/interactionManager';
import { ModalPaymentConstants } from '../../../utilities/hooks/ModalPaymentContext';

import CrawlInfoIcon from '../Assets/CrawlInfoIcon.png';
import CircleLogo from '../Assets/CircleLogo.png';

interface Props {
  setCurrentScreenView: Function;
}

const Track = (props: Props) => {
  const { t } = useTranslation();
  const { push } = useHistory();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [ticketCode, setTicketCode] = useState('');
  const [isTicketValid, setIsTicketValid] = useState(true);

  const [instagramHandle, setinstagramHandle] = useState('');

  const [receipt, setReceipt] = useState<File | null>(null);

  const uploadPhoto = async () => {
    let filename;

    if (receipt === null || email.length === 0) {
      return false;
    }

    try {
      const ext = receipt.type.split('/')[1];
      filename = `${email.split('@')[0]}-${new Date()
        .toISOString()
        .replace(/(:|\.)/g, '-')}.${ext}`;

      const signedUrl = unescape(
        (await getUploadUrl(filename, receipt.type)).data.url
      );

      await sendImage(signedUrl, filename, receipt);

      // save filename and send with final request to be saved in DB
    } catch (err) {
      console.log(err);
    }
  };

  const findOrCreateUser = async (email, viewTickets) => {
    const { data } = await getPassportEmailId(email);

    // (to view tickets): sets error message for non-existent users and users with no tickets
    if (viewTickets && !data) {
      setEmailError(t('passport.errors.noTickets'));
      setEmail('');
      return;
    } else if (viewTickets && data) {
      const { data: hasTickets } = await getPassportTickets(data.id);
      if (hasTickets.length) push(`/passport/${data.id}/tickets`);
      else setEmailError(t('passport.errors.noTickets'));
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

  return (
    <Container>
      <PassportCard>
        <Logo src={CircleLogo} alt="scl-log" />
        <InputContainer className="trackScreen top">
          <Title color="#a8192e">{t('passport.headers.passport')}</Title>
          <SubTitle>{t('passport.labels.enterTicket')}</SubTitle>
          <Column />
          <Column>
            <Label htmlFor="email-input">{t('passport.labels.email')}</Label>
            <InputField
              name="email-input"
              type="email"
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
                setEmailError('');
              }}
              onBlur={(e) => {
                e.preventDefault();
                if (!!email && !ModalPaymentConstants.EMAIL_REGEX.test(email)) {
                  setEmailError(t('passport.errors.validEmail'));
                }
              }}
              value={email}
              pattern={ModalPaymentConstants.EMAIL_REGEX.source}
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </Column>

          <Column>
            <Label htmlFor="ticket-code">
              {t('passport.labels.ticketCode')}
            </Label>
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
              <ErrorMessage>{t('passport.errors.validTicket')}</ErrorMessage>
            )}
          </Column>

          <Column>
            <Row className="row-no-margin">
              <Label htmlFor="instagram-handle">
                {t('passport.labels.instagramHandle')}{' '}
                <strong>{t('passport.labels.instagramHandlePrompt')}</strong>
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
              {t('passport.labels.optional')}
            </SubTitle>
          </Column>

          <Column>
            <input
              type="file"
              id="imageFile"
              capture="environment"
              accept="image/*"
              onChange={(event) => {
                const file: File | null =
                  event.target.files && event.target.files.length > 0
                    ? event.target.files[0]
                    : null;
                console.log(file);
                setReceipt(file);
              }}
            />
          </Column>
        </InputContainer>

        <InputContainer className="bottom">
          <Button
            value="track-screen-button"
            className="button--red-filled"
            disabled={!email || !ticketCode || !isTicketValid}
            onClick={() => {
              uploadPhoto();
            }}
          >
            {t('passport.placeholders.addTicket')}
          </Button>
          {!!email && ModalPaymentConstants.EMAIL_REGEX.test(email) && (
            <Button
              className="linkButton"
              disabled={!email}
              onClick={() => {
                uploadPhoto();
              }}
            >
              {t('passport.placeholders.viewItem')}
            </Button>
          )}
        </InputContainer>
      </PassportCard>

      <Row>
        <ExternalLinks
          href="https://www.sendchinatownlove.com/food-crawl.html"
          target="_blank"
        >
          {t('passport.headers.learn')}
        </ExternalLinks>
        <LinksContainer>
          {socialMediaLinks.map((social) => (
            <Icon href={social.url} key={social.platform} target="_blank">
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
  font-size: 16px;
  color: grey;

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
