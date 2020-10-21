import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';

import { createMuiTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import { DatePicker } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';

import type { FTRenderProps } from './types';
import { formatCentsAmount } from './utils';
import { updateVoucher } from '../../utilities/api/interactionManager';
import type { GiftCardDetails } from '../../utilities/api/types';

import styles from './styles.module.scss';

const FilterableTable = require('react-filterable-table');

const RED_HEX = '#a8192e';

const materialTheme = (createMuiTheme as any)({
  palette: {
    primary: {
      main: RED_HEX,
      light: RED_HEX,
      dark: RED_HEX,
    },
    secondary: {
      main: RED_HEX,
    },
  },
});

const renderDate = (date: string) => moment(date).format('YYYY-MM-DD');

const EditCell = ({
  body,
  onSelect,
}: {
  body: JSX.Element | string;
  onSelect: () => void;
}) => (
  <div className={styles.editCell} onClick={onSelect}>
    {body}
    <EditIcon classes={{ root: styles.editIcon }} />
  </div>
);

const VoucherTable = ({ fetchData, giftCards }: { fetchData: () => void, giftCards: GiftCardDetails[] }) => {
  const [editingRowGiftCardId, setEditingRowGiftCardId] = useState<
    string | null
  >(null);
  const [latestValue, setLatestValue] = useState<string>('');
  const [updatedAt, setUpdatedAt] = useState<string>('');

  useEffect(() => {
    if (!editingRowGiftCardId) {
      setLatestValue('');
      setUpdatedAt('');
    }
  }, [editingRowGiftCardId]);

  const isEditingCell = useCallback(
    (voucher) => voucher.seller_gift_card_id === editingRowGiftCardId,
    [editingRowGiftCardId]
  );

  // Determine if the gift card created_at and last_updated are different (aka
  // it's been used). We use this to show "N/A" in the cell or the last
  // updated date.
  const voucherHasBeenUpdated = (voucher) =>
    voucher.latest_value !== voucher.original_value;

  const onSelectCell = useCallback((record) => {
    // This has to be a string because the onChange event below outputs a
    // string value.
    setLatestValue(String(record.latest_value / 100));
    setUpdatedAt(voucherHasBeenUpdated(record) ? record.last_updated : null);
    setEditingRowGiftCardId(record.seller_gift_card_id);
  }, []);

  const onSave = useCallback(async (giftCardId: string) => {
    try {
      const latestValueCents = parseFloat(latestValue)*100;
      await updateVoucher(giftCardId, latestValueCents, updatedAt);
      setEditingRowGiftCardId(null);
      fetchData();
    } finally {

    }
  }, [fetchData, latestValue, updatedAt]);

  const renderUpdatedAt = ({ record, value }: FTRenderProps) => {
    if (isEditingCell(record)) {
      return (
        <DatePicker
          disableToolbar
          emptyLabel="Date"
          format="YYYY-MM-DD"
          inputVariant="outlined"
          onChange={(date) => setUpdatedAt(date ? date.toISOString() : '')}
          value={updatedAt}
          variant="inline"
        />
      );
    }

    return (
      <EditCell
        body={voucherHasBeenUpdated(record) ? renderDate(value) : 'N/A'}
        onSelect={() => onSelectCell(record)}
      />
    );
  };

  const renderLatestValue = ({ record, value }: FTRenderProps) => {
    if (isEditingCell(record)) {
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

    return (
      <EditCell
        body={formatCentsAmount(value)}
        onSelect={() => onSelectCell(record)}
      />
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
      render: (props: FTRenderProps) => formatCentsAmount(props.value),
    },
    {
      name: 'created_at',
      displayName: 'Date Purchased\n购买日期',
      sortable: true,
      render: (props: FTRenderProps) => renderDate(props.value),
    },
    {
      name: 'last_updated',
      displayName: 'Date Last Used\n上次使用日期',
      sortable: true,
      render: renderUpdatedAt,
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
    <ThemeProvider theme={materialTheme}>
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
    </ThemeProvider>
  );
};

export default VoucherTable;
