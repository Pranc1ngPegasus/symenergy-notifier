import { Browser, Page } from 'puppeteer';

export type SymenergyAuthParams = {
  id: string;
  password: string;
  contractId: string;
};

export type SymenergyCrawlResult = {
  usage: number;
};

export class SymenergyCrawler {
  private readonly browser: Browser;
  private readonly id: string;
  private readonly password: string;
  private readonly contractId: string;

  constructor(browser: Browser, authParams: SymenergyAuthParams) {
    this.browser = browser;
    this.id = authParams.id;
    this.password = authParams.password;
    this.contractId = authParams.contractId;
  }

  async login(page: Page) {
    await page.setViewport({ height: 1080, width: 1920 });
    await page.goto('https://www.symenergy.net/symenergy/login', {
      waitUntil: 'domcontentloaded',
    });

    // ID
    await page.waitForSelector('input[name="login_id"]', { visible: true });
    await page.type('input[name="login_id"]', this.id);

    // Password
    await page.waitForSelector('input[name="password"]', { visible: true });
    await page.type('input[name="password"]', this.password);

    // Submit
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async dailyUsage(page: Page): Promise<number> {
    await page.goto(
      `https://www.symenergy.net/symenergy/amounts/${this.contractId}/daily`,
      {
        waitUntil: 'domcontentloaded',
      },
    );

    await page
      .waitForSelector('tr > td:nth-child(2)', { visible: true })
      .catch(async () => {
        await page.screenshot({ path: 'testing-blog.png', fullPage: true });
      });

    let usage = 0;
    const elements = await page.$$('tr > td:nth-child(2)');
    for (const element of elements) {
      const text = await page.evaluate((elm) => elm.innerHTML, element);
      usage += parseFloat(text);
    }

    return usage;
  }

  async crawl(): Promise<SymenergyCrawlResult> {
    const browser = this.browser;
    const page = await browser.newPage();
    await this.login(page);

    const usage: number = await this.dailyUsage(page);

    return { usage: usage };
  }
}
