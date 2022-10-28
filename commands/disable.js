exports.run = (client, message, args) => {
  const cmdToDisable = args[1]

  if (!commands.cmdToDisable) return

  commands.cmdToDisable.conf.enabled = false
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
}

exports.help = {
  name: "disable",
  description: "disables a command",
  usage: "disable {command}"
}
