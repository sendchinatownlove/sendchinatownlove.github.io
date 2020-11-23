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
      answer: <p />,
    },
    {
      question: t('lightUpChinatown.faqQuestion3'),
      answer: (
        <a
          href="https://alternativeearthcare.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          Alternative Earth Care{' '}
        </a>
      ),
    },
    {
      question: t('lightUpChinatown.faqQuestion4'),
      answer: t('lightUpChinatown.faqAnswer4'),
    },
    {
      question: t('lightUpChinatown.faqQuestion5'),
      answer: (
        <a href="mailto: hello@sendchinatownlove.com">
          {' '}
          hello@sendchinatownlove.com{' '}
        </a>
      ),
    },
    {
      question: t('lightUpChinatown.faqQuestion6'),
      answer: (
        <a
          href="https://merchant.sendchinatownlove.com/all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          merchant page{' '}
        </a>
      ),
    },
    {
      question: t('lightUpChinatown.faqQuestion7'),
      answer: (
        <a
          href="https://merchant.sendchinatownlove.com/all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          here{' '}
        </a>
      ),
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
          <QuestionContainer key={'LUCFaq' + idx}>
            <span>
              <Question> {`${idx + 1}.`}</Question>
            </span>
            <span>
              <Question> {faq.question} </Question>
              <Answer>
                <Trans i18nKey={`lightUpChinatown.faqAnswer${idx + 1}`}>
                  {faq.answer}
                </Trans>
              </Answer>
            </span>
          </QuestionContainer>
        ))}
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
