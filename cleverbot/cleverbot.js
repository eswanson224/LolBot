const request = require('request')

exports.run = (client, message, args) => {
  let send = message.content.substr(message.content.indexOf(' ') + 1)
  let cs = ""
  if (send == "") {
    message.channel.send("Please provide a message!")
    return
  }
  if (client.cs[message.guild.id]) {
    cs = client.cs[message.guild.id]
  }
  request(`https://www.cleverbot.com/getreply?key=${client.key}&input=${send}&cs=${cs}`, function(err, response, body) {
    if (err) {
      console.log(err)
      message.channel.send("I'm sorry, there was an error")
      return
    }
    let bodyJSON = JSON.parse(body)
    client.cs[message.guild.id] = bodyJSON["cs"]
    message.channel.send(bodyJSON["output"])
  })
}
