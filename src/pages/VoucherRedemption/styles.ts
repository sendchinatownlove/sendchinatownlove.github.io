import styled from 'styled-components';

interface TextProps {
  bold?: string;
  color?: string;
  size?: string;
  width?: string;
  align?: string;
  textAlign?: string;
  padding?: string;
  wide?: boolean;
}
interface VoucherInfoProps {
  showInfo?: boolean;
}
interface ContainerProps {
  height?: string;
  bringToTheFront?: boolean;
}

const AmountContainer = styled.div`
  width: 95%;
  margin: 12px auto;
  margin-bottom: 0;
  color: black;
  display: flex;
  flex-direction: column;
  text-align: center;
  ${(props: ContainerProps) =>
    props.bringToTheFront && 'z-index: 150!important;'}
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 12px;
  width: 95%;
`;

const Voucher = styled.div`
  width: 100%;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`;
const Bold = styled.span`
  font-weight: 600;
  word-wrap: break-word;
  word-break: break-all;
`;
const Text = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  word-wrap: break-word;
  position: relative;
  ${(props: TextProps) => props.size && `font-size: ${props.size};`}
  ${(props: TextProps) => props.bold === 'true' && `font-weight: 600;`}
  ${(props: TextProps) => props.color && `color: ${props.color};`}
  ${(props: TextProps) => props.width && `width: ${props.width};`}
  ${(props: TextProps) => props.align && `justify-content: ${props.align};`}
  ${(props: TextProps) => props.textAlign && `text-align: ${props.textAlign};`}
  ${(props: TextProps) => props.padding === 'true' && `padding-right: 5px;`}
  ${(props: TextProps) => props.wide && `letter-spacing: 3px;`}
  span {
    font-weight: 700;
  }
`;

const Footer = styled.div`
  ${(props: ContainerProps) => props.height && `height: ${props.height};`}
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

const NextButton = styled.button`
  background: ${(props) => (props.disabled ? 'grey' : 'black')};
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

const Disclaimer = styled.div`
  text-align: center;
  font-size: 16px;
  color: #a8192e;
  padding-bottom: 3vh;
`;

const FlexFillSpace = styled.div`
  flex: 1;
`;

export {
  AmountContainer,
  MessageContainer,
  Text,
  Footer,
  NextButton,
  Divider,
  Voucher,
  Bold,
  Disclaimer,
  FlexFillSpace,
};
