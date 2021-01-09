import React from 'react';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import { CardContainer, TitleRow, Title } from '../style';

type Props = {
  showFaq: boolean;
  toggleView: () => void;
};

const Faq = ({ showFaq, toggleView }: Props) => {
  const goToFoodCrawlInfo = (e) => {
    window.open('https://www.sendchinatownlove.com/food-crawl.html', '_blank');
  };
  const { t } = useTranslation();
  const foodCrawlFaq = t<object[]>('passport.faq.arrayOfQuestionAnswers', {
    returnObjects: true,
  });

  return (
    <CardContainer mainView={showFaq} onClick={toggleView}>
      <TitleRow>
        <Title color={showFaq ? 'rgb(248,186,23,1)' : 'rgba(255, 255, 255, 0.7)'}>{t('passport.headers.rewards').toUpperCase()}</Title>
      </TitleRow>
      {!showFaq && (
        <>
          <br />
          <br />
        </>
      )}
      <FaqContent hidden={!showFaq}>
        <RewardsLink onClick={goToFoodCrawlInfo}>
          {t('passport.faq.viewActiveRewards')}
        </RewardsLink>
        {foodCrawlFaq.map((faq: any, idx) => (
          <div key={'foodCrawlFaq' + idx}>
            <Question>
              {`${idx + 1}.`} {faq.question}
            </Question>
            <Trans
              i18nKey={`passport.faq.arrayOfQuestionAnswers.${idx}.answer`}
            >
              <strong />
              <i />
              <p />
              <a
                href="https://www.sendchinatownlove.com/food-crawl.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
            </Trans>
          </div>
        ))}
      </FaqContent>
    </CardContainer>
  );
};

const FaqContent = styled.div`
  padding: 10px 30px 15px;
  font-size: 12px;
  overflow: auto;
  height: calc(100vh - 230px);
`;

const RewardsLink = styled.span`
  text-transform: uppercase;
  color: black;
  font-weight: 700;
  letter-spacing: 0.15em;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  font-size: 12px;
`;

const Question = styled.p`
  font-weight: bold;
  margin-bottom: 1px;
`;

export default Faq;
