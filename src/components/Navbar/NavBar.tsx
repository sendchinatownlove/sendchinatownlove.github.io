import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import sclLogo from '../../images/logo-with-text.png';

interface Props {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CompactProps {
  compact: boolean;
}

const NavBar = (props: Props) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

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
  }, []);

  const showCompactMenu = () => {
    return !props.menuOpen ? (
      <MenuIcon onClick={(e) => props.setMenuOpen(true)} />
    ) : (
      <NavLinksContainer compact={hamburgerOpen}>
        <NavBarContainer>
          <Image src={sclLogo} alt="Logo" />
          <Close onClick={(e) => props.setMenuOpen(false)}/>
        </NavBarContainer>
        <NavLink compact={hamburgerOpen} href="https://sendchinatownlove.com/" >HOME</NavLink>
        <ReactNavLink to="/sellers" compact={hamburgerOpen}>MERCHANTS</ReactNavLink>
        <ReactNavLink to="/about" compact={hamburgerOpen}>ABOUT US</ReactNavLink>
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
          <NavLink compact={hamburgerOpen} href="https://sendchinatownlove.com/">HOME</NavLink>
          <ReactNavLink to="/sellers" compact={hamburgerOpen}>MERCHANTS</ReactNavLink>
          <ReactNavLink to="/about" compact={hamburgerOpen}>ABOUT US</ReactNavLink>
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
`
const Image = styled.img`
  width: 150px;
  height: 66px;
`

const NavLinksContainer = styled.div`
  display: flex;
  flex-direction: ${ (props: CompactProps) => props.compact ? `column` : 'row'};
  width: ${(props: CompactProps) => props.compact ? `100%` : '50%'};
  ${(props: CompactProps) => props.compact ? `
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    background-color: white;
    // height: 100%;
    z-index: 10;
  ` :  `
    max-width: 400px;
    justify-content: space-between;
  `
  }
`
const NavLink = styled.a`
  text-decoration: none;
  color: black;
  ${(props: CompactProps) => props.compact && `
    width: 100%;
    margin: 16px auto;
    text-align: center;
  `}
`
const ReactNavLink = styled(Link)`
  text-decoration: none;
  color: black;
  ${(props: CompactProps) => props.compact && `
    width: 100%;
    margin: 16px auto;
    text-align: center;
  `}  
`
const Close = styled(CloseIcon)`
  cursor: pointer;
`
