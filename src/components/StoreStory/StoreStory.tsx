import * as React from 'react';
import styles from './styles.module.scss';
import ReactMarkdown from "react-markdown";

type Props = {
  story: string;
};

const StoreStory: React.SFC<Props> = ({ story }) => (
  <ReactMarkdown className={styles.container} source={story}/>
);

export default StoreStory;
