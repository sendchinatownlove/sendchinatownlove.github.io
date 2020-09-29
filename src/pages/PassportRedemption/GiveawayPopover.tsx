import React , { useState, useEffect } from 'react';
import styled from 'styled-components';

import GreenCheck from './GreenCheck'
import InstagramEnabled from './InstagramEnabled'
import InstagramDisabled from './InstagramDisabled';

import { getAllParticipatingSellers, getGiveawayTicketsForContact } from '../../utilities/api/interactionManager'


interface Props {
  showInstagram : boolean
  contactId: string
}

interface TextProps {
  icon ?: boolean
}

interface IgButtonProps {
  disabled ?: boolean
}
interface GiveawayData {
  weekly_giveaway_entries: String
  number_of_visits_left : undefined | number
}

const GiveawayPopover = (props: Props) => {
  const [showInfo, setShowInfo] = useState(false);
  const [giveawayData, setData] = useState<GiveawayData>({
    weekly_giveaway_entries: '',
    number_of_visits_left: undefined
  })
  useEffect(() => {
    async function setGiveawayCount(contactId: string) {
      try {
        const qtySellers = await getAllParticipatingSellers()
          .then((res) => res.data.length);
        const { weekly_giveaway_entries, unique_seller_tickets } = await getGiveawayTicketsForContact(contactId)
          .then((res) => res.data);
        setData({weekly_giveaway_entries, number_of_visits_left: qtySellers - unique_seller_tickets})
      } catch (err) {
        console.error(err);
      }
    }
    if (props.showInstagram && showInfo) {
      setGiveawayCount(props.contactId)
    }
  }, [props.showInstagram, showInfo, props.contactId])
  return (
    <PopoverContainer>
      {props.showInstagram && showInfo && <PopoverContent>
        <ToggleClosedButton onClick={() => setShowInfo(false)}>
          <InstagramEnabled/>
        </ToggleClosedButton>
        <Title>
          INSTAGRAM FOR GIVEAWAY ADDED
        </Title>
        <Divider/>
        <GiveawayTextContainer>
          <InfoText>
            <TextBold>{giveawayData.weekly_giveaway_entries}</TextBold>
            <GeneralText>
              Weekly Giveaway Entries
            </GeneralText>
          </InfoText>

          {giveawayData.number_of_visits_left !== 0 ?
          <InfoText>
            <TextBold>{giveawayData.number_of_visits_left}</TextBold>
            <GeneralText>
              Vendor Tickets away from a Grand Prize Giveaway Entry
            </GeneralText>
          </InfoText> :
          <InfoText icon={true}>
            <IconWrap>
              <GreenCheck/>
            </IconWrap>
            <GeneralText>Grand Prize Giveaway Entered</GeneralText>
          </InfoText>
          }
        </GiveawayTextContainer>
        <SubText>
        Weekly Giveaway winners are announced on Instagram each Monday during the month of September. Grand Prize winners will be announced on October 1st.
        </SubText>
        <CloseButton type='button' onClick={() => setShowInfo(false)}>
          CLOSE
        </CloseButton>
      </PopoverContent>}
      {
        props.showInstagram ?
        <InstagramButton onClick={() => setShowInfo(!showInfo)}>
          <InstagramEnabled/>
        </InstagramButton> :
        <InstagramButton disabled={true}>
          <InstagramDisabled/>
        </InstagramButton>
      }
    </PopoverContainer>
  )
}

export default GiveawayPopover

const PopoverContainer = styled.div`
  position: absolute;
  right: 0;
`;

const InstagramButton = styled.div`
  position: absolute;
  right: ${(props:IgButtonProps) => props.disabled ? '8.5px' : '4px'};
  top: ${(props:IgButtonProps) => props.disabled ? '-3px': '1px'};
  text-decoration: none;
  color: black;
  padding: 10px 15px;
  font-size: 22px;
`

const PopoverContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 340px;
  height: 315px;
  right: 12.5px;
  top: -1px;
  background: #F2EAE8;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  border-radius: 13px;
  z-index: 2;
`

const Title = styled.h1`
  position: absolute;
  height: 14px;
  top: 26px;
  font-family: Open Sans;
  font-style: italic;
  font-weight: normal;
  font-size: 10px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.15em;
  color: #000000;
`
const Divider = styled.div`
  position: absolute;
  width: 237px;
  top: 52px;
  margin: 0;
  border-bottom: 1px solid #8e8e8e;
`

const GiveawayTextContainer = styled.div`
  width: 258px;
  position: absolute;
  top: 56px;
  font-family: Open Sans;
  font-style: normal;
`
const IconWrap = styled.span`
  margin-right: 9px;
  height: 38px;
  padding-left: 3px;
`

const TextBold = styled.span`
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-family: Open Sans;
  text-align: left;
  line-height: 33px;
  color: black;
  width: 27px;
  height: 38px;
  display: inline-block;
`

const GeneralText = styled.span`
  width: 230px;
`

const InfoText = styled.p`
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  font-size: 16px;
  text-align: left;
  line-height: 22px;

  & + & {
    margin-top: ${(props: TextProps) =>  props.icon ? '22px' : '17px'};
  }
`

const SubText = styled.div`
  position: absolute;
  width: 285px;
  height: 23px;
  top: 204px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.05em;
  color: #000000;
`

const ToggleClosedButton = styled.div`
  position: absolute;
  right: 6.5px;
  top: 11.5px;
`

const CloseButton = styled.button`
  position: absolute;
  width: 115px;
  height: 32px;
  top: 268px;
  background: #A8192E;
  border: 0px solid black;
  border-radius: 50px;
  color: white;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 0.15em;
  line-height: 15px;
  text-align: center;
`