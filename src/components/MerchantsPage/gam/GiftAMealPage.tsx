import React, { useEffect, useState }  from 'react';
import { getWebsiteImages } from '../../../utilities/general/StoreImages';
import { getSellers } from '../../../utilities';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import CampaignListItem from './CampaignListItem'

interface Props {
    menuOpen: boolean;
}

const GiftAMealPage = (props: Props) => {
    const { t, i18n } = useTranslation();

    const [sellers, setSellers] = useState<any | null>();
    const [filter, setFilter] = useState<any | null>();
    const [totalDonations, setDonations] = useState(0);
    const [totalGiftCards, setGiftCards] = useState(0);

    const fetchData = async (lang?) => {
        const { data } = await getSellers(lang);

        const contributions = data.reduce(
        (total: any, store: any) => {
            return [
            total[0] + store.donation_amount,
            total[1] + store.gift_card_amount,
            ];
        },
        [0, 0]
        );

        setSellers(data);
        setFilter(data);
        setDonations(contributions[0]);
        setGiftCards(contributions[1]);
    };

    useEffect(() => {
        fetchData(i18n.language);
    }, [i18n.language]);

    return (
        <div 
            className={styles.container}
            style={{ display: props.menuOpen ? 'none' : 'inherit' }}    
        >
            Gift A Meal Page

            <CampaignListItem />
        </div>
    )
}

export default GiftAMealPage