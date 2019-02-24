module.exports = (message) => {
  // Log that the bot is online.
  client.logger.log(`${message.content}#${message.id} was just deleted.`);
  if (message.guild.id != "362038716870688771") return;

  const chan = client.guilds.get("362038716870688771").channels.get("510527961020235778");

  chan.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Message Deleted",
    description: " ",
    fields: [{
        name: "Author",
        value: `${message.author.username}#${message.author.tag} (${message.author.id})`
      },
      {
        name: "Content",
        value: `${message.content}`
      },
      {
        name: "Channel",
        value: `${message.channel.name}`
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "CABAL Monitoring Systems"
    }
  }
});
};
