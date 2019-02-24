module.exports = (client, oldMember, newMember) => {
  const blacklist = require("../blacklist.json");
  const fs = require("fs");

  if (oldMember.roles.find("name", "Mute") && !newMember.roles.find("name", "Mute")) // If the role was removed, remove them from the array.
  {
    if (blacklist.muted.includes(newMember.id))
    {
      console.log(`Removing ${newMember.displayName} from the mute list.`);
      var newArray = blacklist.muted.filter(function(e) { return e !== newMember.id; }); // Removes the member from the array.
      var newList = {};
      newList["muted"] = newArray;
      JSON.stringify(newList);
      fs.writeFile("../blacklist.json", newList, (err) => {
        if (err) console.log(err);

        console.log(`Added ${newMember.displayName} to the mute list.`);
      });
    }
  }

  if (!oldMember.roles.find("name", "Mute") && newMember.roles.find("name", "Mute")) // If the role was just added, add them to the array.
  {
    console.log(`Adding ${newMember.displayName} to the mute list.`);
    var newArray2 = blacklist.muted.push(newMember.id); // Adds the member to the array.
    var newList2 = {};
    newList2["muted"] = newArray2;
    console.log(newList2);
    console.log(newArray2);
    JSON.stringify(newList2);
    fs.writeFile("../blacklist.json", newList2, (err) => {
      if (err) console.log(err);

      console.log(`Added ${newMember.displayName} to the mute list.`);
    });
  }
};
