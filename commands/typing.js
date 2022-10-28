exports.run = (client, message, args) => {
  if (args[1].toLowerCase() != "start" && args[1].toLowerCase() != "stop") {
    message.channel.send("Haha loser, u must specify if the bot will \u0060start\u0060 or \u0060stop\u0060")
    console.log(args)
    return
  }
  if (args[1].toLowerCase() == 'start') {
    message.channel.startTyping()
  }
  else if (args[1].toLowerCase() == 'stop') {
    message.channel.stopTyping(true)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["type", "typ"],
  permLevel: "Bot Admin"
}

exports.help = {
  name: "typing",
  description: "Starts or stops typing.",
  usage: "typing {start, stop}"
}
