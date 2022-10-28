const request = require('request')

exports.run = (client, message, args) => {
  var Jbody = {}
  var podlist = ""
  message.channel.send("Getting info...")
    .then(async (msg) => {
      response = await request(`http://api.wolframalpha.com/v1/query?appid=GXL4LU-4G99HU5TL6&input=${message.content.slice(8)}&output=json`)
      Jbody = JSON.parse(body)
      for (var i = 0; i < Jbody['queryresult']['pods'].length; i++) {
        podlist += `${i + 1}. \u0060${pod['title']}\u0060, `
      }
      msg.edit(`${Jbody['queryresult']['numpods']} pods found: ${podlist.slice(0,-2)}`)
    })

  const filter = m => (m.author.id == message.author.id)
  channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']})
    .then(respose => {
      chioce = response.first.content.split(' ')[0]
      if (isNaN(choice)) {
        Jbody['queryresult']['pods'].forEach(pod => {
          console.log(pod)
        })
      }
      else {

      }
    })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
}

exports.help = {
  name: "wolfram",
  description: "desc",
  usage: "use"
}
