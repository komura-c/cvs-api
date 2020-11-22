import { getDateAndSetDate } from './getDate';
import { getSejProductsAllInThisWeekByArea } from './scrapingSej';
import { objectToJsonFile } from './toJson';
import areaNameList from './areaNameList.json';
import { existsSync, mkdirSync } from 'fs';

export const scraping = (): void => {
  const today = getDateAndSetDate();
  const areaNameListArray: string[] = Object.entries(areaNameList).map(
    ([, value]) => value
  );
  let count = 0;
  console.info('start');
  const loop = async () => {
    const areaName = areaNameListArray[count];
    const scrapingData = await getSejProductsAllInThisWeekByArea(areaName);
    const dirPath = `src/data/sej_${today}`;
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath);
    }
    objectToJsonFile(scrapingData, dirPath, `sej_${areaName}_${today}.json`);
    count += 1;
    if (count < areaNameListArray.length) {
      void loop();
    }
  };
  void loop();
  console.info('done');
};
