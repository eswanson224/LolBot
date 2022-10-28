const request = require('request')

exports.run = (client, message, args) => {
  request('http://aws.random.cat/meow', function(err, response, body) {
    if (err) {
      console.log(err)
      message.channel.send("There was an error :/")
      return
    }
    let catJson = JSON.parse(body)
    message.channel.send({file: catJson["file"]})
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["c"],
  permLevel: "User"
}

exports.help = {
  name: "cat",
  description: "Gets a random image of a cat",
  usage: "cat"
}
