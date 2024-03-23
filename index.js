const express = require("express");
const app = express();

app.get("/", (req, res) => {
  const userAgent = req.headers["user-agent"];
  if (isBot(userAgent)) {
    console.log("Request from a bot:", userAgent);
    // Handle bot request
    res.send("Hello, bot!");
  } else {
    console.log("Request from a regular user:", userAgent);
    // Handle regular user request
    res.send("Hello, user!");
  }
});

function isBot(userAgent) {
  // Define a list of known bot user agents
  const botUserAgents = [
    "Googlebot",
    "Bingbot",
    "YandexBot",
    "DuckDuckBot",
    "Baiduspider",
    "FacebookExternalHit",
    "Twitterbot",
    "LinkedInBot",
    "Slackbot",
    "TelegramBot",
    // Add more bot user agents as needed
  ];
  // Check if the user agent matches any known bot user agents
  return botUserAgents.some((botAgent) => userAgent.includes(botAgent));
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
