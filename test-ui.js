import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
    
    const pageTitle = await page.title();
    console.log('Page Title:', pageTitle);

    // Check if the link list loaded by looking for an <a> tag
    console.log('Waiting for link buttons...');
    await page.waitForSelector('a[target="_blank"]', { timeout: 10000 });
    console.log('Link buttons found on the page.');
    
    // Check the first link button
    const firstLink = await page.$('a[target="_blank"]');
    
    if (firstLink) {
        const href = await page.evaluate(el => el.href, firstLink);
        const text = await page.evaluate(el => el.innerText, firstLink);
        console.log(`Found link: [${text.trim()}] -> ${href}`);
        
        console.log('Simulating a click on the first link...');
        await firstLink.click();
        console.log('Clicked the first link successfully.');
    } else {
        throw new Error("No links found to click!");
    }

    console.log('Taking a screenshot of the main UI...');
    await page.screenshot({ path: 'screenshot.png' });
    console.log('Screenshot successfully saved to screenshot.png');
    
    console.log('Waiting for 3 seconds before closing...');
    await new Promise(r => setTimeout(r, 3000));
    
  } catch (error) {
    console.error('Test failed with error:', error);
    try {
        await page.screenshot({ path: 'error_screenshot.png' });
        console.log('Error screenshot saved to error_screenshot.png');
    } catch (e) {
        console.error('Could not take error screenshot:', e);
    }
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
