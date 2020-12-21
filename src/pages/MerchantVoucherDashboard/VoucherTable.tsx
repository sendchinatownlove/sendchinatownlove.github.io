import classNames from 'classnames';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

import { ERROR_TYPE } from './Banners';
import type { ErrorTypeValues } from './Banners';
import { formatCentsAmount } from './utils';
import { updateVoucher } from '../../utilities/api/interactionManager';
import type { GiftCardDetails } from '../../utilities/api/types';

import styles from './styles.module.scss';

const FilterableTable = require('react-filterable-table');

const renderDate = (date: string) => moment(date).format('YYYY-MM-DD');
const centsToDollarString = (cents: number) => String(cents / 100);

// Determine if the gift card latest and original values are different
// (aka it's been used).
const hasBeenUsed = (record: GiftCardDetails) =>
  record.latest_value !== record.original_value;

interface Props {
  fetchData: () => void;
  giftCards: GiftCardDetails[];
  setErrorType: (type: ErrorTypeValues | null) => void;
  setShowSuccessBanner: (showSuccessBanner: boolean) => void;
  showPrintView: boolean;
}

const VoucherTable = ({
  fetchData,
  giftCards,
  setErrorType,
  setShowSuccessBanner,
  showPrintView,
}: Props) => {
  const [
    editingGiftCard,
    setEditingGiftCard,
  ] = useState<GiftCardDetails | null>(null);
  const [latestValue, setLatestValue] = useState<string>('');

  useEffect(() => {
    // Reset error banner after selected row changes.
    setErrorType(null);

    if (!editingGiftCard) {
      setLatestValue('');
    }
  }, [editingGiftCard, setErrorType]);

  const tableRef = useRef();
  useEffect(() => {
    // This is very hacky but we need it to force the table to re-render
    // when we print. react-filterable-table only updates page size on
    // component mount or when an internal .updatePageSize method is
    // called. See below for details:
    // https://github.com/ianwitherow/react-filterable-table/blob/master/src/Components/FilterableTable.jsx#L23
    // https://github.com/ianwitherow/react-filterable-table/blob/master/src/Components/FilterableTable.jsx#L224
    if (showPrintView) {
      (tableRef?.current as any).updatePageSize({ target: { value: 1000 } });
    } else {
      (tableRef?.current as any).updatePageSize({ target: { value: 20 } });
    }
  }, [showPrintView]);

  const onSave = useCallback(
    async (giftCardId: string) => {
      const latestValueCents = parseFloat(latestValue) * 100;

      if (latestValueCents === editingGiftCard?.latest_value) {
        setEditingGiftCard(null);
        return;
      }

      try {
        await updateVoucher(giftCardId, latestValueCents);
        fetchData();
        setEditingGiftCard(null);
        setErrorType(null);
        setShowSuccessBanner(true);
      } catch (error) {
        if (error.message.includes('422')) {
          setErrorType(ERROR_TYPE.VALIDATION);
        } else {
          setErrorType(ERROR_TYPE.GENERIC);
        }
      }
    },
    [
      editingGiftCard,
      fetchData,
      latestValue,
      setErrorType,
      setShowSuccessBanner,
    ]
  );

  const renderLatestValue = ({ record, value }: FTRenderProps) => {
    if (showPrintView && !hasBeenUsed(record)) {
      return <div className={styles.greyBox} />;
    } else if (
      record.seller_gift_card_id !== editingGiftCard?.seller_gift_card_id
    ) {
      const onSelectCell = (record: GiftCardDetails) => {
        // This has to be a string because the onChange event below outputs a
        // string value.
        setLatestValue(centsToDollarString(record.latest_value));
        setEditingGiftCard(record);
      };

      return (
        <div className={styles.editCell}>
          {formatCentsAmount(value)}
          <div
            className={styles.editIconContainer}
            onClick={() => onSelectCell(record)}
          >
            {!showPrintView && record.latest_value !== 0 && (
              <EditIcon classes={{ root: styles.editIcon }} />
            )}
          </div>
        </div>
      );
    }

    let input;
    if (record.single_use) {
      // Single use vouchers should be used in full amount.
      const originalValueString = centsToDollarString(record.original_value);
      const voucherUsed = latestValue !== originalValueString;
      input = (
        <div className={styles.markUsedContainer}>
          <Checkbox
            checked={voucherUsed}
            classes={{
              checked: voucherUsed ? styles.markedUsed : '',
              colorSecondary: voucherUsed ? styles.markedUsed : '',
            }}
            onChange={() =>
              voucherUsed
                ? setLatestValue(originalValueString)
                : setLatestValue(String(0))
            }
          />
          <div
            className={classNames({
              [styles.markUsedLabel]: true,
              [styles.markedUsed]: voucherUsed,
            })}
          >
            Mark as used
            <br />
            标记为已使用
          </div>
        </div>
      );
    } else {
      input = (
        <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLatestValue(event.target.value)
          }
          value={latestValue}
          variant="outlined"
        />
      );
    }

    return (
      <div className={styles.editEndingBalance}>
        {input}
        <Button
          className={styles.saveButton}
          onClick={() => onSave(record.gift_card_id)}
          variant="outlined"
        >
          Save 储存
        </Button>
      </div>
    );
  };

  const fields = [
    {
      name: 'seller_gift_card_id',
      displayName: 'Voucher Code\n礼品券号码',
      sortable: true,
    },
    {
      name: 'email',
      displayName: 'Email\n电子邮件',
      sortable: true,
      thClassName: 'table-email-header',
      tdClassName: 'table-email-container',
    },
    {
      name: 'original_value',
      displayName: 'Original Amount\n购买金额',
      sortable: true,
      render: ({ value }: FTRenderProps) => formatCentsAmount(value),
    },
    {
      name: 'created_at',
      displayName: 'Date Purchased\n购买日期',
      sortable: true,
      render: ({ value }: FTRenderProps) => renderDate(value),
    },
    {
      name: 'last_updated',
      displayName: 'Date Last Used\n上次使用日期',
      sortable: true,
      render: ({ record, value }: FTRenderProps) => {
        if (hasBeenUsed(record)) {
          return renderDate(value);
        } else if (showPrintView) {
          return <div className={styles.greyBox} />;
        }
        return 'N/A';
      },
    },
    {
      name: 'latest_value',
      displayName: 'Ending Balance\n结余',
      sortable: true,
      render: renderLatestValue,
      thClassName: styles.endingBalance,
    },
  ];

  return (
    <FilterableTable
      bottomPagerVisible={!showPrintView}
      className={styles.tableContainer}
      data={giftCards}
      fields={fields}
      headerVisible={false} // Don't show the filter header.
      initialSort="seller_gift_card_id"
      namespace="Vouchers"
      noFilteredRecordsMessage="No vouchers found for filter"
      noRecordsMessage="No vouchers in our system yet!"
      pageSizes={null} // Don't show the page size chooser.
      recordCountName="Voucher Found"
      recordCountNamePlural="Vouchers Found"
      ref={tableRef}
      topPagerVisible={false}
    />
  );
};

/**
 * Filterable Table Props
 *
 * From the react-filterable-table documentation
 */
export interface FTRenderProps {
  /**
   * The same field object that this render function was passed into.
   * We'll have access to any props on it, including that 'someRandomProp' one we put on there.
   * Those can be functions, too, so we can add custom onClick handlers to our return value.
   */
  field: any;
  /**
   * The data record for the whole row.
   */
  record: GiftCardDetails;
  /**
   * Value of the field in the data.
   */
  value: any;
}

export default VoucherTable;
