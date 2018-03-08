const request = require("request")

exports.run = (client, message, args) => {
  request({
    url: 'https://reddit.com/r/surrealmemes/random.json',
    headers: {
      'User-agent': 'lolbot'
    }
  }, function(err, response, body) {
    if (body[0] != '[') {
      message.channel.send('I am having difficulties connecting to reddit, try again later :D')
      return
    }
    if (err) {
      console.log(err)
      return
    }
    let postJson = JSON.parse(body)
    let imgUrl = postJson[0]['data']['children'][0]['data']['url']
    message.channel.send({
      file: imgUrl
    })
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
}

exports.help = {
  name: "meme",
  description: "Gets a random post from r/surrealmemes",
  usage: "meme"
}
