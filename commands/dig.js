exports.run = (client, message, args) => {
  if (!client.dig[message.author.id]) {
    client.dig[message.author.id] = {
      cooldown: Date.now()
    }
  }
  const objects = {"Common": {emote: ":urn:", name: "Potty boi"}, "Uncommon": {emote: ":gem:", name: "Hard pointy thing"}, "Rare": {emote: ":bathtub:", name: "Big water holder"}, "Legendary": {emote: "<:yod:420024599208525824>", name: "yes"}}
  let chance = Math.floor(Math.random() * 1000)
  var dugObject = ""
  if (chance < 5) {
    dugObject = "Legendary"
  } else if (chance < 100 && chance >= 5) {
    dugObject = "Rare"
  } else if (chance < 500 && chance >= 20) {
    dugObject = "Uncommon"
  } else {
    dugObject = "Common"
  }
  message.channel.send(`:pick: | **${client.users.get(message.author.id).username} you dug up a ${dugObject.toLowerCase()} ${objects[dugObject].name} ${objects[dugObject].emote}!**`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["d"],
  permLevel: "User"
}

exports.help = {
  name: "dig",
  description: "Dig some stuff",
  usage: "dig"
}
