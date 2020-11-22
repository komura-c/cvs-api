import cron from 'node-cron';
import { scraping } from './script/scraper';

export const scheduler = cron.schedule('0 6 * * 2', () => {
  void scraping();
});
