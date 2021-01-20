import styled from 'styled-components';

type Props = {
  color?: string;
  bold?: string;
  align?: string;
  size?: string;
  isMainTitle?: boolean;
};

type PassportProps = {
  mainView?: boolean;
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 367px;
  margin: 0 auto;
  background: ${(props: PassportProps) =>
    props.mainView ? 'rgba(168,25,46,1)' : 'rgba(130,3,21,1)'};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  box-sizing: border-box;
  overflow: hidden;

  position: absolute;
  z-index: ${(props: PassportProps) => (props.mainView ? '10' : '0')};
  top: ${(props: PassportProps) => (props.mainView ? '50px' : '0')};
`;

const ExternalLink = styled.a`
  font-weight: bold;
  text-transform: uppercase;
  color: black;
  font-size: 12px;
  margin: 20px;
  letter-spacing: .15em;

  &.faq {
      @media (max-width: 365px) {
          margin-left: 8px;
          margin-right: 8px;
  }
`;

const TitleRow = styled.div`
  text-align: center;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  color: ${(props) => (props.color ? props.color : 'black')};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.15em;
  margin: 5px auto;
`;

const MainTitle = styled(Title)`
  color: ${(props: Props) => (props.isMainTitle ? 'black' : 'grey')};
`;

const SubTitle = styled.span`
  color: ${(props: Props) => (props.color ? props.color : 'black')};
  font-size: ${(props: Props) => (props.size ? props.size : '12px')};
  font-weight: ${(props: Props) => (props.bold ? props.bold : '400')};
  text-align: ${(props: Props) => (props.align ? props.align : 'center')};
  letter-spacing: 0.15em;
`;

const Button = styled.button`
  margin: 10px auto;
  outline: none;
  cursor: pointer;

  &.linkButton {
    background-color: transparent;
    border: none;
    letter-spacing: 0.15em;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  padding-top: 5px;
`;

interface CardTextProps {
  bold?: string;
  size?: string;
  color?: string;
  letterSpacing?: string;
}

const CardText = styled.p`
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.15em;
  margin: 0;
  font-weight: ${(props: CardTextProps) => (props.bold ? props.bold : '400')};
  font-size: ${(props: CardTextProps) => (props.size ? props.size : '12px')};
  color: ${(props: CardTextProps) => (props.color ? props.color : '12px')};
  letter-spacing; ${(props: CardTextProps) =>
    props.letterSpacing ? props.letterSpacing : ''};
`;

export {
  CardContainer,
  TitleRow,
  Title,
  MainTitle,
  SubTitle,
  Button,
  ErrorMessage,
  ExternalLink,
  CardText,
};
