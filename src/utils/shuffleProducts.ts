import { sejProduct } from '../interfaces/product';

export const shuffleProducts = (products: sejProduct[]): sejProduct[] => {
  for (let i = products.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [products[i], products[rand]] = [products[rand], products[i]];
  }
  return products;
};
