const http = require("http");

exports.GetPlayerCount = () => {
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
      return playerCount;
    });
  });
};
