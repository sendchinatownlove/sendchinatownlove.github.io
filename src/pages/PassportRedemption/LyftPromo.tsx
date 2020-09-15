import React from 'react';
import styled from 'styled-components';
import { TitleRow, Title, SubTitle, Button } from './style';
import BikeImg from './Citibike_Lyft.png';
import { useTranslation } from 'react-i18next';

interface Props {
    isSuccess: boolean;
}

export const LyftRewardPromo = () => {
    const { t } = useTranslation();
    return (
        <LyftPromptContainer height={340}>
            <LyftIcon src={BikeImg} />
            <TitleRow>
                <LyftSubTitle>
                    {t('lyftReward.mainBody1')}
                    <br />
                    <br />
                    {t('lyftReward.mainBody2')}
                    <br />
                    <br />
                    {t('lyftReward.mainBody3')}
                </LyftSubTitle>
            </TitleRow>
            <span>
                <LyftYesButton className="button--red-filled" onClick={(e) => { }}>
                    {t('lyftReward.yesButton')}
                </LyftYesButton>
                <LyftNoButton className="button--red-outlined" onClick={(e) => { }}>
                    {t('lyftReward.noButton')}
                </LyftNoButton>
            </span>
        </LyftPromptContainer>
    );
};

export const LyftConfirmationPromo = (props: Props) => {
    const { t } = useTranslation();
    return (
        <LyftPromptContainer height={285}>
            <LyftIcon src={BikeImg} />
            <TitleRow>
                <SubTitle bold="700">
                    <br />
                    {props.isSuccess
                        ? t('lyftReward.successBody1')
                        : t('lyftReward.failureBody1')}
                    <br />
                    <br />
                    {props.isSuccess
                        ? t('lyftReward.successBody2')
                        : t('lyftReward.failureBody2')}
                </SubTitle>
            </TitleRow>
            <LyftCloseButton className="button--red-filled" onClick={(e) => { }}>
                {t('lyftReward.closeButton')}
            </LyftCloseButton>
        </LyftPromptContainer>
    );
};

const LyftPromptContainer = styled.div<{ height: number }>`
  padding: 10px;
  position: absolute;
  width: 340px;
  margin: 0 auto;
  height: ${(props) => props.height}px;
  z-index: 20;
  top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 13px;
  background: #f2eae8;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
`;

const LyftIcon = styled.img`
  margin-top: 10px;
  width: 160px;
  height: 80px;
`;

const LyftSubTitle = styled(SubTitle)`
  bold: 700;
`;

const LyftYesButton = styled(Button)`
  padding: 0;
  text-align: center;
  height: 33px;
  width: 115px;
  margin-right: 8px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

const LyftNoButton = styled(Button)`
  padding: 0;
  text-align: center;
  height: 33px;
  width: 115px;
  margin-left: 8px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;

const LyftCloseButton = styled(Button)`
  padding: 0;
  text-align: center;
  height: 33px;
  width: 115px;
  display: inline-block;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;
