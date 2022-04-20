import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Logo } from '../Logos';
import { Page } from '../../consts';
import { smallScreens } from '../../utilities/general/responsive';
import { desktopScreens } from '../../utilities/general/responsive';

import styles from './styles.module.scss';

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
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    { url: '/gift-a-meal-home', text: 'gift-a-meal', external: false },
    {
      url: 'https://www.sendchinatownlove.com/bd-services.html',
      text: 'business development',
      external: true,
    },
    {
      url: 'https://www.sendchinatownlove.com/past-campaigns.html',
      text: 'past campaigns',
      external: true,
    },
  ];

  const drop = dropdownOptions.map((option) => {
    const { url, text, external } = option;
    return external ? (
      <DropdownItem href={url}>{text.toUpperCase()}</DropdownItem>
    ) : (
      <DropdownItemLink to={url} onClick={(e) => props.setMenuOpen(false)}>
        {text.toUpperCase()}
      </DropdownItemLink>
    );
  });

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
        <MenuIcon onClick={(e) => props.setMenuOpen(true)} />
      </HamburgerContainer>
    ) : (
      <NavLinksContainer compact={hamburgerOpen.toString()}>
        <HeaderContainer compact={hamburgerOpen.toString()}>
          <a className="nav-bar-logo" href="https://sendchinatownlove.com/">
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
        <NavLink
          compact={hamburgerOpen.toString()}
          href="https://www.sendchinatownlove.com/donate.html"
          i18nText="DONATE"
          altText="DONATE"
        />
        <DropdownButtonContainer>
          <ReactNavLink compact={hamburgerOpen.toString()}>
            <p>{'OUR WORK'}</p>
          </ReactNavLink>
          <DropdownButton onClick={handleDropdownOpen}>›</DropdownButton>
        </DropdownButtonContainer>
        {dropdownOpen && <DropdownMobile>{drop}</DropdownMobile>}
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
    <HeaderContainer
      compact={hamburgerOpen.toString()}
      className={props.menuOpen ? '' : styles.sticky}
    >
      <a className="nav-bar-logo" href="https://sendchinatownlove.com/">
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
          <NavLink
            compact={hamburgerOpen.toString()}
            href="https://www.sendchinatownlove.com/donate.html"
            i18nText="DONATE"
            altText="DONATE"
          />
          <ReactNavLink
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            compact={hamburgerOpen.toString()}
            active={isMerchantsPathActive.toString()}
          >
            {'OUR WORK'}
            {dropdownOpen && <Dropdown>{drop}</Dropdown>}
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

  margin: 15px auto;
  padding: 5px 0px;
  align-items: center;
  font-size: 14px;
  font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
  ${(props: CompactProps) =>
    props.compact !== 'true' &&
    `
    margin: 35px 40px 20px;
  `}

  @media (${desktopScreens}) {
    padding: 15px 20px 30px 20px;
  }

  @media (${smallScreens}) {
    a.nav-bar-logo {
      margin-left: 0;
    }

    z-index: ${theme.maxzIndex};
    background-color: white;
    border-bottom: 1px solid #f2f2f2;
    width: 100%;
    margin: 0;
  }
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
    max-width: 976px;
    justify-content: flex-end;
  `}
`;

const HamburgerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (${smallScreens}) {
    margin-right: 0;
  }
`;

const NavLinkStyle = styled.a`
  text-decoration: none;
  color: black;
  transition: 0.1s;
  margin: 5px 22px 0 22px;

  @media (${smallScreens}) {
    background-color: white;
  }

  ${(props: CompactProps) =>
    props.compact === 'true' &&
    `
    width: 100%;
    margin: 0 auto;
    padding: 10px 0;
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

const ReactNavLink = styled.a`
  text-decoration: none;
  color: black;
  transition: 0.1s;
  margin: 5px 22px 0 22px;

  @media (${smallScreens}) {
    background-color: white;
  }
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

  @media (${smallScreens}) {
    margin-right: 20px;
  }
`;

const Dropdown = styled.div`
  z-index: ${theme.maxzIndex};
  top: 20px;
  width: 212px;
  height: auto;
  padding-bottom: 20px;
  a:hover {
    color: ${theme.navHoverColor};
  }
  background-color: #ffffff;
  position: absolute;
`;

const DropdownMobile = styled.div`
  width: 100%;
  height: auto;
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
    color: grey;
    margin: 0px;
    padding: 8px 0;
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
