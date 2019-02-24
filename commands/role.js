exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

  var args1 = args.join(" ");
  args1 = args1.replace("@", "");
  const allRoles = client.getAllAssignableRoles();
  var readableRoles = allRoles.forEach(function(roleName) {
    readableRoles +  `**${roleName}** `;
  });
  if (getRoleName(args1) == "NULL")
    return message.channel.send("Please specify a valid role: " + readableRoles + " !role [name]");

  if (args == "")
    return message.channel.send("Please specify a valid role: " + readableRoles + " !role [name]");

  const role = message.guild.roles.find("name", getRoleName(args1));
  args1 = getRoleName(args1);

  if (role == null)
    return message.channel.send(`Are you sure ` + "`" + args1 + "`" + ` is a valid role?`);

  if (!client.config.defaultSettings.enabledRoles.includes(args1))
      return message.channel.send("`" + role.name + "` is not self-assignable. Available roles: " + readableRoles);

  if (message.channel.guild.me.highestRole.comparePositionTo(role) <= 0)
    return message.channel.send("`" + role.name + "` is above my highest role. I cannot set that role.");

  if (!message.channel.permissionsFor(message.guild.me).hasPermission("MANAGE_ROLES_OR_PERMISSIONS"))
    return message.channel.send("I don't have the correct permissions for that!");

  if (!message.member.roles.has(role.id)) {
    message.member.addRole(role).catch(console.error);
    message.channel.send("You now have the `" + role.name + "` role.");
  }

  else {
    message.member.removeRole(role).catch(console.error);
    message.channel.send("You no longer have the `" + role.name + "` role.");
  }

  function getRoleName(str) {
    str = str.toLowerCase();
    switch (str) {
      case "art":
      case "artist":
      case "artists":
        return "Artists";
        break;
      case "map":
      case "mapper"
      case "mapping"
      case "mappers":
        return "Mappers";
        break;
      case "code":
      case "coding":
      case "coder":
      case "programmer":
      case "programming":
      case "programmers":
        return "Programmers";
        break;
      case "testers":
      case "test":
      case "tester":
      case "testing":
        return "Testers";
        break;
      default:
        return "NULL";

    }
  }

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["r", "roles", "add"],
  permLevel: "User"
};

exports.help = {
  name: "role",
  category: "Miscellaneous",
  description: "Give yourself a role. [**Artists**, **Mappers**, **Programmers**, **Testers**]",
  usage: "role [**Artists**, **Mappers**, **Programmers**, **Testers**]"
};
