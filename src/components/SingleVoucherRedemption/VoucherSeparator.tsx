import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

const Separator = () => (
  <div className={styles.body__separator}>
    <span
      className={classnames(
        styles.separator__text,
        styles.separator__textCenter
      )}
    >
      OR
    </span>
    <span
      className={classnames(
        styles.separator__text,
        styles.separator__textBottom
      )}
    >
      或
    </span>
  </div>
);

export default Separator;
