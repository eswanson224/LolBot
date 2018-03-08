exports.run = (client, message, args) => {
  function yn() {
    let yn = ['yes', 'no']
    return yn[Math.floor(Math.random() * 2)]
  }
  message.channel.send(yn())
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yesno", "yorn"],
  permLevel: "User"
}

exports.help = {
  name: "yn",
  description: "Responds with yes or no",
  usage: "yn"
}
