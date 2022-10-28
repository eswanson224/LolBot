const fs = require('fs')

exports.run = (client, message, args) => {
  const cmdToReload = args[1]

  if (!client.commands.hasOwnProperty(cmdToReload)) return

  delete require.cache[require.resolve(`../commands/${cmdToReload}.js`)]
  let cmdFile = require(`../commands/${cmdToReload}.js`)

  client.commands[cmdToReload] = cmdFile

  message.channel.send(`Looks like the command \u0060${cmdToReload}\u0060 has reloaded with no errors`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
}

exports.help = {
  name: "reload",
  description: "Reloads a command file",
  usage: "reload {command}"
}
