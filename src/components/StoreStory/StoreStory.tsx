import * as React from 'react';
import styles from './styles.module.scss';

export interface Props {
  story: string;
}

const StoreStory: React.SFC<Props> = ({story}) => {
  return (
    <section className={styles.container}>
      {story}
    </section>
  );
};

export default StoreStory;
