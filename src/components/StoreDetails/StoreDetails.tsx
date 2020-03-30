import * as React from 'react';
import styles from './styles.module.scss';
import { Link, Switch, Route } from 'react-router-dom';
import StoreStory, { StoreStoryProps } from '../StoreStory';
import StoreMenu from '../StoreMenu';

export interface Props {
  storeStoryProps: StoreStoryProps;
}

const StoreDetails: React.SFC<Props> = ({ storeStoryProps }) => {
  return (
    <section>
      <nav>
        <Link className={styles.navLink} to={`/story`}>
          Story
        </Link>
        <Link className={styles.navLink} to={`/menu`}>
          Menu
        </Link>
      </nav>
      <Switch>
        <Route path={`/story`}>
          <StoreStory {...storeStoryProps} />
        </Route>
        <Route path={`/menu`}>
          <StoreMenu />
        </Route>
      </Switch>
    </section>
  );
};

export default StoreDetails;
