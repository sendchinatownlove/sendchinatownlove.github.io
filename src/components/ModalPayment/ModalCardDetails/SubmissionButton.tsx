import React, { useContext } from 'react';
import { Context } from 'react-square-payment-form';
import ReactPixel from 'react-facebook-pixel';
import Loader from '../../Loader';

type Props = {
  canSubmit: boolean;
  loading: boolean;
};

const SubmissionButton = ({ canSubmit, loading }: Props) => {
  const context = useContext(Context);

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    ReactPixel.trackCustom('PaymentConfirmButtonClick', {});
    evt.preventDefault();
    context.onCreateNonce();
  };

  return (
    <button
      type="button"
      className={'modalButton--filled'}
      onClick={handleSubmit}
      disabled={!canSubmit || loading}
    >
      {loading ? <Loader size="20px" color="white" /> : 'Confirm'}
    </button>
  );
};

export default SubmissionButton;
