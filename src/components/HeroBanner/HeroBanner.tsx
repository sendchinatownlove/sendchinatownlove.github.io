import * as React from 'react';
import styles from './styles.module.scss';
import sclLogo from './scl-logo.png';
import NavBar from '../Navbar';
import { useState } from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
};
const HeroBanner: React.SFC<Props> = ({ name }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={styles.header}>{name}</div>
    </div>
  );
};

export default HeroBanner;
