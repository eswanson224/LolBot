exports.run = (client, message, args) => {
  message.channel.send(message.mentions.members.first().id)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
}

exports.help = {
  name: "id",
  description: "Returns a users ID (mainly for debugging)",
  usage: "id {@User}"
}
