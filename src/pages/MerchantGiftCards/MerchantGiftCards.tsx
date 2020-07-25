import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getMerchantGiftCards } from '../../utilities/api/interactionManager';
import Loader from '../../components/Loader/Loader';
import styles from './styles.module.scss'

const MerchantGiftCards = () => {
  const params = useHistory();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [giftCards, setGiftCards] = useState<any | null>();

  const fetchData = async () => {
    try {
      let urlParams = params.location.pathname.match(/\/[^/]+/g) as string[];
      urlParams = urlParams.map((param) => param.replace('/', ''));
      const { data } = await getMerchantGiftCards(urlParams[1], urlParams[2]);

      if (!data) {
        throw new Error('No data returned');
      }

      setGiftCards(data);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Loader isPage={true} />
      ) : error ? (
        <p>Error!</p>
      ) : (
          <>
            <div className={styles.header}>
                <h1>Voucher Tracker</h1>
                <h2>Melonpanna Tea and Shot</h2>
            </div>
            <div>
            <p>Hello World!</p>
            {giftCards &&
                giftCards.map((card) => <p>{card.seller_gift_card_id}</p>)}
            </div>
        </>
      )}
    </>
  );
};

export default MerchantGiftCards;