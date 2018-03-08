exports.run = (client, message, args) => {
  if (args[1]) {
    let stuff = message.content.substr(args[0].length + 1)
    msg.channel.send(`${stuff} is stupid lmao :ok_hand:`)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
}

exports.help = {
  name: "roast",
  description: "Roasts any person you would like",
  usage: "roast {person}"
}
