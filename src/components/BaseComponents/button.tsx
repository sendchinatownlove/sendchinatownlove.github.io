import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { defaultButtonColor, defaultHoverRed } from './baseColors';

interface ModalButtonProps {
  onClick: (e) => void;
  i18nKey?: string;
  i18nText?: string;
  altText?: string;
  buttonType?: string;
  disabled: boolean;
}

const ModalButtonStyle = styled.button`
  padding: 8px;
  width: 120px;
  border-radius: 75px;
  font-size: 12px;
  outline: none;

  ${(props: ModalButtonProps) => {
    switch (props.buttonType) {
      case 'back':
        return `
          border: none;
          padding: 0px;
          margin: 10px 0px;
          width: 120px;
          font-weight: bold;
          outline: none;
          letter-spacing: 0.1em;
          cursor: pointer;
        `;
      case 'outlined':
        return `       
          border: 1px solid #dd678a;
          color: #dd678a;
          border-radius: 25px;
          margin: 10px 0px;
          cursor: pointer;

          :disabled {
            background-color: grey;
            border: 1px solid grey;
          }
        `;
      case 'filled':
        return `
          border: 1px solid black;
          background-color: ${defaultButtonColor};
          color: white;
          font-weight: bold;
          letter-spacing: 0.1em;
          cursor: pointer;
          :disabled {
            background-color: grey;
            border: 1px solid grey;
          }
          :focus {
            color: white;
            background-color: ${defaultHoverRed};
            border: 1px solid ${defaultHoverRed};
          }
        `;
      case 'nonfunctional':
        return `
          border: 1px solid #grey;
          background-color: grey;
          color: white;
          border-radius: 25px;
          font-weight: bold;
        `;
      case 'selected':
        return `
          color: white;
          background-color: #dd678a;
          border: 1px solid #dd678a;
          margin: 10px 0px;
        `;
      default:
        return;
    }
  }}
`;

const BaseButton = styled.button`
  border-radius: 100px;
  padding: 10px 22px;
  border: 1px solid ${defaultButtonColor};
  min-width: 150px;
  text-transform: uppercase;
  outline: none;
`;

const ModalButton = (props: ModalButtonProps) => {
  const { t } = useTranslation();
  const text =
    props.i18nText &&
    props.i18nKey &&
    !t(props.i18nText).includes(props.i18nKey)
      ? t(props.i18nText)
      : props.altText;
  return <ModalButtonStyle {...props}> {text} </ModalButtonStyle>;
};
export { ModalButton, BaseButton };
