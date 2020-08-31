import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';

import {
  getPassportTickets,
  getParticipatingSeller,
  sendRedeemTicketsEmail,
  getContactInfo,
} from '../../utilities/api/interactionManager';
import {
  CardContainer,
  TitleRow,
  Title,
  SubTitle,
  Button,
  InstagramDisabled,
  InstagramEnabled,
} from './style';

import TicketRow from './TicketRow';
import FAQ from './Faq';

import PassportDashboardBackground from './PassportDashboardBackground.png';
import PassportIconImg from './passportIcon.png';
import CircleLogo from './CircleLogo.png';

interface Props {
  setCurrentScreenView: Function;
}

const Passport = (props: Props) => {
  const { id } = useParams();
  const { push, location } = useHistory();
  const [showFaq, setShowFaq] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);

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
        .then((contactInfo) => {
          setShowInstagram(contactInfo.data.instagram);
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
            const sortedTickets = passportTickets.sort((a, b) => {
              const dateA = new Date(a.associated_with_contact_at);
              const dateB = new Date(b.associated_with_contact_at);

              return dateB.getTime() - dateA.getTime();
            });

            setTickets(sortedTickets.reverse());
          }
        })
        .catch((err) => {
          console.log('passport error: ' + err);
        });
    }
  }, [id]);

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

  const sendEmail = () => {
    sendRedeemTicketsEmail(id).then((res) => {
      setShowEmailSent(true);
    });
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
                key={index}
                sendEmail={sendEmail}
              />
            ))}
          </tbody>
        </Table>
      </TableContainer>
    );
  };

  const addTicket = (e) => {
    e.preventDefault();
    push('/passport');
  };

  return (
    <Container>
      <HeaderContainer>
        <RedirectionLinks href="https://www.sendchinatownlove.com/food-crawl.html">
          Learn More
        </RedirectionLinks>
        <Logo src={CircleLogo} alt="scl-log" />
        <RedirectionLinks href="mailto:hello@sendchinatownlove.com">
          contact us
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
          <TitleRow>
            <Title color={showFaq ? 'grey' : 'black'}>PASSPORT TO CHINATOWN</Title>
            {showFaq ? (
              <>
                <br />
                <br />
                <br />
              </>
            ) : (
              <>
                <SubHeader color={showFaq ? 'transparent' : 'black'}>
                  {showInstagram
                    ? 'INSTAGRAM FOR GIVEAWAY ADDED'
                    : '9/1/2020 - 9/30/2020'}
                </SubHeader>
                <Icon>
                  {showInstagram ? (
                    <InstagramEnabled />
                  ) : (
                    <InstagramDisabled />
                  )}
                </Icon>
              </>
            )}
          </TitleRow>

          {showEmailSent && (
            <SendEmailContainer>
              <PassportIcon src={PassportIconImg} />
              <TitleRow>
                <Title>REWARD EMAIL SENT</Title>
                <SubTitle bold="700">
                  Check your inbox shortly for a link to access your available
                  rewards!
                  <br />
                  <br />
                  This link will expire in 30 minutes.
                </SubTitle>
              </TitleRow>
              <SendEmailButtonClose
                className="button--red-filled"
                onClick={(e) => setShowEmailSent(false)}
              >
                CLOSE
              </SendEmailButtonClose>
            </SendEmailContainer>
          )}
          {!showFaq && createRows(tickets)}
        </PassportContainer>
      </BodyContainer>
      {!showFaq && (
        <AddNewTicket className="button--filled" onClick={addTicket}>
          Add New Ticket
        </AddNewTicket>
      )}
    </Container>
  );
};

export default Passport;

const Container = styled.div`
  position: relative;
  width: 375px;
  hidden: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const PassportContainer = styled(CardContainer)`
  background-size: 400px;
  background-image: url(${PassportDashboardBackground});
  max-height: 650px;
`;

const SubHeader = styled(SubTitle)`
  font-style: italic;
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
  position: relative;
  display: flex;
  justify-content: center;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  height: calc(100vh - 300px);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 12px;
`;

const AddNewTicket = styled(Button)`
  position: fixed;
  margin-left: -150px;
  bottom: 0;
  left: 50%;
  width: 300px;
  z-index: 100;
  font-weight: bold;
`;

const SendEmailContainer = styled.div`
  position: absolute;
  width: 340px;
  margin: 0 auto;
  height: 260px;
  z-index: 20;
  top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background: #f2eae8;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
`;

const PassportIcon = styled.img`
  width: 59px;
  height: 76px;
`;

const SendEmailButtonClose = styled(Button)`
  height: 32px;
  width: 115px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

const Icon = styled.div`
  position: absolute;
  right: 10px;
  text-decoration: none;
  color: black;
  padding: 10px 15px;
  font-size: 22px;
`;
