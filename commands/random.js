exports.run = (client, message, args) => {
  function getRanWord() {
    var fin = ""
    for (i = 0; i < client.amount[message.guild.id]; i++) {
      fin += client.words[Math.floor(Math.random() * client.words.length)] + " "
    }
    return fin
  }
  message.channel.send(getRanWord())
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rand"],
  permLevel: "User"
}

exports.help = {
  name: "random",
  description: "Sends random words",
  usage: "random"
}
