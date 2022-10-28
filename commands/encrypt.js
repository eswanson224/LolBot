exports.run = (client, message, args) => {
  function xor(data, key) {
    var output = ''
    for (var i = 0; i < data.length; i++) {
      let c = data.charCodeAt(i)
      let k = key.charCodeAt(i%key.length)
      output += String.fromCharCode(c^k)
    }
    return output
  }

  let key = args[1]
  let data = message.content.substr(message.content.indexOf(' ') + args[1].length + 1)
  let result = new Buffer(xor(data, key)).toString('base64')
  let embed = {
    "description": `Results in an encrypted message that can be decrypted with \u0060.decrypt ${key} ${result}\u0060`,
    "url": "https://discord.gg/cy33kkW",
    "color": 40447,
    "footer": {
      "text": "Don't forget to join The Autistic Dimension at https://discord.gg/cy33kkW"
    },
    "author": {
      "name": "Encryption",
      "url": "https://discord.gg/cy33kkW",
      "icon_url": message.author.avatarURL
    },
    "fields": [
      {
        "name": "Key:",
        "value": `\u0060${key}\u0060`,
        "inline": true
      },
      {
        "name": "Message:",
        "value": `\u0060${data}\u0060`,
        "inline": true
      },
      {
        "name": "Result:",
        "value": `\u0060${result}\u0060`,
        "inline": true
      }
    ]
  }
  message.channel.send(result, {embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e", "ecrypt"],
  permLevel: "User"
}

exports.help = {
  name: "encrypt",
  description: "Encrypts a message with a secret key",
  usage: "encrypt {key} {message}"
}
