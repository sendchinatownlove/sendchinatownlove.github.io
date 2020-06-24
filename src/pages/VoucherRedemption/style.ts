import styled from 'styled-components';

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;
const SubViewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const Text = styled.span`
  text-align: center;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  margin: 16px auto;
`;
const SubmitButton = styled.button``;
const Divider = styled.div``;

export { ViewContainer, SubViewContainer, Text, Footer, SubmitButton, Divider };
