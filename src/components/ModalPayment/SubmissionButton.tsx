import React, { useContext } from 'react';
import { Context } from 'react-square-payment-form';

type Props = {
  isChecked: boolean;
};

const SubmissionButton = ({ isChecked }: Props) => {
  const context = useContext(Context);

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    context.onCreateNonce();
  };

  return (
    <button
      type="button"
      className={'modalButton--filled'}
      onClick={handleSubmit}
      disabled={isChecked === false}
    >
      {' '}
      Confirm{' '}
    </button>
  );
};

export default SubmissionButton;
