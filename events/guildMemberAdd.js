// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getGuildSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  const mutedUsers = require("../blacklist.json");

  if (mutedUsers.muted.includes(member.id))
  {
    member.addRole(member.guild.roles.find("name", "Mute")).catch(console.error);
    console.log(`${member.displayName} was found in the mute list, attempting to mute them.`);
  }

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  if (settings.welcomeEnabled !== "true") return;
  member.guild.channels.find(c => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
