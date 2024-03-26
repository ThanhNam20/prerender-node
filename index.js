const express = require("express");
const app = express();
const path = require("path");
const { BOT_PATTERNS } = require("./const.js");
const uaParser = require("ua-parser-js");

app.get("/*", (req, res) => {
  console.log(req.url, "req");
  console.log(req.headers, "req.headers");
  const userAgent = req.headers["user-agent"];
  if (isBot(userAgent)) {
    console.log("Request from a bot:", userAgent);
    const filePath = path.resolve(__dirname, `rendered${req.url}.html`);

    try {
      if (filePath) {
        console.log(filePath, "filePath");
        res.sendFile(filePath);
      }
    } catch (error) {
      console.error("Error sending file:", error);
      res.send("Error rendering page");
    }
  } else {
    console.log("Request from a regular user:", userAgent);
    res.send("Hello, World!");
  }
});

function isBot(userAgent) {
  // Check user-agent header
  if (userAgent) {
    for (const pattern of BOT_PATTERNS) {
      if (pattern.test(userAgent)) {
        return true;
      }
    }
  }
  return false;
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
