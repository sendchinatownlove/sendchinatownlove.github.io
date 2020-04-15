import * as React from 'react';
import styles from './styles.module.scss';

type Props = {
  story: string;
};

const StoreStory: React.SFC<Props> = ({ story }) => (
  <section className={styles.container}>{story}</section>
);

export default StoreStory;
