import { writeFile } from 'fs';
import { sejProduct } from '../interfaces/sej';

export const objectToJsonFile = (
  objectData: sejProduct[],
  fileName: string
): void => {
  writeFile('src/data/' + fileName, JSON.stringify(objectData), (err) => {
    if (err) throw err;
    console.info(fileName + 'を保存');
  });
};
