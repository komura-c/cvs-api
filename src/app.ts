import { getSejProducts } from './script/scrapingSej';
import { writeJsonFile } from './script/writeJsonFile';

const main = async () => {
  const scrapingData = await getSejProducts();
  return writeJsonFile(scrapingData);
};
void main();
