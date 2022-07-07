import { launch } from 'puppeteer';
import { SymenergyAuthParams, SymenergyCrawler } from './web.crawler';
import { ScanResult } from '../scanner.type';

export class SymenergyScanner {
  private readonly webAuth: SymenergyAuthParams;

  constructor(webAuth: SymenergyAuthParams) {
    this.webAuth = webAuth;
  }

  async scan(): Promise<ScanResult> {
    const browser = await launch();
    const webCrawler = new SymenergyCrawler(browser, this.webAuth);

    const webCrawlResult = await webCrawler.crawl();

    return { status: 'passed', usage: webCrawlResult.usage };
  }
}
