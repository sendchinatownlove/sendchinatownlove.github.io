import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CardContainer, TitleRow, Title, SubTitle, Button } from '../style';
import { MAILTO_URL } from '../../../consts';
import {
  getPassportTickets,
  getParticipatingSeller,
  getContactInfo,
} from '../../../utilities/api/interactionManager';
import ScreenType from '../ScreenTypes';

import TicketRow from './TicketRow';
import FAQ from './Faq';

import CircleLogo from '../Assets/CircleLogo.png';
import RaffleTicketCombo from '../Assets/RaffleTicketCombo.png';

interface Props {
  setCurrentScreenView: Function;
}

const Passport = (props: Props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { push, location } = useHistory();
  const [showFaq, setShowFaq] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    push(`/lny-passport/${id}/tickets`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.hash === '#faq') {
      setShowFaq(true);
    } else {
      setShowFaq(false);
    }
  }, [location]);

  useEffect(() => {
    if (id) {
      getContactInfo(id)
        .then((res) => {
          return getPassportTickets(id);
        })
        .then((ticketIds) => {
          let promises: any[] = [];
          ticketIds.data.forEach((ticket) => {
            promises.push(
              getParticipatingSeller(ticket.participating_seller_id).then(
                (seller) => ({
                  stamp_url: seller.data.stamp_url,
                  ...ticket,
                })
              )
            );
          });

          return Promise.all(promises);
        })
        .then((passportTickets) => {
          if (passportTickets.length > 0) {
            setTickets(passportTickets);
          }
        })
        .catch((err) => {
          console.log('passport error: ' + err);
        });
    }
  }, [id]);

  useEffect(() => {
    if (tickets.length / 3 >= 1)
      setShowPopup(
        localStorage.getItem('amountOfRedemptions') !==
          ((tickets.length % 3) + 1).toString()
      );
  }, [tickets]);

  const daysLeft = (endDate) => {
    const DaysEnd = new Date(endDate);
    const DateNow = new Date();
    const distance = DaysEnd.getDate() - DateNow.getDate();
    if (distance < 0) {
      return 0;
    }

    return distance;
  };

  const createTicketRows = (tickets) => {
    let rows: any[] = [];

    if (tickets.length > 0) {
      // make a temp ticket that sorts the tickets by sponsor seller, then redemption date
      let tempTickets = [...tickets];

      // push the stamps to rows of 3, if there arent 3, then push the left over amount
      while (tempTickets.length) {
        rows.push(tempTickets.splice(0, 3));
      }
    }

    // if there are less than 6 rows, make 6 rows, other wise make one extra row
    if (rows.length < 6) {
      while (rows.length < 6) {
        rows.push([]);
      }
    } else {
      rows.push([]);
    }

    return rows;
  };

  const createRows = (stamps) => {
    const rows = createTicketRows(stamps);
    return (
      <TableContainer>
        <Table>
          <tbody>
            {rows.map((row, index) => (
              <TicketRow
                stamps={row}
                index={index}
                key={'row' + index}
                setCurrentScreenView={props.setCurrentScreenView}
              />
            ))}
          </tbody>
        </Table>
      </TableContainer>
    );
  };

  const addTicket = (e) => {
    e.preventDefault();
    props.setCurrentScreenView(ScreenType.Track);
  };

  const closePopup = (e) => {
    e.preventDefault();
    setShowPopup(false);
    localStorage.setItem(
      'amountOfRedemptions',
      ((tickets.length % 3) + 1).toString()
    );
  };

  const enterRaffleTicket = (e) => {
    e.preventDefault();
    props.setCurrentScreenView(ScreenType.Rewards);
    localStorage.setItem(
      'amountOfRedemptions',
      ((tickets.length % 3) + 1).toString()
    );
  };

  return (
    <Container>
      <HeaderContainer>
        <RedirectionLinks
          href="https://www.sendchinatownlove.com/food-crawl.html"
          target="_blank"
        >
          {t('passport.headers.learn')}
        </RedirectionLinks>
        <Logo src={CircleLogo} alt="scl-log" />
        <RedirectionLinks href={MAILTO_URL}>
          {t('passport.headers.contact')}
        </RedirectionLinks>
      </HeaderContainer>
      <BodyContainer>
        <FAQ
          showFaq={showFaq}
          toggleView={() => push(location.pathname + '#faq')}
        />
        <PassportContainer
          mainView={!showFaq}
          onClick={() => push(location.pathname)}
        >
          <TitleRow active={!showFaq}>
            <Title
              color={showFaq ? 'rgba(255, 255, 255, 0.7)' : 'rgb(248,186,23,1)'}
            >
              {t('passport.headers.passport').toUpperCase()}
            </Title>
            {showFaq ? (
              <>
                <br />
                <br />
                <br />
              </>
            ) : (
              <SubHeader color={showFaq ? 'transparent' : 'white'}>
                {t('passport.labels.daysLeft', {
                  daysLeft: daysLeft('February 28, 2021'),
                })}
              </SubHeader>
            )}
          </TitleRow>

          {showPopup && (
            <SendEmailContainer>
              <TextContainer>
                <PassportIcon src={RaffleTicketCombo} />
                <br />
                <Title>
                  {t('passport.headers.raffleTicketEarned').toUpperCase()}
                </Title>
                <br />
                <SubTitle>
                  {t('passport.labels.merchantsVisited', {
                    merchantsVisited: 3,
                  })}
                  <br />
                  <br />
                  {t('passport.labels.thankYou', { stamps: 2 })}
                </SubTitle>
              </TextContainer>

              <EnterRaffleButton
                className="button--filled"
                onClick={enterRaffleTicket}
              >
                {t('passport.placeholders.enterMyRaffle').toUpperCase()}
              </EnterRaffleButton>
              <SendEmailButtonClose onClick={closePopup}>
                {t('passport.placeholders.close')}
              </SendEmailButtonClose>
            </SendEmailContainer>
          )}
          {!showFaq && createRows(tickets)}
          {!showFaq && (
            <AddNewReceipt className="button--filled" onClick={addTicket}>
              {t('passport.placeholders.addNewReceipt').toUpperCase()}
            </AddNewReceipt>
          )}
        </PassportContainer>
      </BodyContainer>
    </Container>
  );
};

