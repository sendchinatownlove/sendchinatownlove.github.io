import 'react-square-payment-form/lib/default.css';
import styled from 'styled-components';

type RowProps = {
  width?: string;
  mobileWidth?: string;
};
const Subheader = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 18px;
`;
const RowFormat = styled.div`
  width: ${(props: RowProps) => (props.width ? props.width : '100%')};
  min-width: 105px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  text-transform: uppercase;

  @media only screen and (max-width: 800px) {
    width: ${(props: RowProps) =>
      props.mobileWidth ? props.mobileWidth : '100%'};
  }
`;

const LabelText = styled.label`
  color: #373f4a;
`;

const InputText = styled.input`
  font-size: 14px;
  color: #373f4a;
  border: 1px solid #dedede;
  margin: 5px 0 15px;
  padding: 27px 15px;
  width: ${(props) => (props.width ? props.width : '100%')};
  border-radius: 5px;

  :placeholder {
    color: #cdcdcd;
  }

  :invalid {
    color: #fa755a;
  }
`;

export { Subheader, RowFormat, LabelText, InputText };
