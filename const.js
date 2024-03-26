const API_URL = "http://localhost:3000";

const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /googlebot/i,
  /bingbot/i,
  /yahoo/i,
  /yandex/i,
  /duckduckgo/i,
  /baiduspider/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /instagram/i,
  /pinterest/i,
  /slackbot/i,
  /telegrambot/i,
  /discordbot/i,
  /applebot/i,
  /adidxbot/i,
  /amazonbot/i,
  /ahrefsbot/i,
  /mj12bot/i,
  /semrushbot/i,
  /rogerbot/i,
  /screaming/i, // for screaming frog
  /phantomjs/i, // for PhantomJS headless browser
];
module.exports = {
  API_URL,
  BOT_PATTERNS,
};
