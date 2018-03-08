const fs = require('fs')

exports.run = (client, message, args) => {
  function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10))
  }
  if (isInt(args[1])) {
      client.amount[message.guild.id] = args[1]

      message.channel.send("Word amount succesfully set to " + args[1])

      fs.writeFile("../amount.json", JSON.stringify(client.amount), (err) => {
        if (err) console.error(err)
      })
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["w", "word"],
  permLevel: "Administrator"
}

exports.help = {
  name: "words",
  description: "Sets the amount of random words for the server",
  usage: "words {amount}"
}
