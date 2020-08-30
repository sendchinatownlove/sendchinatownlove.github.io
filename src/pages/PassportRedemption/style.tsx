import React from 'react';
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

const PassportContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 367px;
  margin: 0 auto;
  background: #ffffff;
  
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
  border: 1px solid #dedede;
  border-radius: 20px;
  box-sizing: border-box;
  overflow: hidden;

  position: absolute;
  opacity: ${(props: PassportProps) => (props.mainView ? '1' : '0.5')};
  z-index: ${(props: PassportProps) => (props.mainView ? '10' : '0')};
  top: ${(props: PassportProps) => (props.mainView ? '50px' : '0')};

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
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
  color: ${(props: Props) =>
    (props.isMainTitle ? 'black': 'grey')};
`;

const SubTitle = styled.span`
  color: ${(props: Props) => (props.color ? props.color : 'black')};
  font-size: ${(props: Props) => (props.size ? props.size : '12px')};
  font-weight: ${(props: Props) => (props.bold ? props.bold : '400')};
  text-align: ${(props: Props) => (props.align ? props.align : 'center')};
  letter-spacing: 0.1em;
`;

const Button = styled.button`
  margin: 10px auto;
  outline: none;
  cursor: pointer;

  &.linkButton {
    background-color: transparent;
    border: none;
    letter-spacing: 0.1em;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  padding-top: 5px;
`;

const InstagramDisabled = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0045 4.91117C7.17786 4.91117 4.89785 7.19117 4.89785 10.0178C4.89785 12.8445 7.17786 15.1245 10.0045 15.1245C12.8312 15.1245 15.1112 12.8445 15.1112 10.0178C15.1112 7.19117 12.8312 4.91117 10.0045 4.91117ZM10.0043 13.338C8.17763 13.338 6.68429 11.8491 6.68429 10.018C6.68429 8.18686 8.17319 6.69797 10.0043 6.69797C11.8354 6.69797 13.3243 8.18686 13.3243 10.018C13.3243 11.8491 11.831 13.338 10.0043 13.338ZM16.5112 4.7022C16.5112 5.36442 15.9778 5.89331 15.3201 5.89331C14.6578 5.89331 14.129 5.35998 14.129 4.7022C14.129 4.04442 14.6623 3.51109 15.3201 3.51109C15.9778 3.51109 16.5112 4.04442 16.5112 4.7022ZM19.8937 5.9114C19.8182 4.31584 19.4537 2.90251 18.2848 1.73806C17.1204 0.573618 15.7071 0.209174 14.1115 0.129174C12.4671 0.0358402 7.53817 0.0358402 5.89373 0.129174C4.30262 0.204729 2.88928 0.569174 1.72039 1.73362C0.551504 2.89806 0.191504 4.3114 0.111504 5.90695C0.0181706 7.5514 0.0181706 12.4803 0.111504 14.1247C0.187059 15.7203 0.551504 17.1336 1.72039 18.2981C2.88928 19.4625 4.29817 19.827 5.89373 19.907C7.53817 20.0003 12.4671 20.0003 14.1115 19.907C15.7071 19.8314 17.1204 19.467 18.2848 18.2981C19.4493 17.1336 19.8137 15.7203 19.8937 14.1247C19.9871 12.4803 19.9871 7.55584 19.8937 5.9114Z" fill="white"/>
    </mask>
    <g mask="url(#mask0)">
    <rect width="20" height="20" fill="#9E9E9E"/>
    </g>
  </svg>
)

const InstagramEnabled = () => (
  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0045 4.91117C7.17786 4.91117 4.89785 7.19117 4.89785 10.0178C4.89785 12.8445 7.17786 15.1245 10.0045 15.1245C12.8312 15.1245 15.1112 12.8445 15.1112 10.0178C15.1112 7.19117 12.8312 4.91117 10.0045 4.91117ZM10.0043 13.338C8.17763 13.338 6.68429 11.8491 6.68429 10.018C6.68429 8.18686 8.17319 6.69797 10.0043 6.69797C11.8354 6.69797 13.3243 8.18686 13.3243 10.018C13.3243 11.8491 11.831 13.338 10.0043 13.338ZM16.5112 4.7022C16.5112 5.36442 15.9778 5.89331 15.3201 5.89331C14.6578 5.89331 14.129 5.35998 14.129 4.7022C14.129 4.04442 14.6623 3.51109 15.3201 3.51109C15.9778 3.51109 16.5112 4.04442 16.5112 4.7022ZM19.8937 5.9114C19.8182 4.31584 19.4537 2.90251 18.2848 1.73806C17.1204 0.573618 15.7071 0.209174 14.1115 0.129174C12.4671 0.0358402 7.53817 0.0358402 5.89373 0.129174C4.30262 0.204729 2.88928 0.569174 1.72039 1.73362C0.551504 2.89806 0.191504 4.3114 0.111504 5.90695C0.0181706 7.5514 0.0181706 12.4803 0.111504 14.1247C0.187059 15.7203 0.551504 17.1336 1.72039 18.2981C2.88928 19.4625 4.29817 19.827 5.89373 19.907C7.53817 20.0003 12.4671 20.0003 14.1115 19.907C15.7071 19.8314 17.1204 19.467 18.2848 18.2981C19.4493 17.1336 19.8137 15.7203 19.8937 14.1247C19.9871 12.4803 19.9871 7.55584 19.8937 5.9114Z" fill="white"/>
    </mask>
    <g mask="url(#mask0)">
    <rect width="20" height="20" fill="black"/>
    </g>
    <path d="M19 14C15.6864 14 13 16.6863 13 20C13 23.3137 15.6864 26 19 26C22.3139 26 25 23.3137 25 20C25 16.6863 22.3138 14 19 14ZM17.8994 23.0821L15.2574 20.4403L16.138 19.5597L17.8994 21.3209L21.862 17.3582L22.7426 18.2388L17.8994 23.0821Z" fill="#6AC259"/>
  </svg>
)

export {
  PassportContainer,
  TitleRow,
  Title,
  MainTitle,
  SubTitle,
  Button,
  ErrorMessage,
  ExternalLink,
  InstagramDisabled,
  InstagramEnabled,
};
