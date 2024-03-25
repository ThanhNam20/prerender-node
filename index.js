const express = require("express");
const app = express();
const path = require("path");
const uaParser = require('ua-parser-js');

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
  const parsedUserAgent = uaParser(userAgent);

  console.log(parsedUserAgent, 'parsedUserAgent');

  return parsedUserAgent.device.type === 'bot';
}


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
