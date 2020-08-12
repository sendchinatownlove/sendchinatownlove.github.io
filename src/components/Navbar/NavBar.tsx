import React, { useState, useEffect, MouseEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { Logo } from '../Logos';
import { useTranslation } from 'react-i18next';

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pageName: string;
}

interface CompactProps {
  compact: string;
  href?: string;
  i18nText?: string;
  altText?: string;
  active?: string;
}

const NavBar = (props: Props) => {
  const { t, i18n } = useTranslation();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const changeLanguage = (e: MouseEvent, language: string) => {
    e.preventDefault();
    i18n.changeLanguage(language);
  };

  const handleResize = () => {
    if (window.innerWidth < 1025 && !props.menuOpen) {
      setHamburgerOpen(true);
    } else {
      setHamburgerOpen(false);
      props.setMenuOpen(false);
    }
  };

  const isMerchantsPathActive = props.pageName === 'all';

  useEffect(() => {
    if (window.innerWidth < 1025) {
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
        <LanguageContainer compact={hamburgerOpen.toString()}>
          <LanguageButton onClick={(e) => changeLanguage(e, 'en')}>
            ENG
          </LanguageButton>
          <span>|&nbsp;</span>
          <LanguageButton onClick={(e) => changeLanguage(e, 'cn')}>
            中文
          </LanguageButton>
        </LanguageContainer>
        <MenuIcon onClick={(e) => props.setMenuOpen(true)} />
      </HamburgerContainer>
    ) : (
      <NavLinksContainer compact={hamburgerOpen.toString()}>
        <HeaderContainer>
          <Logo />
          <Close onClick={(e) => props.setMenuOpen(false)} />
        </HeaderContainer>
        <NavLink
          compact={hamburgerOpen.toString()}
          href="https://sendchinatownlove.com/"
          i18nText="navBar.header.home"
          altText="HOME"
        />
        <ReactNavLink
          to="/merchants"
          compact={hamburgerOpen.toString()}
          onClick={(e) => props.setMenuOpen(false)}
        >
          {t('navBar.header.merchants')}
        </ReactNavLink>
        <NavLink
          compact={hamburgerOpen.toString()}
          href="https://www.sendchinatownlove.com/about.html"
          i18nText="OUR STORY"
          altText="OUR STORY"
        />
        <NavLink
          compact={hamburgerOpen.toString()}
          href="https://www.sendchinatownlove.com/resource-center.html"
          i18nText="RESOURCES"
          altText="RESOURCES"
        />
        <NavLink
          compact={hamburgerOpen.toString()}
          href="https://www.sendchinatownlove.com/press"
          i18nText="PRESS"
          altText="PRESS"
        />
      </NavLinksContainer>
    );
  };
  return (
    <HeaderContainer>
      <Logo />
      {hamburgerOpen ? (
        showCompactMenu()
      ) : (
        <NavLinksContainer compact={hamburgerOpen.toString()}>
          <NavLink
            compact={hamburgerOpen.toString()}
            href="https://sendchinatownlove.com/"
            i18nText="navBar.header.home"
            altText="HOME"
          />
          <ReactNavLink
            to="/merchants"
            compact={hamburgerOpen.toString()}
            active={isMerchantsPathActive.toString()}
          >
            {t('navBar.header.merchants')}
          </ReactNavLink>
          <NavLink
            compact={hamburgerOpen.toString()}
            href="https://www.sendchinatownlove.com/about.html"
            i18nText="OUR STORY"
            altText="OUR STORY"
          />
          <NavLink
            compact={hamburgerOpen.toString()}
            href="https://www.sendchinatownlove.com/resource-center.html"
            i18nText="RESOURCES"
            altText="RESOURCES"
          />
          <NavLink
            compact={hamburgerOpen.toString()}
            href="https://www.sendchinatownlove.com/press"
            i18nText="PRESS"
            altText="PRESS"
          />
          <LanguageContainer compact={hamburgerOpen.toString()}>
            <LanguageButton onClick={(e) => changeLanguage(e, 'en')}>
              ENG
            </LanguageButton>
            <span>|&nbsp;</span>
            <LanguageButton onClick={(e) => changeLanguage(e, 'cn')}>
              中文
            </LanguageButton>
          </LanguageContainer>
        </NavLinksContainer>
      )}
    </HeaderContainer>
  );
};

export default NavBar;

const HeaderContainer = styled.header`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  max-width: 1280px;
  margin: 15px auto;
  align-items: center;
  font-size: 14px;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: ${(props: CompactProps) =>
    props.compact === 'true' ? `column` : 'row'};
  width: 100%;
  ${(props: CompactProps) =>
    props.compact === 'true'
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
    max-width: 620px;
    justify-content: flex-end;
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
  margin: 0 20px;
  ${(props: CompactProps) =>
    props.compact === 'true' &&
    `
    width: 100%;
    margin: 16px auto;
    text-align: center;
  `} :link {
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
  return (
    <NavLinkStyle {...props} compact={props.compact}>
      {text}
    </NavLinkStyle>
  );
};

const LanguageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  width: 78px;
  margin-left: 20px;
  ${(props: CompactProps) => props.compact === 'true' && 'margin-right: 20px;'}
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
  width: 35px;
`;

const ReactNavLink = styled(Link)`
  text-decoration: none;
  color: black;
  transition: 0.1s;
  margin: 0 20px;
  ${(props: CompactProps) =>
    props.compact === 'true' &&
    `
    width: 100%;
    margin: 16px auto;
    text-align: center;
  `}
  ${(props: CompactProps) =>
    props.active === 'true' &&
    `
    border-bottom: 1px #9e9e9e solid;
    padding: 0 5px 3px;
  `} :link {
    color: black;
  }
  :hover {
    color: #9e9e9e;
  }
`;

const Close = styled(CloseIcon)`
  cursor: pointer;
`;
