import { launch, Page } from 'puppeteer';
import { sejProduct } from '../interfaces/sej';

const sejURL = 'https://www.sej.co.jp';
const thisWeek = '/products/a/thisweek';
const targetSelector = '.list_inner';

export const getSejProductsAllInThisWeekByArea = async (
  ariaName: string
): Promise<sejProduct[]> => {
  const browser = await launch();
  const page = await browser.newPage();
  const ariaURL = '/area/' + ariaName + '/1/l100/';
  const firstPageURL = sejURL + thisWeek + ariaURL;
  console.info('firstPageURL: ' + firstPageURL);
  await page.goto(firstPageURL);
  await page.waitForTimeout(3000);
  let items = await getSejProducts(page, targetSelector);
  items = await getNextProducts(page, items);
  await browser.close();
  return items;
};

const getSejProducts = async (
  page: Page,
  targetSelector: string
): Promise<sejProduct[]> => {
  return await page.evaluate((targetSelector: string) => {
    const itemElements = Array.from(document.querySelectorAll(targetSelector));
    return itemElements.map((itemElement: Element) => {
      const detailElement = itemElement.querySelector('.detail');
      const title = detailElement?.querySelector('.item_ttl p a')?.textContent;
      const price = detailElement?.querySelector('.item_price p')?.textContent;
      const URLElement = itemElement.querySelector('figure a');
      const itemURL = URLElement?.getAttribute('href');
      const thumbnailURL = URLElement?.querySelector('img')?.getAttribute(
        'data-original'
      );
      return {
        title,
        price,
        itemURL,
        thumbnailURL,
      };
    });
  }, targetSelector);
};

const getNextProducts = async (
  page: Page,
  items: sejProduct[]
): Promise<sejProduct[]> => {
  const nextPageURL = await page.evaluate(() => {
    const pagerElement = document.querySelectorAll('.pager ul li a');
    const nextButton = Array.from(pagerElement).filter((element: Element) => {
      return element?.textContent === '［次へ］';
    });
    return nextButton[0]?.getAttribute('href');
  });
  if (nextPageURL) {
    console.info('nextPageURL: ' + nextPageURL);
    await page.goto(sejURL + nextPageURL, { waitUntil: 'networkidle0' });
    await page.waitForTimeout(3000);
    const nextItems = await getSejProducts(page, targetSelector);
    items = items.concat(nextItems);
    await getNextProducts(page, items);
  }
  return items;
};
