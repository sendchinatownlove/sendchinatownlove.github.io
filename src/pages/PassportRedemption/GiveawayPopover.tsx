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


interface GiveawayData {
  weekly_giveaway_entries: String
  number_of_visits_left : undefined | number
}

const GiveawayPopover = (props: Props) => {
  const [showInfo, setShowInfo] = useState(true);
  const [giveawayData, setData] = useState<GiveawayData>({
    weekly_giveaway_entries: '',
    number_of_visits_left: undefined
  })

  async function setGiveawayCount(contactId: string) {
      const { data: allSellers } = await getAllParticipatingSellers();
      const { data: { weekly_giveaway_entries, unique_seller_tickets } } = await getGiveawayTicketsForContact(contactId)
      setData({weekly_giveaway_entries, number_of_visits_left: allSellers.length - unique_seller_tickets})
  }
  useEffect(() => {
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
          <InfoSentence>
            <DynamicBoldText>{giveawayData.weekly_giveaway_entries}</DynamicBoldText>
            <GeneralText>
              Weekly Giveaway Entries
            </GeneralText>
          </InfoSentence>

          {giveawayData.number_of_visits_left !== 0 ?
          <InfoSentence>
            <DynamicBoldText>{giveawayData.number_of_visits_left}</DynamicBoldText>
            <GeneralText>
              Vendor Tickets away from a Grand Prize Giveaway Entry
            </GeneralText>
          </InfoSentence> :
          <InfoSentence>
            <IconWrap>
              <GreenCheck/>
            </IconWrap>
            <GeneralText>Grand Prize Giveaway Entered</GeneralText>
          </InfoSentence>
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
        <InstagramButtonEnabled onClick={() => setShowInfo(!showInfo)}>
          <InstagramEnabled/>
        </InstagramButtonEnabled> :
        <InstagramButtonDisabled>
          <InstagramDisabled/>
        </InstagramButtonDisabled>
      }
    </PopoverContainer>
  )
}

export default GiveawayPopover

const PopoverContainer = styled.div`
  position: absolute;
  right: 0;
`;

const InstagramButtonBase = styled.div`
position: absolute;
text-decoration: none;
color: black;
padding: 10px 15px;
font-size: 22px;
`

const InstagramButtonDisabled = styled(InstagramButtonBase)`
  right: 8px;
  top: -2px;
`
const InstagramButtonEnabled = styled(InstagramButtonBase)`
  right: 4px;
  top: 1px;
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
  font-style: italic;
  font-size: 10px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.15em;
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
`
const IconWrap = styled.span`
  margin-right: 6px;
  height: 38px;
`

const DynamicBoldText = styled.span`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  line-height: 34px;
  margin-right: 6px;
  height: 38px;
  display: inline-block;
`

const GeneralText = styled.span`
  width: 230px;
`

const InfoSentence = styled.p`
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  font-size: 16px;
  text-align: left;
  line-height: 22px;
  margin-bottom: 22px;
`

const SubText = styled.div`
  position: absolute;
  width: 284px;
  height: 24px;
  top: 204px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.05em;
`

const ToggleClosedButton = styled.div`
  position: absolute;
  right: 6px;
  top: 12px;
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