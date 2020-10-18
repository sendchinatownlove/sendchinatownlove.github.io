import React, { FC, useState } from 'react'
import classnames from 'classnames'

import styles from './styles.module.scss'
import chevron from '../OwnerPanel/assets/chevron.svg'

interface Props {
  hasDeliveryOptions ?: boolean
}

const MobileOrderNowWrapper: FC<Props> = ({ children, hasDeliveryOptions }) => {
  const [shouldShowChild, setShouldShowChild] = useState(false)
  return(
    <>
      { shouldShowChild ?
      <div className='mobile-ordernow-wrapper'>
        { children }
        <button className={classnames(styles.button,styles['button__toggle-modal'])} type='button' onClick={() => setShouldShowChild(false)}>
          Hide <img src={chevron} alt="expand-chevron" className={styles.flipped}/>
        </button>
      </div> :
        <button className={classnames(styles.button,styles.button__toggleMobileDropdown)} type='button' onClick={() => setShouldShowChild(true)}>
        <span className={styles.text__toggleMobileDropdown}>
          {hasDeliveryOptions ? 'View Hours and Order' : 'View Hours'}
          </span>
        <img className={styles.unflipped} src={chevron} alt='collapse-chevron'/>
      </button>
      }
    </>
  )
}

export default MobileOrderNowWrapper