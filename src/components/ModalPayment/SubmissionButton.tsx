import React, { useContext, useState } from 'react';
import { Context } from 'react-square-payment-form';
import { BaseButton } from '../../components/BaseComponents';

type Props = {
  canSubmit: boolean;
};

const SubmissionButton = ({ canSubmit }: Props) => {
  const context = useContext(Context);
  var [submittable] = useState(false);

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    context.onCreateNonce();
  };

  submittable = canSubmit;

  return (
    <BaseButton.ModalButton
      buttonType="filled"
      onClick={handleSubmit}
      disabled={!submittable}
      i18nKey="payment"
      i18nText="paymentProcessing.payment.submit"
      altText="Confirm"
    />
  );
};

export default SubmissionButton;
