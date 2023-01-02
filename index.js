const puppeteer = require("puppeteer");

async function main() {
  // Array of URLs to open in browser tabs
  const urls = [
    "https://www.google.com",
    "https://www.youtube.com",
    "https://www.facebook.com",
    "https://www.twitter.com",
    "https://www.instagram.com",
    "https://www.reddit.com",
    "https://www.linkedin.com",
    "https://www.pinterest.com",
    "https://www.github.com",
    "https://www.stackoverflow.com",
    "https://www.quora.com",
    "https://www.amazon.com",
    "https://www.ebay.com",
    "https://www.alibaba.com",
    "https://www.flipkart.com",
    "https://www.walmart.com",
    "https://www.bestbuy.com",
    "https://www.target.com",
    "https://www.costco.com",
    "https://www.tesco.com",
    "https://www.jd.com",
    "https://www.aliexpress.com",
    "https://www.gearbest.com",
    "https://www.newegg.com",
    "https://www.wish.com",
    "https://www.banggood.com",
    "https://www.dhgate.com",
    "https://www.lightinthebox.com",
    "https://www.miniinthebox.com",
  ];

  // Launch a browser instance
  const browser = await puppeteer.launch({
    headless: false, // Set this to 'true' if you don't want to see the browser window
    defaultViewport: null,
  });

  // Keep track of the number of active tabs
  let activeTabs = 0;

  // Open a new tab for each URL in the array
  for (const url of urls) {
    // Wait until there are fewer than 3 active tabs
    while (activeTabs >= 3) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Open a new tab
    const page = await browser.newPage();
    activeTabs++;

    // keep the focus back to the 1st tab
    const pages = await browser.pages();
    if (pages.length > 0) await pages[0].bringToFront();

    // Navigate to the URL
    await page.goto(url);

    // Close the tab when the user is ready
    page.on("close", () => {
      activeTabs--;
    });
  }

  // Close the browser when all tabs have been closed
  browser.on("disconnected", () => {
    process.exit();
  });
}

main();
