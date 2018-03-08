exports.run = (client, message, args) => {
  var cmdMsg = "\u0060\u0060\u0060"
  if (!args[1]) {
    for (cmd in client.commands) {
      cmdMsg += `.${client.commands[cmd].help.usage} - ${client.commands[cmd].help.description}\n`
    }
    cmdMsg += "\u0060\u0060\u0060"
    message.channel.send(cmdMsg)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
}

exports.help = {
  name: "help",
  description: "Lists all commands or gives information about one",
  usage: "help [command]"
}
