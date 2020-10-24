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

const VoucherTable = ({
  fetchData,
  giftCards,
}: {
  fetchData: () => void;
  giftCards: GiftCardDetails[];
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
    if (record.seller_gift_card_id === editingRowGiftCardId) {
      return (
        <div className={styles.editEndingBalance}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
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
    }

    const onSelectCell = (record) => {
      // This has to be a string because the onChange event below outputs a
      // string value.
      setLatestValue(String(record.latest_value / 100));
      setEditingRowGiftCardId(record.seller_gift_card_id);
    };

    return (
      <div className={styles.editCell} onClick={() => onSelectCell(record)}>
        {formatCentsAmount(value)}
        <EditIcon classes={{ root: styles.editIcon }} />
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
      render: ({ record, value }: FTRenderProps) =>
        // Determine if the gift card latest and original values are different
        // (aka it's been used). We use this to show "N/A" in the cell or the
        // last updated date.
        record.latest_value !== record.original_value
          ? renderDate(value)
          : 'N/A',
    },
    {
      name: 'latest_value',
      displayName: 'Ending Balance\n结余',
      sortable: true,
      render: renderLatestValue,
      thClassName: styles.endingBalance,
    },
  ];

  // TODO: Hover and selected background colors.
  return (
    <FilterableTable
      className={styles.tableContainer}
      data={giftCards}
      fields={fields}
      headerVisible={false} // Don't show the filter header.
      initialSort="seller_gift_card_id"
      namespace="Vouchers"
      noFilteredRecordsMessage="No vouchers found for filter"
      noRecordsMessage="No vouchers in our system yet!"
      pageSize={20}
      pageSizes={null} // Don't show the page size chooser.
      recordCountName="Voucher Found"
      recordCountNamePlural="Vouchers Found"
      topPagerVisible={false}
    />
  );
};

export default VoucherTable;
