import React, { useContext, useState } from 'react';
import { Context } from 'react-square-payment-form';

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
    <button
      type="button"
      className={'modalButton--filled'}
      onClick={handleSubmit}
      disabled={!submittable}
    >
      Confirm
    </button>
  );
};

export default SubmissionButton;
