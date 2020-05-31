
export const getStoreImages = (sellerId: string| null) => {
  return {
    hero: `https://storage.googleapis.com/sendchinatownlove-assets/public/assets/${sellerId}/${sellerId}-hero.png`,
    menu: `https://storage.googleapis.com/sendchinatownlove-assets/public/assets/${sellerId}/${sellerId}-menu.png`,
    ownerImg: `https://storage.googleapis.com/sendchinatownlove-assets/public/assets/${sellerId}/${sellerId}-owner.png`,
  };
};

export const getWebsiteImages = () => {
  return {
    merchantHero: 'https://storage.cloud.google.com/sendchinatownlove-assets/public/assets/general/merchant-directory-hero.png',
    skyline: 'https://storage.cloud.google.com/sendchinatownlove-assets/public/assets/general/skyline-hero.png',
  };
};
