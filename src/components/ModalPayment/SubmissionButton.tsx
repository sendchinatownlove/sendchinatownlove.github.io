import React, { useContext, useState } from 'react';
import { Context } from 'react-square-payment-form';

type Props = {
  canSubmit: boolean;
  setChecked: (isChecked: boolean) => void;
};

const SubmissionButton = ({ canSubmit, setChecked }: Props) => {
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
      onClick={(e) => {
        handleSubmit(e);
        setChecked(false);
      }}
      disabled={!submittable}
    >
      Confirm
    </button>
  );
};

export default SubmissionButton;
