import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { CardContainer, TitleRow, Title, SubTitle, Button } from '../style';
import { MAILTO_URL } from '../../../consts';
import { getCrawlReceipts } from '../../../utilities/api/interactionManager';
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
  const [receipts, setReceipts] = useState<any[]>([]);

  useEffect(() => {
    push(`/lny-passport/${id}/tickets`);
    if (id) {
      getCrawlReceipts(id)
        .then((res) => {
          setReceipts(
            res.data.sort((a, b) => b.redemption_id - a.redemption_id)
          );
        })
        .catch((err) => {
          console.log('passport error: ' + err);
        });
    }
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
      getCrawlReceipts(id)
        .then((res) => {
          setReceipts(
            res.data.sort((a, b) => b.redemption_id - a.redemption_id)
          );
        })
        .catch((err) => {
          console.log('passport error: ' + err);
        });
    }
  }, [id]);

  useEffect(() => {
    if (receipts.length / 3 >= 1)
      setShowPopup(
        localStorage.getItem('amountOfReceipts') !==
          (receipts.length / 3 + 1).toString()
      );
  }, [receipts]);

  const createReceiptRows = (receipts) => {
    let rows: any[] = [];

    if (receipts.length > 0) {
      let tempReceipts = [...receipts];

      // push the stamps to rows of 3, if there arent 3, then push the left over amount
      while (tempReceipts.length) {
        rows.push(tempReceipts.splice(0, 3));
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
    const rows = createReceiptRows(stamps);
    return (
      <TableContainer>
        <Table>
          <tbody>
            {rows.map((row, index) => (
              <TicketRow
                receipts={row}
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

  const addReceipt = (e) => {
    e.preventDefault();
    props.setCurrentScreenView(ScreenType.Track);
    push(`/lny-passport`);
  };

  const closePopup = (e) => {
    e.preventDefault();
    setShowPopup(false);
    localStorage.setItem(
      'amountOfReceipts',
      ((receipts.length % 3) + 1).toString()
    );
  };

  const enterRaffleTicket = (e) => {
    e.preventDefault();
    props.setCurrentScreenView(ScreenType.Rewards);
    localStorage.setItem(
      'amountOfReceipts',
      ((receipts.length % 3) + 1).toString()
    );
  };

  return (
    <Container>
      {!showFaq && showPopup && (
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
                merchantsVisited: receipts.length,
              })}
              <br />
              <br />
              {t('passport.labels.thankYou', {
                stamps: 3 - (receipts.length % 3),
              })}
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
      <HeaderContainer>
        <RedirectionLinks
          href="https://www.sendchinatownlove.com/lny-crawl.html/"
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
                  daysLeft: Math.max(
                    moment('February 28, 2021').diff(moment(), 'days')
                  ).toString(),
                })}
              </SubHeader>
            )}
          </TitleRow>
          {!showFaq && createRows(receipts)}
        </PassportContainer>
      </BodyContainer>
      {!showFaq && (
        <AddNewReceipt className="button--filled" onClick={addReceipt}>
          {t('passport.placeholders.addNewReceipt').toUpperCase()}
        </AddNewReceipt>
      )}
    </Container>
  );
};

export default Passport;

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;

  margin: 0 auto;
  letter-spacing: 0.15em;

  display: flex;
  flex-direction: column;
  width: 100%;

  align-items: center;
  justify-content: center;
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
  position: absolute;
  top: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px auto;
  overflow: hidden;
`;
const RedirectionLinks = styled.a`
  text-transform: uppercase;
  color: black;
  font-weight: bold;
  letter-spacing: 0.15em;
  font-size: 12px;
  margin: 0 20px;
  text-align: center;
`;
const Logo = styled.img`
  width: 100px;
  height: 100px;
  filter: drop-shadow(0 0mm 2px #cdcdcd);
`;
const BodyContainer = styled.div`
  min-width: 375px;
  width: 100%;
  display: flex;
  justify-content: center;

  position: fixed;
  // top: 155px;
  bottom: 0;
  overflow: hidden;
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
  z-index: 20;
  // position: fixed;
  // bottom: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 95%;
  height: 500px;
  margin: 0 auto;
  padding: 15px;
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
  width: 50%;
  max-width: 193px;
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
