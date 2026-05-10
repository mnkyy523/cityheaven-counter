const { chromium } = require('playwright');
const fs = require('fs');

(async () => {

  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(
    'https://www.cityheaven.net/tokyo/A1311/A131101/y-versailles/girllist/',
    {
      waitUntil: 'networkidle',
      timeout: 60000
    }
  );

  const text = await page.textContent('body');

  const match = text.match(/(\\d+)人中/);

  const count = match ? match[1] : '取得失敗';

  fs.writeFileSync(
    'count.json',
    JSON.stringify({
      count: count,
      updated: new Date()
    })
  );

  console.log('取得人数:', count);

  await browser.close();

})();
