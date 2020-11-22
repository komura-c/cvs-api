import { getDateAndSetDate } from './getDate';
import { getSejProductsAllInThisWeekByArea } from './scrapingSej';
import { objectToJsonFile } from './toJson';
import areaNameList from './areaNameList.json';

export const scraper = (): Promise<void> => {
  const today = getDateAndSetDate();
  const areaNameListArray: string[] = Object.entries(areaNameList).map(
    ([, value]) => value
  );
  let count = 0;
  const loop = async (): Promise<void> => {
    const areaName = areaNameListArray[count];
    const scrapingData = await getSejProductsAllInThisWeekByArea(areaName);
    const dirPath = `src/data/sej_${today}/`;
    const filePath = `sej_${areaName}_${today}.json`;
    objectToJsonFile(scrapingData, dirPath, filePath);
    count += 1;
    if (count < areaNameListArray.length) {
      return loop();
    }
  };
  return loop();
};
