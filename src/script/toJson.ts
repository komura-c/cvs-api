import { writeFile } from 'fs';
import { sejProduct } from '../interfaces/sej';

export const objectToJsonFile = (objectData: sejProduct[]): void => {
  writeFile('src/data/sej.json', JSON.stringify(objectData), (err) => {
    if (err) throw err;
    console.info('done');
  });
};
