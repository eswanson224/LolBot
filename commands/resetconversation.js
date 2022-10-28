exports.run = (client, message, args) => {
  client.cs[message.guild.id] = ""
  message.channel.send("CleverBot conversation has been reset")
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rconversation", "rc"],
  permLevel: "User"
}

exports.help = {
  name: "resetconversation",
  description: "Resets CleverBots current conversation state.",
  usage: "resetconversation"
}
