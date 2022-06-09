"use-strict";
const { sendWebhook } = require("./discord.js");
const { getAnalytics } = require("./price.js");
const { getOptions } = require("./options.js");
const { SystemChannelFlags } = require("discord.js");
const { read } = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const displayPrice = async (crypto) => {
  const info = await getAnalytics(crypto);
  console.log("Crypto Price Monitor");
  console.log();
  console.log(
    "Crypto Name: " +
      info.name +
      "   Date: " +
      new Date().toLocaleDateString() +
      "      Time: " +
      new Date().toLocaleTimeString()
  );
  console.log(
    "Price:       $" +
      info.price +
      "   24H High: $" +
      info.hourHigh +
      "  24H Low: $" +
      info.hourLow
  );
  console.log(
    "ATH:         $" +
      info.allTime +
      "   ATH Change:  " +
      info.allTimeChange +
      "%"
  );

  console.log();
  console.log("Developed by Rohan Mathew.");

  sendWebhook(info);
};

const displayChoices = async (answer) => {
  if (answer === "O" || answer === "o") {
    console.log("Press E to exit");
    console.log("Press S to show 50 crypto ID's");
    readline.question("Pick an option. \n", (answer) => {
      options(answer);
    });
  } else {
    displayPrice(answer);
    readline.close();
  }
};

const options = async (answer) => {
  if (answer === "E" || answer === "e") {
    console.log("Goodbye!");
    process.exit(1);
  } else if (answer === "S" || answer === "s") {
    console.log("Displaying 50 crypto ID's.");
    await getOptions();
    promptUser();
  }
};

const promptUser = async () => {
  readline.question(
    "What crypto would you like to see? Press o for options. \n",
    (answer) => {
      displayChoices(answer);
    }
  );
  return true;
};

const flow = async () => {
  let finish = await promptUser();
};

flow();
