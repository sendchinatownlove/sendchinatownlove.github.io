import React from 'react';
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import lanternFooter from './images/lantern-footer.png';

const LightUpFaq = () => {
  const { t } = useTranslation();

  const faqQuestions = [
    {
      question: t('lightUpChinatown.faqQuestion1'),
      answer: t('lightUpChinatown.faqAnswer1'),
    },
    {
      question: t('lightUpChinatown.faqQuestion2'),
      answer: t('lightUpChinatown.faqAnswer2'),
    },
    {
      question: t('lightUpChinatown.faqQuestion3'),
      answer: t('lightUpChinatown.faqAnswer3'),
    },
    {
      question: t('lightUpChinatown.faqQuestion4'),
      answer: t('lightUpChinatown.faqAnswer4'),
    },
  ];

  return (
    <Container>
      <BannerContainer>
        <BannerImage src={lanternFooter} alt="lantern overlay" />
        <BannerText>{t('lightUpChinatown.faq')}</BannerText>
      </BannerContainer>

      <FaqContainer>
        {faqQuestions.map((faq, idx) => (
          <QuestionContainer>
            <span>
              <Question> {`${idx + 1}.`}</Question>
            </span>
            <span>
              <Question> {faq.question} </Question>
              <Answer> {faq.answer} </Answer>
            </span>
          </QuestionContainer>
        ))}

        {/* FAQ question 4 & 5 have links and needed to be split out. See below. */}
        <QuestionContainer>
          <span>
            <Question> 5.</Question>
          </span>
          <span>
            <Question> {t('lightUpChinatown.faqQuestion5')} </Question>
            <Answer>
              <Trans i18nKey="lightUpChinatown.faqAnswer5">
                {' '}
                Please contact us at{' '}
                <a href="mailto: hello@sendchinatownlove.com">
                  hello@sendchinatownlove.com
                </a>{' '}
                with the subject line “Light Up Chinatown.”
              </Trans>
            </Answer>
          </span>
        </QuestionContainer>

        <QuestionContainer>
          <span>
            <Question> 6.</Question>
          </span>
          <span>
            <Question> {t('lightUpChinatown.faqQuestion6')} </Question>
            <Answer>
              <Trans i18nKey="lightUpChinatown.faqAnswer6">
                {' '}
                Thank you for sending Chinatown your love! To continue
                supporting this community, check out our{' '}
                <a
                  href="https://merchant.sendchinatownlove.com/all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  merchant page
                </a>{' '}
                for the full list of Asian-owned businesses we’re working with
                to make a donation or buy a gift card!{' '}
              </Trans>
            </Answer>
          </span>
        </QuestionContainer>

        <QuestionContainer>
          <span>
            <Question> 7.</Question>
          </span>
          <span>
            <Question> {t('lightUpChinatown.faqQuestion7')} </Question>
            <Answer>
              <Trans i18nKey="lightUpChinatown.faqAnswer7">
                {' '}
                Send Chinatown Love is a New York-based, entirely volunteer-run
                organization that helps the Chinatowns across the city get back
                on their feet by supporting immigrant-owned, small businesses
                that make up the fabric of these neighborhoods. The goal of Send
                Chinatown Love is to facilitate community support by creating
                digital platforms for restaurants and stores in need so that
                they may be able to sustain themselves now and into the future.
                Check out our full list of partner merchants{' '}
                <a
                  href="https://merchant.sendchinatownlove.com/all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
              </Trans>
            </Answer>
          </span>
        </QuestionContainer>
      </FaqContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BannerContainer = styled.div`
  position: relative;
`;

const BannerImage = styled.img`
  height: 222px;
  width: 100vw;
  filter: brightness(50%);
  object-fit: cover;

  @media (max-width: 599px) {
    height: 160px;
  }
`;

const BannerText = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  text-align: left;
  font-weight: bold;
  font-size: 32px;
  color: #ffffff;
  padding: 0 50px;

  position: absolute;
  left: 0;
  right: 0;
  bottom: 50%;
  top: 40%;
  text-align: left;

  @media (max-width: 599px) {
    text-align: center;
    font-size: 22px;
    padding: 0 10px;
  }
`;

const FaqContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  padding: 50px 75px;
  text-align: left;

  @media (max-width: 599px) {
    padding: 25px;
  }
`;

const QuestionContainer = styled.div`
  display: flex;
  padding: 15px 0px;
  font-size: 16px;

  @media (max-width: 450px) {
    font-size: 12px;
  }
`;

const Question = styled.div`
  font-weight: bold;
  padding: 5px 10px;
`;

const Answer = styled.div`
  padding: 5px 10px 0px;
`;

export default LightUpFaq;
