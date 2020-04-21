import React, { useContext } from 'react';
import { Context } from 'react-square-payment-form';

type Props = {
  canSubmit: boolean;
};

const SubmissionButton = ({canSubmit}: Props) => {
  const context = useContext(Context);
 
  console.log(context)
  const handleSubmit = (evt: { preventDefault: () => void; }) => {
     evt.preventDefault();
     context.onCreateNonce();
  }

  return (
    <button
      type="button"
      className={'modalButton--filled'}
      onClick={handleSubmit}
      disabled={canSubmit === false}
    >
      Confirm
    </button>
  );
 }

 export default SubmissionButton;