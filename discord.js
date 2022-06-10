"use strict";

const { MessageEmbed, WebhookClient } = require("discord.js");

const webhookClient = new WebhookClient({
  url:
    "your-discord-webhook-url",
});

const pickColor = async (info) => {
  let color;
  if (info.allTimeChange > 0) {
    color = "#90ee90";
  } else {
    color = "#FF0000";
  }
  return color;
};

const sendWebhook = async (info) => {
  const color = await pickColor(info);
  const embed = new MessageEmbed()
    .setColor(color)
    .setAuthor({
      name: `Price of ${info.name}`,
    })
    .setThumbnail(info.imgUrl)
    .addFields(
      { name: "Current Price", value: `$${info.price}` },
      { name: "24 Hour High", value: `$${info.hourHigh}`, inline: true },
      { name: "24 Hour Low", value: `$${info.hourLow}`, inline: true }
    )
    .addFields(
      { name: "All Time High", value: `$${info.allTime}`, inline: true },
      { name: "All Time High", value: `$${info.allTime}`, inline: true },
      {
        name: "All Time High Change",
        value: `${info.allTimeChange}%`,
        inline: true,
      }
    )
    .setTimestamp()
    .setFooter({
      text: "Developed by Rohan Mathew",
    });
  const send = await webhookClient.send({
    username: "Crypto Monitor",
    embeds: [embed],
  });
  if (send) {
    console.log();
    console.log("Successfully Sent Webhook!");
  } else {
    console.error(error);
  }
};

module.exports = {
  sendWebhook,
};
