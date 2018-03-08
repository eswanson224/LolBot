exports.run = (client, message, args) => {
  let user = message.mentions.members.first().hasPermission("ADMINISTRATOR")
  message.channel.send(user)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["t"],
  permLevel: "User"
}

exports.help = {
  name: "test",
  description: "A little test command",
  usage: "test"
}
