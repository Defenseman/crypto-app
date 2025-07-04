const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': '05nzy7hgDum61bfYt+cIpzhBbmQrwBSOGnx3tQq3l6I='
  }
};
const dataBaseUrl = 'https://openapiv1.coinstats.app/coins';

import type { ICoin } from './types';

export const GetCoins = async () => {
  try {
    const res = await fetch(dataBaseUrl, options)
      .then(data => data.json())
    return res.result as ICoin[];
  } catch(err) {
    console.log(err);
    return []
  }
};

