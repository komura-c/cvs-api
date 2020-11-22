import cron from 'node-cron';
import { scraper } from './script/scraper';

const scheduler = (): void => {
  console.info('start scheduler');
  cron.schedule('0 6 * * 2', () => {
    void scraper();
  });
};
scheduler();
