import { getDateAndSetDate } from './script/getDate';
import { getSejProductsAllInThisWeekByArea } from './script/scrapingSej';
import { objectToJsonFile } from './script/toJson';
import areaNameList from './areaNameList.json';

const app = () => {
  const today = getDateAndSetDate();
  const areaNameListArray: string[] = Object.entries(areaNameList).map(
    ([, value]) => value
  );
  let count = 0;
  console.info('start');
  const loop = async () => {
    const areaName = areaNameListArray[count];
    const scrapingData = await getSejProductsAllInThisWeekByArea(areaName);
    objectToJsonFile(scrapingData, 'sej_' + areaName + today + '.json');
    count += 1;
    if (count < areaNameListArray.length) {
      void loop();
    }
  };
  void loop().then(() => {
    console.info('done');
  });
};
void app();
