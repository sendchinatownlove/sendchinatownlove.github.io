import React from 'react';
import styled from 'styled-components';
import { TitleRow, SubTitle, Button, CardContainer } from './style';
import BikeImg from './Lyft_Bike.png';
import { useTranslation } from 'react-i18next';
import CopyToClipboard from 'react-copy-to-clipboard';
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay';
import { useState, useRef } from 'react';

interface PromoProps {
  yesClickHander: () => void;
  noClickHander: () => void;
}

export const LyftRewardPromo = (props: PromoProps) => {
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
        <LyftYesButton
          className="button--red-filled"
          onClick={props.yesClickHander}
        >
          {t('lyftReward.yesButton')}
        </LyftYesButton>
        <LyftNoButton
          className="button--red-outlined"
          onClick={props.noClickHander}
        >
          {t('lyftReward.noButton')}
        </LyftNoButton>
      </span>
    </LyftPromptContainer>
  );
};

interface ConfirmationProps {
  isSuccess: boolean;
  closeClickHander: () => void;
}

export const LyftConfirmationPromo = (props: ConfirmationProps) => {
  const { t } = useTranslation();
  return (
    <LyftPromptContainer height={285}>
      <LyftIcon src={BikeImg} />
      <TitleRow>
        <LyftSubTitle>
          <br />
          {props.isSuccess
            ? t('lyftReward.successBody1')
            : t('lyftReward.failureBody1')}
          <br />
          <br />
          {props.isSuccess
            ? t('lyftReward.successBody2')
            : t('lyftReward.failureBody2')}
        </LyftSubTitle>
      </TitleRow>
      <LyftCloseButton
        className="button--red-filled"
        onClick={props.closeClickHander}
      >
        {t('lyftReward.closeButton')}
      </LyftCloseButton>
    </LyftPromptContainer>
  );
};

interface CodeProps {
  code: string;
}

export const LyftCode = (props: CodeProps) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <CardContainer mainView={true}>
      <br />
      <br />
      <LyftIcon src={BikeImg} />
      <LyftCodeTitle>{t('lyftReward.codeTitle')}</LyftCodeTitle>
      <LyftCodeSubtitle>{t('lyftReward.codeSubtitle')}</LyftCodeSubtitle>
      <CopyToClipboard
        text={props.code}
        onCopy={(e: any) => {
          setShow(!show);
        }}
      >
        <LyftCodeDisplay>{props.code}</LyftCodeDisplay>
      </CopyToClipboard>
      <div ref={target}></div>
      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip
            id="copied-tooltip"
            onClick={() => setShow(!show)}
            {...props}
            style={{
              backgroundColor: '#a9182e',
              color: 'white',
              padding: '20px 68px 20px 68px',
              borderRadius: 3,
              zIndex: 10,
              opacity: 0.7,
              ...props.style,
            }}
          >
            {t('lyftReward.codeCopied')}
          </Tooltip>
        )}
      </Overlay>
      <br />
      <br />
    </CardContainer>
  );
};

const LyftPromptContainer = styled.div<{ height: number }>`
  padding: 10px;
  position: absolute;
  width: 340px;
  margin: 0 auto;
  height: ${(props) => props.height}px;
  z-index: 1;
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
  width: 216px;
  height: 85px;
`;

const LyftSubTitle = styled(SubTitle)`
  font-weight: 700;
`;

const LyftYesButton = styled(Button)`
  padding: 0;
  text-align: center;
  height: 33px;
  width: 115px;
  margin-right: 8px;
  display: inline-block;
  min-width: 0;
`;

const LyftNoButton = styled(LyftYesButton)`
  margin-left: 8px;
  margin-right: 0;
`;

const LyftCloseButton = styled(LyftYesButton)`
  margin: 0;
`;

const LyftCodeTitle = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0px 30px 0px 30px;
  margin-top: 30px;
`;

const LyftCodeSubtitle = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0px 30px 0px 30px;
  margin-top: 30px;
`;

const LyftCodeDisplay = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 41px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #a8192e;
  border: 1px dashed #000000;
  box-sizing: border-box;
  padding: 10px 20px 10px 20px;
  margin-top: 20px;
`;
