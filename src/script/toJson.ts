import { writeFile, existsSync, mkdirSync } from 'fs';
import { sejProduct } from '../interfaces/product';

export const objectToJsonFile = (
  objectData: sejProduct[],
  dirPath: string,
  fileName: string
): void => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
  }
  return writeFile(dirPath + fileName, JSON.stringify(objectData), (err) => {
    if (err) throw err;
    console.info(fileName + 'を保存');
  });
};
