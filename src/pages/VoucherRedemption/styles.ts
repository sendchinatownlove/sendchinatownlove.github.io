import styled from 'styled-components';

interface TextProps {
  bold?: String;
  color?: String;
  size?: String;
  width?: String;
  align?: String;
  textAlign?: String;
  padding?: String;
}

const AmountContainer = styled.div`
  width: 95%;
  margin: 12px auto;
  margin-bottom: 0;
  color: black;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const MessageConatiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 12px;
  width: 95%;
`;

const Voucher = styled.h3`
  width: 90%;
  margin: 12px auto;
  text-align: center;
`;
const Bold = styled.span`
  font-weight: 600;
  word-wrap: break-word;
`;
const Text = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  word-wrap: break-word;
  ${(props: TextProps) => props.size && `font-size: ${props.size};`}
  ${(props: TextProps) => props.bold === 'true' && `font-weight: 600;`}
  ${(props: TextProps) => props.color && `color: ${props.color};`}
  ${(props: TextProps) => props.width && `width: ${props.width};`}
  ${(props: TextProps) => props.align && `justify-content: ${props.align};`}
  ${(props: TextProps) => props.textAlign && `text-align: ${props.textAlign};`}
  ${(props: TextProps) => props.padding === 'true' && `padding-right: 5px;`}
  span {
    font-weight: 700;
  }
`;

const Footer = styled.div`
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

const NextButton = styled.button`
  background: black;
  color: white;
  font-size: 18px;
  border-radius: 32px;
  margin: 24px auto;
  width: 80%;
  text-align: center;
  height: 60px;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  border-bottom: 2px solid #f7f7f7;
  margin: 12px auto;
  width: 90%;
`;

export {
  AmountContainer,
  MessageConatiner,
  Text,
  Footer,
  NextButton,
  Divider,
  Voucher,
  Bold,
};
