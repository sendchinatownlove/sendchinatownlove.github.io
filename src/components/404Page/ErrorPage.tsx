import React from 'react';
import NavBar from '../Navbar';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import ErrorImage from '../../images/404-error-image.png';

interface Props {}

const ErrorPage = (props: Props) => {
  return (
    <main className={styles.container}>
      <NavBar />
      <div className={styles.textContainer}>
        <img src={ErrorImage} alt="error" />
        <h1 className={styles.mainHeader}>Dumpling Not Found!</h1>
        <h3 className={styles.subHeader}>
          The page you are trying to access does not exist or has been moved.
        </h3>
        <h3 className={styles.subHeader}>Try going back to the homepage.</h3>
        <p className={styles.backToHome}>
          <Link to="/">PLEASE GO TO HOMEPAGE</Link>
        </p>
      </div>
    </main>
  );
};

export default ErrorPage;
// curl --location --request POST 'http://localhost:5000' \
// --header 'Content-Type: application/json' \
// --data-raw '{
//     "seller_id": "shunfa-bakery",
//     "cuisine_name": "Bakery",
//     "name": "Shunfa Bakery",
//     "story": "When Shunfa Bakery, a ",
//     "accept_donations": true,
//     "sell_gift_cards": true,
//     "owner_name": "Shunfa Bakery",
//     "owner_image_url": "assets/shunfa-bakery-logo.png",
//     "target_amount": 1000000,
//     "summary": null,
//     "hero_image_url": "assets/shunfa-bakery-hero.png",
//     "progress_bar_color": null,
//     "business_type": "Family-owned",
//     "num_employees": 3,
//     "founded_year": 2015,
//     "website_url": null,
//     "menu_url": null
// }'
