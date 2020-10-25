import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';

import type { FTRenderProps } from './types';
import { formatCentsAmount } from './utils';
import { updateVoucher } from '../../utilities/api/interactionManager';
import type { GiftCardDetails } from '../../utilities/api/types';

import styles from './styles.module.scss';

const FilterableTable = require('react-filterable-table');

const renderDate = (date: string) => moment(date).format('YYYY-MM-DD');

// Determine if the gift card latest and original values are different
// (aka it's been used).
const hasBeenUsed = (record: any) =>
  record.latest_value !== record.original_value;

const VoucherTable = ({
  fetchData,
  giftCards,
  showPrintView,
}: {
  fetchData: () => void;
  giftCards: GiftCardDetails[];
  showPrintView: boolean;
}) => {
  const [editingRowGiftCardId, setEditingRowGiftCardId] = useState<
    string | null
  >(null);
  const [latestValue, setLatestValue] = useState<string>('');

  useEffect(() => {
    if (!editingRowGiftCardId) {
      setLatestValue('');
    }
  }, [editingRowGiftCardId]);

  const onSave = useCallback(
    async (giftCardId: string) => {
      const latestValueCents = parseFloat(latestValue) * 100;
      await updateVoucher(giftCardId, latestValueCents);
      setEditingRowGiftCardId(null);
      fetchData();
      // TODO: Show success banner.
      // TODO: Show error banner on error.
    },
    [fetchData, latestValue]
  );

  const renderLatestValue = ({ record, value }: FTRenderProps) => {
    if (showPrintView && !hasBeenUsed(record)) {
      return <div className={styles.greyBox} />;
    } else if (record.seller_gift_card_id !== editingRowGiftCardId) {
      const onSelectCell = (record: any) => {
        // This has to be a string because the onChange event below outputs a
        // string value.
        setLatestValue(String(record.latest_value / 100));
        setEditingRowGiftCardId(record.seller_gift_card_id);
      };

      return (
        <div className={styles.editCell} onClick={() => onSelectCell(record)}>
          {formatCentsAmount(value)}
          {!showPrintView && <EditIcon classes={{ root: styles.editIcon }} />}
        </div>
      );
    }

    return (
      <div className={styles.editEndingBalance}>
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

  {
    /** TODO: render grey boxes for n/a values, hide search */
  }
  // TODO: Hover and selected background colors.
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
      // Kind of a hack, but show all of the gift cards if we're in print view.
      pageSize={showPrintView ? 100000 : 20}
      pageSizes={null} // Don't show the page size chooser.
      recordCountName="Voucher Found"
      recordCountNamePlural="Vouchers Found"
      topPagerVisible={false}
    />
  );
};

export default VoucherTable;
