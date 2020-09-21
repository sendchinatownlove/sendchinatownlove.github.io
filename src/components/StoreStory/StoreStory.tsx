import * as React from 'react';
import styles from './styles.module.scss';
import ReactMarkdown from "react-markdown";

type Props = {
  story: string;
};

const StoreStory: React.SFC<Props> = ({ story }) => (
  <section className={styles.container}>
    <ReactMarkdown source={story}/>
  </section>
);

export default StoreStory;
