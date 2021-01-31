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
    window.open('https://www.sendchinatownlove.com/lny-crawl.html/', '_blank');
  };
  const { t } = useTranslation();
  const foodCrawlFaq = t<object[]>('passport.faq.arrayOfQuestionAnswers', {
    returnObjects: true,
  });

  return (
    <Container mainView={showFaq} onClick={toggleView}>
      <TitleRow active={showFaq}>
        <Title
          color={showFaq ? 'rgb(248,186,23,1)' : 'rgba(255, 255, 255, 0.7)'}
        >
          {t('passport.headers.rewards').toUpperCase()}
        </Title>
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
              {`${idx + 1}.`}
              <Trans
                i18nKey={`passport.faq.arrayOfQuestionAnswers.${idx}.question`}
              >
                <strong />
                <i />
              </Trans>
            </Question>
            <br />
            <Trans
              i18nKey={`passport.faq.arrayOfQuestionAnswers.${idx}.answer`}
            >
              <strong />
              <i />
              <p />
              <a
                href="https://www.sendchinatownlove.com/"
                target="_blank"
                style={{ color: 'white' }}
                rel="noopener noreferrer"
              >
                https://www.sendchinatownlove.com/
              </a>
              <a
                href="https://www.sendchinatownlove.com/lny-crawl.html/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white' }}
              >
                https://www.sendchinatownlove.com/lny-crawl.html/
              </a>
              <>
                <br />
                <br />
              </>
              <a
                href="https://merchant.sendchinatownlove.com/lny-passport"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white' }}
              >
                https://merchant.sendchinatownlove.com/lny-passport
              </a>
            </Trans>
          </div>
        ))}
        <br />
        <FAQFooter>
          Questions? Email us at
          <a
            href="hello@sendchinatownlove.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            hello@sendchinatownlove.com
          </a>
        </FAQFooter>
      </FaqContent>
    </Container>
  );
};

const Container = styled(CardContainer)<{
  mainView: Boolean;
}>`
  position: fixed;
  bottom: 0;
  top: ${(props) => (props.mainView ? '180px' : '130px')};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;
const FaqContent = styled.div`
  padding: 10px 30px 15px;
  font-size: 12px;
  overflow: auto;
  color: white;
  height: calc(100vh - 230px);
`;

const RewardsLink = styled.span`
  text-transform: uppercase;
  color: white;
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

const FAQFooter = styled.div`
  a {
    margin-left: 5px;
    font-weight: bold;
    color: white;
  }
`;

export default Faq;
