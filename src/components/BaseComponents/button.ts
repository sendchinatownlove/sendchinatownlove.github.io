import styled from 'styled-components';
import { defaultButtonColor } from './baseColors';

const BaseButton = styled.button`
  border-radius: 100px;
  padding: 10px 22px;
  border: 1px solid ${defaultButtonColor};
  min-width: 150px;
  text-transform: uppercase;
  outline: none;
`;

export { BaseButton };
