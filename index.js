const Discord = require('discord.js')
const client = new Discord.Client

const req = require('request')
const fs = require('fs')

const amount = JSON.parse(fs.readFileSync("./amount.json", "utf8"))

var words

fs.readFile('words.txt', 'utf8', function(err, data) {
  if (err) throw err
  words = data
})

client.on('ready', () => {
  console.log('Bot is now online :D')
  client.user.setGame('Your Mom Lol')
})

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10))
}

client.on('message', msg => {
  if (msg.author.bot) return

  if (msg.channel.type == 'dm') {
    return
  }

  if (!amount[msg.guild.id]) {
    amount[msg.guild.id] = {
      amount: 3
    }

    fs.writeFile("./amount.json", JSON.stringify(amount), (err) => {
      if (err) console.error(err)
    })
  }

  var chance = 100 //For stuff later

  const args = msg.content.split(/ +/g)
  const thing = words.split(/\r?\n/)

  if (args[0].toLowerCase() == '.words') {
    if (isInt(args[1])) {
      amount[msg.guild.id].amount = args[1]

      msg.channel.send("Word amount succesfully set to " + args[1])

      fs.writeFile("./amount.json", JSON.stringify(amount), (err) => {
        if (err) console.error(err)
      })
    }
  }

function getRanWord() {
  var fin = ""
  for (i = 0; i < amount[msg.guild.id].amount; i++) {
    fin += thing[Math.floor(Math.random() * thing.length)] + " "
  }
  return fin
}

if (msg.content.startsWith('<@!376205502100537356>') || msg.content.startsWith('<@376205502100537356>')) {
  if ((Math.floor(Math.random() * 99) + 1) <= chance) {
    console.log()
    msg.channel.send(getRanWord())
  } else {
    return
  }
}
})

client.login('Mzc2MjA1NTAyMTAwNTM3MzU2.DN7AMA.QtazoBVFw_iGVqEJLNVKCFCkEKA')