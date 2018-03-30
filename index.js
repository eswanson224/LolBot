const Discord = require('discord.js')
const client = new Discord.Client()

const chalk = require('chalk')
const req = require('request')
const fs = require('fs')
const mysql = require('mysql')
const request = require('request')

const prefix = "."

client.amount = JSON.parse(fs.readFileSync("./amount.json", "utf8"))
client.dig = JSON.parse(fs.readFileSync("./dig.json", "utf8"))
//const requests = JSON.parse(fs.readFileSync("./requests.json", "utf8"))
//const payday = JSON.parse(fs.readFileSync("./payday.json", "utf8"))
let users = JSON.parse(fs.readFileSync("./users.json", "utf8"))

client.words = fs.readFileSync("./words.txt", "utf8").split(/\r?\n/)

const payCooldown = 900000
const payAmount = 300

//require('./functions.js')()
client.config = require('./config.js')

client.commands = {}
client.aliases = {}

fs.readdir("./commands", (err, files) => {
  if (err) return console.error(err)
  files.forEach(f => {
    let command = require(`./commands/${f}`)
    console.log(chalk`{blue Loaded command ${command.help.name}}`)
    client.commands[command.help.name] = command
    if (command.conf.aliases) {
      command.conf.aliases.forEach(a => {
        client.aliases[a] = command.help.name
      })
    }
  })
})

client.on('ready', () => {
  console.log(chalk`{green \nBot is now online :D}`)
  client.user.setGame('https://discord.gg/cy33kkW')
})

client.on('message', message => {
  if (message.author.bot) return

  if (message.channel.type == 'dm') return

  const oof = new Discord.Attachment('./oof.jpg', 'oof.jpg')

  if (!client.amount[message.guild.id]) {
    client.amount[message.guild.id] = 3

    fs.writeFile("./amount.json", JSON.stringify(client.amount), (err) => {
      if (err) console.error(err)
    })
  }

  const args = message.content.split(" ")

  users = JSON.parse(fs.readFileSync("./users.json", "utf8"))

  var same = 0

  for (var i = 0; i < args[0].length; i++) {
    let chars = args[0].split('')
    let payday = '.payday'.split('')
    if (chars[i].toLowerCase() == payday[i]) {
      same++
    }
  }

  const command = args[0]

  if (!command.startsWith(prefix)) return

  const cmd = client.commands[command.substr(1)] || client.commands[client.aliases[command.substr(1)]]

  if (!cmd) return

  if (client.config.permLevels[cmd.conf.permLevel].check(message)) {
    try {
      cmd.run(client, message, args)
    }
    catch (err) {
      message.channel.send("I'm sorry, there was an error.\nIf you have any questions or concerns please send a message to Moist")
      client.users.get('193215265998110720').send(`Error: \u0060${err}\u0060 \nMessage: \u0060${message.content}\u0060 \nAuthor: \u0060${message.author.username}, ${message.author.id}\u0060`)
      console.log(chalk`\n{bold.red Error:} ${err} \n{yellow Message:} ${message.content} \n{yellow Author:} ${message.author.username}, ${message.author.id}`)
    }
  }
  else message.channel.send(`You do not have the permission \u0060${cmd.conf.permLevel}\u0060 required to run this command`)

/*
  if (args[0].toLowerCase() == 'oof'){
    if ((Math.floor(Math.random() * 99) + 1) <= 15) {
      msg.channel.send(oof)
    }
  }

  if (same >= 6 && args[0].split('')[0] == '.') {
    msg.channel.send('I am sorry, the command `.payday` has been temporarily disabled')
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
*/

})


client.login('Mzc2MjA1NTAyMTAwNTM3MzU2.DN7AMA.QtazoBVFw_iGVqEJLNVKCFCkEKA') //bot
//client.login('MTkzMjE1MjY1OTk4MTEwNzIw.DMbDgQ.BgDrCMsyz02--zb_xinfFz-I91w') //me
