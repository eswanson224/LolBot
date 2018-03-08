exports.run = (client, message, args) => {
  function xor(data, key) {
    var output = ''
    for (var i = 0; i < data.length; i++) {
      let c = data.charCodeAt(i)
      let k = key.charCodeAt(i % key.length)
      output += String.fromCharCode(c ^ k)
    }
    return output
  }

  let key = args[1]
  let b64data = message.content.substr(message.content.indexOf(args[2]))
  let data = new Buffer(b64data, 'base64').toString('utf8')
  let result = xor(data, key)
  let embed = {
    "description": `Results in a decrypted message`,
    "url": "https://discord.gg/cy33kkW",
    "color": 40447,
    "footer": {
      "text": "Don't forget to join The Autistic Dimension at https://discord.gg/cy33kkW"
    },
    "author": {
      "name": "Decryption",
      "url": "https://discord.gg/cy33kkW",
      "icon_url": message.author.avatarURL
    },
    "fields": [{
        "name": "Key:",
        "value": `\u0060${key}\u0060`,
        "inline": true
      },
      {
        "name": "Encrypted Message:",
        "value": `\u0060${b64data}\u0060`,
        "inline": true
      },
      {
        "name": "Result:",
        "value": `\u0060${result}\u0060`,
        "inline": true
      }
    ]
  };
  message.channel.send(result, {embed})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dcrypt"],
  permLevel: "User"
}

exports.help = {
  name: "decrypt",
  description: "Decrypts an encrypted message with the secret key",
  usage: "decrypt {key} {message}"
}
