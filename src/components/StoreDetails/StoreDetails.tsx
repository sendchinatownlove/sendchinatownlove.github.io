import * as React from 'react';
import styles from './styles.module.scss';
import { NavLink, Switch, Route } from 'react-router-dom';
import StoreStory from '../StoreStory';

type Props = {
  className?: string;
  story: string;
};

const StoreDetails: React.SFC<Props> = ({ className, story }) => (
  <section className={className}>
    <nav className={styles.navLinkContainer}>
      <NavLink
        className={styles.navLink}
        activeClassName={styles['navLink--active']}
        to={`/story`}
      >
        Story
      </NavLink>
      {/* <NavLink
          className={styles.navLink}
          activeClassName={styles['navLink--active']}
          to={`/menu`}
        >
          Menu
        </NavLink> */}
      {/* <NavLink
          className={styles.navLink}
          activeClassName={styles['navLink--active']}
          to={`/photos`}
        >
          Photos
        </NavLink> */}
    </nav>
    <Switch>
      <Route path={`/story`}>
        <StoreStory story={story} />
      </Route>
      {/* <Route path={`/menu`}>
          <StoreMenu {...storeMenuProps} />
        </Route> */}
      {/* <Route path={`/photos`}>
          <StoreMenu {...storePhotoProps}/> 
        </Route> */}
    </Switch>
  </section>
);

export default StoreDetails;
