import express from 'express';
import sejProducts from '../data/sej-2020-11-21/sej_kanto_2020-11-21.json';
import { sejProduct } from '../interfaces/product';

const app: express.Express = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(
    'CVS API is sample api of convenience store products data. \\n ex. GET:/api/sej/1'
  );
});

app.get('/api/sej', (req, res) => {
  res.send(JSON.stringify(sejProducts));
});

app.get('/api/sej/:id', (req, res) => {
  if (typeof req.params.id === 'number')
    return res.status(404).send('The given ID needs to be number.');

  if (req.params.id === 'random')
    return res.send(JSON.stringify(shuffleProducts(sejProducts)[0]));

  const sejProduct = sejProducts.find((_, i) => i === parseInt(req.params.id));
  if (!sejProduct)
    return res.status(404).send('The product with the given ID was not found.');
  res.send(JSON.stringify(sejProduct));
});

const shuffleProducts = (products: sejProduct[]) => {
  for (let i = products.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [products[i], products[rand]] = [products[rand], products[i]];
  }
  return products;
};

export const server = app;
