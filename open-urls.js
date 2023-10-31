// run extract-firefoxbookmark-urls.js
require("./extract-firefoxbookmark-urls");

// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const { executablePath } = require("puppeteer");

async function main() {
  // Array of URLs to open in browser tabs
  const urls = require("./urls.json");

  // Launch a browser instance
  const browser = await puppeteer.launch({
    headless: false, // Set this to 'true' if you don't want to see the browser window
    executablePath: executablePath(),
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
    // set no timeout for loading page: { timeout: 0 }
    await page.goto(url, { timeout: 0 });

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
