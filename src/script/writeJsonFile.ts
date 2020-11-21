import * as fs from 'fs';
import { sejProduct } from '../interfaces/sej';

export const writeJsonFile = (data: sejProduct[]): void => {
  fs.writeFile('src/data/sej.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.info('done');
  });
};
