const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { BOT_PATTERNS } = require("./const.js");
const uaParser = require("ua-parser-js");

app.get("*", (req, res) => {
  console.log(req, "req");
  console.log(req.url, "req.url");
  console.log(req.headers, "req.headers");
  const userAgent = req.headers["user-agent"];
  if (isBot(userAgent)) {
    console.log("Request from a bot:", userAgent);
    let filePath = "";
    if (req.url === "/") {
      filePath = path.resolve(__dirname, `rendered/home.html`);
    } else {
      filePath = path.resolve(__dirname, `rendered${req.url}.html`);
    }
    try {
      // Check if the file exists synchronously
      if (fs.existsSync(filePath)) {
        console.log(`${filePath} exists`);
        res.sendFile(filePath);
      } else {
        console.error(`${filePath} does not exist`);
        res.status(404).send("Not found html file");
      }

    } catch (error) {
      console.error("Error", error);
      res.status(500).send("Internal Server Error");
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
