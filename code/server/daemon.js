forever = require("forever");

console.log("Starting Veryphone server daemon...");
forever.startDaemon ("veryphone.js");
