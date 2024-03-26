const fs = require("fs");
const axios = require("axios");
const puppeteer = require("puppeteer");
const { API_URL } = require("./const.js");


// Function to fetch website content
async function fetchContent(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
}

// Function to render HTML using Puppeteer
async function renderHTML(url, filename) {
  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser'
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });
    const content = await page.content();
    await browser.close();
    fs.writeFileSync(filename, content);
    console.log(`Rendered ${url} to ${filename}`);
  } catch (error) {
    console.error("Error rendering HTML:", error);
  }
}

// Define website URLs and filenames for pre-rendering
const pagesToRender = [
  { url: `${API_URL}`, filename: "rendered/home.html" },
  { url: `${API_URL}login`, filename: "rendered/login.html" },
  { url: `${API_URL}register`, filename: "rendered/register.html" },
  // Add more pages as needed
];

// Fetch content and render HTML for each page
async function preRenderPages() {
  for (const page of pagesToRender) {
    const content = await fetchContent(page.url);
    if (content) {
      renderHTML(page.url, page.filename);
    }
  }
}
// Start pre-rendering
preRenderPages();
