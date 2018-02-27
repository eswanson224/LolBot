const Discord = require('discord.js')
const client = new Discord.Client

const req = require('request')
const fs = require('fs')
const mysql = require('mysql')
const request = require('request')

const amount = JSON.parse(fs.readFileSync("./amount.json", "utf8"))
const requests = JSON.parse(fs.readFileSync("./requests.json", "utf8"))
const payday = JSON.parse(fs.readFileSync("./payday.json", "utf8"))
let users = JSON.parse(fs.readFileSync("./users.json", "utf8"))

var words

fs.readFile('words.txt', 'utf8', function(err, data) {
  if (err) throw err
  words = data
})

const payCooldown = 900000
const payAmount = 300

client.on('ready', () => {
  console.log('Bot is now online :D')
  client.user.setGame('https://discord.gg/cy33kkW')
})

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10))
}

client.on('message', msg => {
  if (msg.author.bot) return

  if (msg.channel.type == 'dm') return

  const oof = new Discord.Attachment('./oof.jpg', 'oof.jpg')

  if (!amount[msg.guild.id]) {
    amount[msg.guild.id] = 3

    fs.writeFile("./amount.json", JSON.stringify(amount), (err) => {
      if (err) console.error(err)
    })
  }

  const args = msg.content.split(/ +/g)
  const thing = words.split(/\r?\n/)

  users = JSON.parse(fs.readFileSync("./users.json", "utf8"))

  function commandIs(command, rank) {
    if (args[0].toLowerCase() == '.' + command) {
      if (rank) {
        if (users[msg.author.id] && users[msg.author.id].rank >= rank) {
          return 2
        } else {
          return 1
        }
      } else {
        return 2
      }
    }
  }

  function getRanWord() {
    var fin = ""
    for (i = 0; i < amount[msg.guild.id]; i++) {
      fin += thing[Math.floor(Math.random() * thing.length)] + " "
    }
    return fin
  }

  function yn() {
    let yn = ['yes', 'no']
    return yn[Math.floor(Math.random() * 2)]
  }

  function s(amount) {
    if (amount != 1) return 's'
    else return ''
  }

  function sort(collection) {
    var arr = []
    for (var i in collection) {
      arr.push({'id':i, 'amount':collection[i].amount})
    }
    arr.sort(function(a, b){return b.amount - a.amount})
    return arr
  }

  function xor(data, key) {
    var output = ''
    for (var i = 0; i < data.length; i++) {
      let c = data.charCodeAt(i)
      let k = key.charCodeAt(i%key.length)
      output += String.fromCharCode(c^k)
    }
    return output
  }

  var same = 0

  for (var i = 0; i < args[0].length; i++) {
    let chars = args[0].split('')
    let payday = '.payday'.split('')
    if (chars[i].toLowerCase() == payday[i]) {
      same++
    }
  }

  if (commandIs('help')) {
    msg.channel.send('```.repeat <message> (only for the moist and the long)\n.words <word amount>\n.payday\n.balance (or .bal) [user] (optional)\n.id <@user>```')
  }

  if (commandIs('repeat', 2) == 2) {
    let repeat = msg.content.substr(msg.content.indexOf(' ') + 1)
      if (repeat.length > 0) {
        msg.channel.send(repeat)
      } else {
        msg.channel.send('```.repeat <message>\n\nFor the moist and the long to exploit lol.```')
      }
  } else if (commandIs('repeat', 2) == 1){
  msg.channel.send('The `.repeat` command is only for the moist and the long.')
  }

  if (commandIs('words')) {
    if (isInt(args[1])) {
      amount[msg.guild.id] = args[1]

      msg.channel.send("Word amount succesfully set to " + args[1])

      fs.writeFile("./amount.json", JSON.stringify(amount), (err) => {
        if (err) console.error(err)
      })
    } else {
      msg.channel.send('```.words <number>\n\nBot sets the word amount for the server.```')
    }
  }

  if (args[0] == '<@!376205502100537356>' || args[0] == '<@376205502100537356>') {
    if (args[1] && args[1].toLowerCase() == 'yn') {
      msg.channel.send(yn())
    } else {
      msg.channel.send(getRanWord())
    }
  }

  if (args[0].toLowerCase() == 'oof'){
    if ((Math.floor(Math.random() * 99) + 1) <= 15) {
      msg.channel.send(oof)
    }
  }

  if (same >= 6 && args[0].split('')[0] == '.') {
    msg.channel.send('I am sorry, the command `.payday` has been temporarily disabled')
    /*
    if (!payday[msg.author.id]) {
      payday[msg.author.id] = {
        amount: payAmount,
        cooldown: Date.now()
      }
      msg.channel.send(`<@${msg.author.id}> ${payAmount} credits have been added to your balance`)
    } else if (payday[msg.author.id].cooldown + payCooldown < Date.now()) {
      payday[msg.author.id].amount += payAmount
      payday[msg.author.id].cooldown = Date.now()
      msg.channel.send(`<@${msg.author.id}> ${payAmount} credits have been added to your balance`)
    } else {
      let waitTimeMil = payday[msg.author.id].cooldown + payCooldown - Date.now()
      let waitTimeSec = Math.round(waitTimeMil / 1000)
      let waitTimeMin = Math.floor(waitTimeSec / 60)
      let waitTimeSecLeft = waitTimeSec - waitTimeMin * 60
      if (waitTimeMin > 0) {
        msg.channel.send(`<@${msg.author.id}> please wait ${waitTimeMin} minute${s(waitTimeMin)} and ${waitTimeSecLeft} second${s(waitTimeSecLeft)} before collecting your next payday`)
      } else if (waitTimeMin == 0) {
        msg.channel.send(`<@${msg.author.id}> please wait ${waitTimeSecLeft} second${s(waitTimeSec)} before collecting your next payday`)
      }
    }
    fs.writeFile("./payday.json", JSON.stringify(payday), (err) => {
      if (err) console.error(err)
    })
    */
  }

  if (commandIs('balance') || commandIs('bal')) {
    if (msg.mentions.users.array()[0]) {
      if (payday[msg.mentions.users.array()[0].id]) {
        msg.channel.send(`<@${msg.mentions.users.array()[0].id}> has ${payday[msg.mentions.users.array()[0].id].amount} credits`)
      } else {
        msg.channel.send('This user has not used the payday command yet')
      }
    } else if (payday[msg.author.id]) {
      msg.channel.send(`<@${msg.author.id}> you have ${payday[msg.author.id].amount} credits`)
    } else {
      msg.channel.send('You have not used the payday command yet')
    }
  }

  if (commandIs('add', 3) == 2) {
    if (isInt(args[2]) && msg.mentions.users.array()[0].id) {
      payday[msg.mentions.users.array()[0].id].amount += parseInt(args[2], 10)
      msg.channel.send(`${args[2]} credit${s(args[2])} has been added to <@${msg.mentions.users.array()[0].id}>'s account`)
      fs.writeFile("./payday.json", JSON.stringify(payday), (err) => {
        if (err) console.error(err)
      })
    }
  } else if (commandIs('add', 3) == 1) {
    msg.channel.send('The `.add` command is only for the moist to exploit the pay system.')
  }

  if (commandIs('sub', 3) == 2) {
    if (isInt(args[2]) && msg.mentions.users.array()[0].id) {
      payday[msg.mentions.users.array()[0].id].amount -= parseInt(args[2], 10)
      msg.channel.send(`${args[2]} credit${s(args[2])} has been removed from <@${msg.mentions.users.array()[0].id}>'s account`)
      fs.writeFile("./payday.json", JSON.stringify(payday), (err) => {
        if (err) console.error(err)
      })
    }
  } else if (commandIs('sub', 3) == 1) {
    msg.channel.send('The `.sub` command is only for the moist to exploit the pay system.')
  }

  if (commandIs('id')) {
    if (msg.mentions.members.first()) {
      msg.channel.send(msg.mentions.members.first().id)
    } else {
      msg.channel.send('```.id <@user>\n\nGets the id of a user, only used for command perms.```')
    }
  }

  if (commandIs('leaderboard') || commandIs('board')) {
    let arr = sort(payday)
    var top = arr
    var topMsg = '\u0060\u0060\u0060py\n'
    for (var i = 0; i < 10; i++) {
      topMsg += `${i + 1} ${client.users.get(top[i].id).username}: ${top[i].amount} credits\n`
    }
    topMsg += '\u0060\u0060\u0060'
    msg.channel.send(topMsg)
  }

  if (commandIs('cat')) {
    request('http://random.cat/meow', function(err, response, body) {
      if (err) {
        console.log(err)
      }
      let catJson = JSON.parse(body)
      let catImg = new Discord.Attachment(catJson["file"])
      msg.channel.send(catImg)
    })
  }

  if (commandIs('roast')) {
    if (args[1]) {
      args.splice(0, 1)
      let join = args.join(' ')
      msg.channel.send(`${join} is stupid lmao :ok_hand:`)
    } else {
      msg.channel.send('```.repeat <message>\n\nFor the moist and the long to exploit lol.```')
    }
  }

  if (commandIs('payban', 3) == 1) {

  }

  if (commandIs('surreal') || commandIs('meme')) {
    request({url: 'https://reddit.com/r/surrealmemes/random.json', headers: {'User-agent': 'lolbot'}}, function(err, response, body) {
      if (body[0] != '['){
        console.log(body)
        msg.channel.send('I am having difficulties connecting to reddit, try again later :D')
        return
      }
      if (err) {
        console.log(err)
        return
      }
      let postJson = JSON.parse(body)
      let imgUrl = postJson[0]['data']['children'][0]['data']['url']
      let memeImg = new Discord.Attachment(imgUrl)
      msg.channel.send(memeImg)
    })
  }

  if (commandIs('thinking') || commandIs('think')) {
    request({url: 'https://www.reddit.com/r/Thinking/random/.json', headers: {'User-agent': 'lolbot'}}, function(err, response, body) {
      if (body[0] != '['){
        console.log(body)
        msg.channel.send('I am having difficulties connecting to reddit, try again later :D')
        return
      }
      if (err) {
        console.log(err)
        return
      }
      let postJson = JSON.parse(body)
      let imgUrl = postJson[0]['data']['children'][0]['data']['url']
      let memeImg = new Discord.Attachment(imgUrl)
      msg.channel.send(memeImg)
    })
  }

  if (commandIs('math') && args[1]) {
    msg.channel.send('Most likely not 9')
  }

  if (commandIs('encrypt')) {
    let key = args[1]
    let data = msg.content.substr(msg.content.indexOf(args[1]) + args[1].length + 1)
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
        "icon_url": msg.author.avatarURL
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
          "name": "Result",
          "value": `\u0060${result}\u0060`,
          "inline": true
        }
      ]
    };
    msg.channel.send({embed})
  }

  if (commandIs('decrypt')) {
    let key = args[1]
    let b64data = msg.content.substr(msg.content.indexOf(args[2]))
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
        "icon_url": msg.author.avatarURL
      },
      "fields": [
        {
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
          "name": "Result",
          "value": `\u0060${result}\u0060`,
          "inline": true
        }
      ]
    };
    msg.channel.send({embed})
  }

})


client.login('Mzc2MjA1NTAyMTAwNTM3MzU2.DN7AMA.QtazoBVFw_iGVqEJLNVKCFCkEKA') //bot
//client.login('MTkzMjE1MjY1OTk4MTEwNzIw.DMbDgQ.BgDrCMsyz02--zb_xinfFz-I91w') //me
