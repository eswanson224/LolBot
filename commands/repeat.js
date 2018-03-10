exports.run = (client, message, args) => {
  let repeat = message.content.substr(message.content.indexOf(' ') + 1)
  if (repeat.length > 0) {
    message.channel.send(repeat)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["r", "rep"],
  permLevel: "Bot Admin"
}

exports.help = {
  name: "repeat",
  description: "Makes the bot repeat a message",
  usage: "repeat {message}"
}
