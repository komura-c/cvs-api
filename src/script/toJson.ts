import { writeFile } from 'fs';
import { sejProduct } from '../interfaces/sej';

export const objectToJsonFile = (
  objectData: sejProduct[],
  dirPath: string,
  fileName: string
): void => {
  writeFile(dirPath + fileName, JSON.stringify(objectData), (err) => {
    if (err) throw err;
    console.info(fileName + 'を保存');
  });
};
