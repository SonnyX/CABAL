exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

  var inRole = args.join(" ");
  inRole = inRole.replace("@", "");
  const allRoles = client.getAllAssignableRoles();

  var readableRoles = allRoles.forEach(function(roleName) {
    readableRoles +  `**${roleName}** `;
  });

  // This role is not assignable, as it is not in the assignable role list.
  if (getRoleName(args1) == "NULL")
    return message.channel.send("Please specify a valid role: " + readableRoles + " !role [name]");

  // No role was specified
  if (args == "")
    return message.channel.send("Please specify a valid role: " + readableRoles + " !role [name]");

  // Attempt to find the role on the server.
  const role = message.guild.roles.find("name", getRoleName(inRole));

  inRole = getRoleName(inRole);

  // This role was not found on the server.
  if (role == null)
    return message.channel.send(`Are you sure ` + "`" + inRole + "`" + ` is a valid role?`);

  // This role is not self assignable.
  if (!client.config.defaultSettings.enabledRoles.includes(inRole))
      return message.channel.send("`" + role.name + "` is not self-assignable. Available roles: " + readableRoles);

  // This role is unassignable, due to Discord role hierarchy.
  if (message.channel.guild.me.highestRole.comparePositionTo(role) <= 0)
    return message.channel.send("`" + role.name + "` is above my highest role. I cannot set that role.");

  // The correct permission is not assigned to this bot.
  if (!message.channel.permissionsFor(message.guild.me).hasPermission("MANAGE_ROLES_OR_PERMISSIONS"))
    return message.channel.send("I don't have the correct permissions for that! I need `MANAGE_ROLES_OR_PERMISSIONS`");

  // This role is assignable, they do not have the role, so let's give it to them!
  if (!message.member.roles.has(role.id)) {
    message.member.addRole(role).catch(console.error);
    message.channel.send("You now have the `" + role.name + "` role.");
  } else { // This role is assignable, they do have the role, so let's remove it from them!
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
      case "mapper":
      case "mapping":
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
  category: "Renegade X",
  description: "Give yourself a role.",
  usage: "role [role]"
};
