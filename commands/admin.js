exports.run = (client, message, args) => {
  if (message.mentions.members) {
    client.config.admins[client.config.admins.length + 1] = message.mentions.members.first().id
    message.channel.send(`**${message.mentions.members.first().user.username}** has been added as an admin`)
  } else {
    message.channel.send("Please specify a user")
  }
  
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
}

exports.help = {
  name: "admin",
  description: "Adds a user to the bot admin list.",
  usage: "admin {@User}"
}
