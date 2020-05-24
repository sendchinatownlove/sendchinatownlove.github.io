
export const getStoreImages = (sellerId: string| null) => {
  let galleryArray: string[] = [];

  for (let i = 0; i < 6; i++) {
    let url = `https://storage.googleapis.com/sendchinatownlove-assets/public/assets/${sellerId}/${sellerId}-gallery-${i}.png`;
    galleryArray.push(url);
  }

  let images = {
    hero: `https://storage.googleapis.com/sendchinatownlove-assets/public/assets/${sellerId}/${sellerId}-hero.png`,
    gallery: galleryArray,
    menu: `https://storage.googleapis.com/sendchinatownlove-assets/public/assets/${sellerId}/${sellerId}-menu.png`,
    ownerImg: `https://storage.googleapis.com/sendchinatownlove-assets/public/assets/${sellerId}/${sellerId}-owner.png`,
  };

  return images;
};

export const getWebsiteImages = () => {
  let images = {
    merchantHero: 'https://storage.cloud.google.com/sendchinatownlove-assets/public/assets/general/merchant-directory-hero.png',
    skyline: 'https://storage.cloud.google.com/sendchinatownlove-assets/public/assets/general/skyline-hero.png',
  }

  return images;
}