const http = require("http");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  http.get({
    host: "serverlist.renegade-x.com",
    path: "/servers.jsp"
  }, function(response) {
    // Continuously update stream with data
    var body = "";
    response.on("data", function(d) {
      body += d;
    });
    response.on("end", function() {
      // Data reception is done, do whatever with it!
      var parsed = JSON.parse(body);
      let playerCount = 0;

      for (let i = 0; i < parsed.length; i++)
      {
        playerCount += parsed[i].Players;
        console.log(playerCount);
      }
      message.channel.send(`Current players in RenX: \`${playerCount}\``);
    });
  });
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["pl"],
  permLevel: "User"
};

exports.help = {
  name: "playerlist",
  category: "RenX",
  description: "Gets the current playercount of RenX.",
  usage: "playerlist"
};
