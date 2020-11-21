import { getSejProducts } from './script/scrapingSej';
import { objectToJsonFile } from './script/toJson';

const main = async () => {
  const scrapingData = await getSejProducts();
  return objectToJsonFile(scrapingData);
};
void main();
