import React from 'react';
import styles from './styles.module.scss';

export const Summary2021 = () => {
  type StatItem = { stat: number; desc: string; money?: boolean };

  const data: StatItem[] = [
    {
      stat: 282431.11,
      desc: 'Back into our Chinatowns',
      money: true,
    },
    {
      stat: 31196,
      desc: 'Meals and gift bags given to the community',
    },
    {
      stat: 43,
      desc: 'Participating merchants',
    },
    {
      stat: 16,
      desc: 'Distributor Partners',
    },
  ];

  const generateItem = (item: StatItem) => {
    const currency = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    const regNum = new Intl.NumberFormat('en-US');

    return (
      <div className={styles.statsBox}>
        <div className={styles.statsText}>
          {item.money ? currency.format(item.stat) : regNum.format(item.stat)}
        </div>
        <div className={styles.statsDescriptionText}>{item.desc}</div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.statsHeader}>2021 Gift-a-Meal at a glance</div>
      <div className={styles.statsContainer}>
        {data.map((i) => generateItem(i))}
      </div>
    </>
  );
};
