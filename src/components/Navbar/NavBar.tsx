import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, useEffect, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Logo } from '../Logos';
import { Page } from '../../consts'

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pageName: Page;
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleDropdownOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dropdownOptions = [
    { url: "/merchants", translation: "donate", external: false },
    { url: "/gift-a-meal-home", translation: "gift-a-meal", external: false },
    { url: "https://stickylocals.com/scl", translation: "sticky-locals-x-scl", external: true  },
    { url: "https://www.friendofafriend.studio/shop", translation: "friendofafriend-studioxscl", external: true }
  ]
 
  const Drop = () => {
    return (
    dropdownOptions.map(option => {
    const { url, translation, external } = option; 
      return external ? (
         <DropdownItem href={url}>
           { t(`navBar.header.waystodonate.${translation}`) }
         </DropdownItem>
         ) : (
         <DropdownItemLink to={url}>
           { t(`navBar.header.waystodonate.${translation}`) }
         </DropdownItemLink>
          )
    }))
  }

  
  const isMerchantsPathActive = props.pageName === Page.All;

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
          <LanguageSeparator>|</LanguageSeparator>
          <LanguageButton onClick={(e) => changeLanguage(e, 'cn')}>
            中文
          </LanguageButton>
        </LanguageContainer>
        <MenuIcon onClick={(e) => props.setMenuOpen(true)} />
      </HamburgerContainer>
    ) : (
      <NavLinksContainer compact={hamburgerOpen.toString()}>
        <HeaderContainer compact={hamburgerOpen.toString()}>
          <a href="https://sendchinatownlove.com/">
            <Logo />
          </a>
          <Close onClick={(e) => props.setMenuOpen(false)} />
        </HeaderContainer>
        <NavLink
          compact={hamburgerOpen.toString()}
          href="https://sendchinatownlove.com/"
          i18nText="navBar.header.home"
          altText="HOME"
        />
        <DropdownButtonContainer>
          <ReactNavLink
            href="https://www.sendchinatownlove.com/ways-to-donate.html"
            compact={hamburgerOpen.toString()}
          >
            <p>{t('navBar.header.merchants')}</p>
          </ReactNavLink>
          <DropdownButton onClick={handleDropdownOpen}>›</DropdownButton>
        </DropdownButtonContainer >
        {dropdownOpen && (
          <DropdownMobile>
            {Drop()}
          </DropdownMobile>
        )}
        <NavLink
          compact={hamburgerOpen.toString()}
          href="https://www.sendchinatownlove.com/food-crawl.html"
          i18nText="SCL FOOD CRAWL"
          altText="SCL FOOD CRAWL"
        />
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
    <HeaderContainer compact={hamburgerOpen.toString()}>
      <a href="https://sendchinatownlove.com/">
        <Logo />
      </a>
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
            href="https://www.sendchinatownlove.com/ways-to-donate.html"
            onMouseEnter={() => setDropdownOpen(true)}
            compact={hamburgerOpen.toString()}
            active={isMerchantsPathActive.toString()}
          >
            {t('navBar.header.merchants')}
          </ReactNavLink>
          {dropdownOpen && (
            <Dropdown onMouseLeave={() => setDropdownOpen(false)}>
               {Drop()}
            </Dropdown>
          )}
          <NavLink
            compact={hamburgerOpen.toString()}
            href="https://www.sendchinatownlove.com/food-crawl.html"
            i18nText="SCL FOOD CRAWL"
            altText="SCL FOOD CRAWL"
          />
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
            <LanguageSeparator>|</LanguageSeparator>
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

const theme = {
  maxzIndex: '9999 !important',
  navHoverColor: '#9e9e9e',
};

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
  padding-right: 5px;
  ${(props: CompactProps) =>
    props.compact !== 'true' &&
    `
    margin-top: 40px;
  `}
`;

const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: ${(props: CompactProps) =>
    props.compact === 'true' ? `column` : 'row'};
  width: 100%;
  position: relative;
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
    max-width: 722px;
    justify-content: flex-end;
  `}
`;

const HamburgerContainer = styled.div`
  display: flex;
  flex-direction: row;
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
    color: ${theme.navHoverColor};
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
  margin-top: -4px;
  ${(props: CompactProps) =>
    props.compact === 'true' &&
    `margin-right: 20px;
  `}
`;

const LanguageButton = styled.div`
  margin: 0;
  transition: 0.1s;
  color: ${theme.navHoverColor};
  font-size: 14px;
  cursor: pointer;
  font-weight: 200;
  :hover {
    color: #a7182d;
  }
  width: 36px;
`;

const LanguageSeparator = styled.div`
  margin-left: 6px;
  margin-right: 8px;
`;

const ReactNavLink = styled.a`
  text-decoration: none;
  color: black;
  transition: 0.1s;
  margin: 0 20px;
  ${(props: CompactProps) =>
    props.compact === 'true' &&
    `
    width: 100%;
    text-align: center;
  `}
  ${(props: CompactProps) =>
    props.active === 'true' &&
    `
    border-bottom: 1px ${theme.navHoverColor}; solid;
    padding: 0 5px 3px;
  `} :link {
    color: black;
  }
  :hover {
    color: ${theme.navHoverColor};
  }
  position: relative;
`;

const Close = styled(CloseIcon)`
  cursor: pointer;
`;

const Dropdown = styled.div`
  z-index: ${theme.maxzIndex};
  left: 138px;
  top: 20px;
  width: 212px;
  height: 184px;
  a:hover {
    color: ${theme.navHoverColor};
  }
  background-color: #ffffff;
  position: absolute;
`;

const DropdownMobile = styled.div`
  width: 100%;
  height: 164px;
  position: relative;
  bottom: 8px;
  display: flex;
  flex-direction: column; 
  justify-content: space-around;
  align-items: center;
`;

const DropItem = styled.div`
  margin-top: 18px;
  margin-left: 28px;
  font-size: 13px;
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;
  text-decoration: none;
  color: black;
  @media (max-width: 920px) {
    color:grey;
    margin: 0px;
  }
`;

const DropdownItem = DropItem.withComponent('a');
const DropdownItemLink = DropItem.withComponent(Link);
const DropdownButtonContainer = styled.div`
  width;100%;  
  display: flex;
  justify-content: center;
  align-items:center;
`;
const DropdownButton = styled.h1`
  font-size: 45px;
  font-family: system-ui, serif;
  transform: rotate(90deg);
  position: absolute;
  left: 280px;
`;

