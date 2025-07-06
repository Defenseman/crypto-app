import type { IAsset, ICoin } from './types';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': '05nzy7hgDum61bfYt+cIpzhBbmQrwBSOGnx3tQq3l6I='
  }
};
const dataBaseUrl = 'https://openapiv1.coinstats.app/coins';


export const getCrypto = async () => {
  try {
    const res = await fetch(dataBaseUrl, options)
      .then(data => data.json())
    return res.result as ICoin[];
  } catch(err) {
    console.log(err);
    return []
  }
};

// Имитируем запрос за активами пользователя

const userAssets = [
  {
    id: 'bitcoin',
    amount: 0.02,
    price: 26244,
    date: new Date()
  },
  {
    id: 'ethereum',
    amount: 5,
    price: 2800,
    date: new Date()
  },
  {
    id: 'dogecoin',
    amount: 5000,
    price: 0.07,
    date: new Date()
  }
]

export const getAssets = (): Promise<IAsset[]> => {
  return new Promise((res, rej) => {
    try {
      setTimeout(() => {
        return res(userAssets)
      }, 1)
    } catch (error) {
      rej(error)
    }
  })
}
