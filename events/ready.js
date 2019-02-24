const http = require("http");

module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  client.user.setActivity("Sarah eat cake", {type: "WATCHING"});

  setInterval(UpdateInfo, 15000);

  function UpdateInfo() {
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
        }
        client.user.setActivity(`${playerCount} players in RenX`, {type: "WATCHING"});
      });
    });
  }
};
