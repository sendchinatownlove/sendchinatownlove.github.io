import classNames from 'classnames';
import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import styles from './styles.module.scss';

export const ERROR_TYPE = {
  GENERIC: 'GENERIC',
  VALIDATION: 'VALIDATION',
};

type ErrorTypeKeys = keyof typeof ERROR_TYPE;
export type ErrorTypeValues = typeof ERROR_TYPE[ErrorTypeKeys];

const ERROR_COPY_ENGLISH = {
  GENERIC:
    'There was an error saving your changes. Please refresh your page and try again.',
  // Right now, the only validation error we have on the update voucher
  // endpoint is if the amount is higher than the current voucher value.
  VALIDATION:
    'The ending balance entered is higher than the current voucher balance. Please enter a value the same or lower than the current balance before saving.',
};

const ERROR_COPY_CHINESE = {
  GENERIC: '编辑储存错误。请刷新页面并重新储存。',
  VALIDATION:
    '输入的结余大于礼品券可用金额。请输入等于或小于礼品券可用金额并重新储存。',
};

export const SuccessfulSaveBanner = () => (
  <div className={classNames(styles.banner, styles.successfulSaveBanner)}>
    <div className={styles.successfulSaveIconContainer}>
      <CheckCircleIcon />
    </div>
    Your changes have been saved. 编辑已储存。
  </div>
);

export const SaveErrorBanner = ({
  errorType,
}: {
  errorType: ErrorTypeValues;
}) => (
  <div className={classNames(styles.banner, styles.saveErrorBanner)}>
    <div className={styles.errorIconContainer}>
      <ErrorIcon />
    </div>
    {ERROR_COPY_ENGLISH[errorType]}
    <br />
    {ERROR_COPY_CHINESE[errorType]}
  </div>
);
