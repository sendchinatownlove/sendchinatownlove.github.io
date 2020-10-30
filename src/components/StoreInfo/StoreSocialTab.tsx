import * as React from 'react';
import { useRef, useState } from 'react';
import ClipboardIcon from 'react-clipboard-icon';
import CopyToClipboard from 'react-copy-to-clipboard';
import { SocialIcon } from 'react-social-icons';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
import { BrowsePageSeller } from '../../utilities/api';
import styled from 'styled-components';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

export interface Props {
  seller: BrowsePageSeller;
}

const StoreSocial: React.SFC<Props> = ({ seller }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const location = window.location.href;
  const facebookQuote = 'Help raise money for ' + seller.name;
  const socialIconForegroundColor = '#a9182e';
  const socialIconBackgroundColor = 'white';
  const socialIconDimensions = { height: 50, width: 50 };

  const clipboardStyle = {
    fill: '#a9182e',
    backgroundColor: 'white',
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: '6px 8px 10px 14px',
  };

  return (
    <React.Fragment>
      <HeaderText>Share this merchant</HeaderText>

      <SocialContainer>
        <FacebookShareButton
          url={location}
          quote={facebookQuote}
          className="share"
        >
          <SocialIcon
            network="facebook"
            fgColor={socialIconForegroundColor}
            bgColor={socialIconBackgroundColor}
            style={socialIconDimensions}
          />
          <SocialTextLabel>FACEBOOK</SocialTextLabel>
        </FacebookShareButton>
      </SocialContainer>

      <SocialContainer>
        <TwitterShareButton url={location} className="share">
          <SocialIcon
            network="twitter"
            fgColor={socialIconForegroundColor}
            bgColor={socialIconBackgroundColor}
            style={socialIconDimensions}
          />
          <SocialTextLabel>TWITTER</SocialTextLabel>
        </TwitterShareButton>
      </SocialContainer>

      <SocialContainer>
        <EmailShareButton url={location} className="share">
          <SocialIcon
            network="email"
            fgColor={socialIconForegroundColor}
            bgColor={socialIconBackgroundColor}
            style={socialIconDimensions}
          />
          <SocialTextLabel>EMAIL</SocialTextLabel>
        </EmailShareButton>
      </SocialContainer>

      <SocialContainer>
        <ClipboardContainer ref={target}>
          <CopyToClipboard text={location} onCopy={() => setShow(!show)}>
            <ClipboardIcon size={28} style={clipboardStyle} />
          </CopyToClipboard>
          <CopyToClipboard text={location} onCopy={() => setShow(!show)}>
            <SocialTextLabel>COPY TO CLIPBOARD</SocialTextLabel>
          </CopyToClipboard>
          <Overlay target={target.current} show={show} placement="bottom">
            {(props) => (
              <Tooltip
                id="copied-tooltip"
                {...props}
                style={{
                  backgroundColor: socialIconForegroundColor,
                  color: socialIconBackgroundColor,
                  padding: '5px 15px 5px 15px',
                  borderRadius: 3,
                  ...props.style,
                }}
              >
                COPIED!
              </Tooltip>
            )}
          </Overlay>
        </ClipboardContainer>
      </SocialContainer>
    </React.Fragment>
  );
};

const HeaderText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #1e1e1e;
  margin: -10px 0px 30px 10px;
`;

const SocialTextLabel = styled.label`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  align-items: center;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #000000;
  padding-left: 10px;
  cursor: pointer;
`;

const SocialContainer = styled.div`
  margin: 5px 0px 5px 0px;
`;

const ClipboardContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`;

export default StoreSocial;
