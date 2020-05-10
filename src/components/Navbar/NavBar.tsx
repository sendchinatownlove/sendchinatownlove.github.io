import React, { useState, useEffect, MouseEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import sclLogo from '../../images/logo-with-text.png';
import { useTranslation } from 'react-i18next';

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CompactProps {
  compact: boolean;
  href?: string;
  i18nText?: string;
  altText?: string;
}

const NavBar = (props: Props) => {
  const { t, i18n } = useTranslation();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const changeLanguage = (e: MouseEvent, language: string) => {
    e.preventDefault();
    i18n.changeLanguage(language);
  };

  const handleResize = () => {
    if (window.innerWidth < 767) {
      setHamburgerOpen(true);
    } else {
      setHamburgerOpen(false);
      props.setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 767) {
      setHamburgerOpen(true);
    } else {
      setHamburgerOpen(false);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showCompactMenu = () => {
    return !props.menuOpen ? (
      <HamburgerContainer>
        <LanguageContainer>
          <LanguageButton onClick={(e) => changeLanguage(e, 'en')}>
            ENG
          </LanguageButton>
          <span>|</span>
          <LanguageButton onClick={(e) => changeLanguage(e, 'cn')}>
            中文
          </LanguageButton>
        </LanguageContainer>
        <MenuIcon onClick={(e) => props.setMenuOpen(true)} />
      </HamburgerContainer>
    ) : (
      <NavLinksContainer compact={hamburgerOpen}>
        <NavBarContainer>
          <Image src={sclLogo} alt="Logo" />
          <Close onClick={(e) => props.setMenuOpen(false)} />
        </NavBarContainer>
        <NavLink
          compact={hamburgerOpen}
          href="https://sendchinatownlove.com/"
          i18nText="navBar.header.home"
          altText="HOME"
        />
        <ReactNavLink to="/merchants" compact={hamburgerOpen}>
          {t('navBar.header.merchants')}
        </ReactNavLink>
      </NavLinksContainer>
    );
  };

  return (
    <NavBarContainer>
      <Image src={sclLogo} alt="Logo" />
      {hamburgerOpen ? (
        showCompactMenu()
      ) : (
        <NavLinksContainer compact={hamburgerOpen}>
          <NavLink
            compact={hamburgerOpen}
            href="https://sendchinatownlove.com/"
            i18nText="navBar.header.home"
            altText="HOME"
          />
          <ReactNavLink to="/merchants" compact={hamburgerOpen}>
            {t('navBar.header.merchants')}
          </ReactNavLink>
          <LanguageContainer>
            <LanguageButton onClick={(e) => changeLanguage(e, 'en')}>
              ENG
            </LanguageButton>
            <span>|</span>
            <LanguageButton onClick={(e) => changeLanguage(e, 'cn')}>
              中文
            </LanguageButton>
          </LanguageContainer>
        </NavLinksContainer>
      )}
    </NavBarContainer>
  );
};

export default NavBar;

const NavBarContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin: 15px auto;
  align-items: center;
  font-family: futura;
`;
const Image = styled.img`
  width: 150px;
  height: 66px;
`;

const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: ${(props: CompactProps) =>
    props.compact ? `column` : 'row'};
  width: ${(props: CompactProps) => (props.compact ? `100%` : '50%')};
  ${(props: CompactProps) =>
    props.compact
      ? `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    background-color: white;
    z-index: 10;
  `
      : `
    max-width: 400px;
    justify-content: space-between;
  `}
`;
const HamburgerContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 125px;
  justify-content: space-between;
`;

const NavLinkStyle = styled.a`
  text-decoration: none;
  color: black;
  transition: 0.1s;
  ${(props: CompactProps) =>
    props.compact &&
    `
    width: 100%;
    margin: 16px auto;
    text-align: center;
  `}
  :link {
    color: black;
  }
  :hover {
    color: #9e9e9e;
  }
`;

const NavLink = (props: CompactProps) => {
  const { t } = useTranslation();
  const text =
    props.i18nText && !t(props.i18nText).includes('navBar')
      ? t(props.i18nText)
      : props.altText;
  return <NavLinkStyle {...props} compact={props.compact}>{text}</NavLinkStyle>;
};

const LanguageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  width: 78px;
`;
const LanguageButton = styled.div`
  margin: 0;
  transition: 0.1s;
  color: #9e9e9e;
  font-size: 14px;
  cursor: pointer;
  font-weight: 200;
  :hover {
    color: #a7182d;
  }
`;
const ReactNavLink = styled(Link)`
  text-decoration: none;
  color: black;
  transition: 0.2s;
  ${(props: CompactProps) =>
    props.compact &&
    `
    width: 100%;
    margin: 16px auto;
    text-align: center;
  `}
    transition: 0.1s;
  :link {
    color: black;
  }
  :hover {
    color: #9e9e9e;
  }
`;
const Close = styled(CloseIcon)`
  cursor: pointer;
`;