export default Passport;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 375px;
  letter-spacing: 0.15em;
  overflow: hidden;
`;

const PassportContainer = styled(CardContainer)<{
  mainView: Boolean;
}>`
  position: fixed;
  bottom: 0;
  top: ${(props) => (props.mainView ? '180px' : '130px')};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;
const SubHeader = styled(SubTitle)`
  font-style: italic;
  font-weight: bold;
`;
const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 12px auto;
`;
const RedirectionLinks = styled.a`
  text-transform: uppercase;
  color: black;
  font-weight: bold;
  letter-spacing: 0.15em;
  font-size: 12px;
`;
const Logo = styled.img`
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 0mm 2px #cdcdcd);
`;
const BodyContainer = styled.div`
  width: 375px;
  display: flex;
  justify-content: center;

  position: absolute;
  top: 155px;
  bottom: 0;
`;
const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 12px;
`;
const AddNewReceipt = styled(Button)`
  position: fixed;
  bottom: 0;
  width: 300px;
  z-index: 10;
  font-weight: bold;
  justify-self: center;
  align-self: center;
`;
const SendEmailContainer = styled.div`
  padding: 15px;
  position: absolute;
  width: 95%;
  margin: 0 auto;
  z-index: 20;
  top: 15px;
  bottom: 15px;

  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 5px;
`;
const TextContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PassportIcon = styled.img`
  width: 193px;
  height: 190px;
`;
const SendEmailButtonClose = styled(Button)`
  text-align: center;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a8192e;

  background: center;
  border: none;
`;
const EnterRaffleButton = styled(Button)`
  font-weight: 700;
`;
