import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.scss';

type Props = {
  story: string;
};

const StoreStory: React.SFC<Props> = ({ story }) => (
  <ReactMarkdown className={styles.container} source={story} />
);

export default StoreStory;
