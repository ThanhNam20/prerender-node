const express = require("express");
const app = express();
const path = require("path");

app.get("/", (req, res) => {

  console.log(req.headers, 'req.headers');

  const userAgent = req.headers["user-agent"];
  if (isBot(userAgent)) {
    console.log("Request from a bot:", userAgent);
    // Serve the HTML file for bots
    const filePath = path.resolve(__dirname, './rendered/home.html');  // Replace with the actual path to your HTML file
    console.log(filePath);
    res.sendFile(filePath);

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
    "facebookexternalhit",
    "Twitterbot",
    "LinkedInBot",
    "Slackbot",
    "TelegramBot",
  ];
  // Check if the user agent matches any known bot user agents
  return botUserAgents.some((botAgent) => userAgent.includes(botAgent));
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
