export function validatePhone(phone_number) {
  return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g.test(phone_number);
}

export function generateMapLink(location) {
  var mapLink = 'https://www.google.com/maps/place/';
  var addressKeys = ['address1', 'address2', 'city', 'state', 'zip_code'];
  var fullAddress = '';
  for (const [key, value] of Object.entries(location)) {
    if (addressKeys.includes(key) && value != null) {
      fullAddress += value + ' ';
    }
  }
  mapLink += fullAddress.trim().replaceAll(' ', '+');
  return mapLink;
}
