import { launch } from 'puppeteer';
import { sejProduct } from '../interfaces/sej';

export const getSejProducts = async (): Promise<sejProduct[]> => {
  const browser = await launch();
  const page = await browser.newPage();

  const sejURL = 'https://www.sej.co.jp';
  const thisWeek = '/products/a/thisweek';
  const kanto = '/area/kanto/';
  await page.goto(sejURL + thisWeek + kanto);

  const targetSelector = '.list_inner';
  await page.waitForSelector(targetSelector);

  const items = await page.evaluate((targetSelector: string) => {
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
  await browser.close();
  return items;
};
