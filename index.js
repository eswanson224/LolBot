const Discord = require('discord.js')
const client = new Discord.Client

const req = require('request')
const fs = require('fs')

const amount = JSON.parse(fs.readFileSync("./amount.json", "utf8"))
const requests = JSON.parse(fs.readFileSync("./requests.json", "utf8"))

var words

fs.readFile('words.txt', 'utf8', function(err, data) {
  if (err) throw err
  words = data
})

const ownerID = '193215265998110720'
const kryID = '282704602191626241'

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
    amount[msg.guild.id] = {
      amount: 3
    }

    fs.writeFile("./amount.json", JSON.stringify(amount), (err) => {
      if (err) console.error(err)
    })
  }

  const args = msg.content.split(/ +/g)
  const thing = words.split(/\r?\n/)

  function getRanWord() {
    var fin = ""
    for (i = 0; i < amount[msg.guild.id].amount; i++) {
      fin += thing[Math.floor(Math.random() * thing.length)] + " "
    }
    return fin
  }

  function yn() {
    let yn = ['yes', 'no']
    return yn[Math.floor(Math.random() * 2)]
  }

  if (args[0].toLowerCase() == '.repeat' && (msg.author.id == ownerID || msg.author.id == kryID)) {
    args.splice(0, 1)
    let join = args.join(' ')
    msg.channel.send(join)
  }

  if (args[0].toLowerCase() == '.words') {
    if (isInt(args[1])) {
      amount[msg.guild.id].amount = args[1]

      msg.channel.send("Word amount succesfully set to " + args[1])

      fs.writeFile("./amount.json", JSON.stringify(amount), (err) => {
        if (err) console.error(err)
      })
    }
  }

  if (args[0] == '<@!376205502100537356>' || args[0] == '<@376205502100537356>') {
    if (args[1].toLowerCase() == 'yn') {
      msg.channel.send(yn())
    } else if ((Math.floor(Math.random() * 99) + 1) <= 100) {
      msg.channel.send(getRanWord())
    }
  }

  if (args[0] == '!payday' && msg.author.id == '280785364501921796'){
    msg.channel.send('<@280785364501921796> it is thyme to stop\'th')
  }

  if (args[0].toLowerCase() == 'oof'){
    if ((Math.floor(Math.random() * 99) + 1) <= 33) {
      msg.channel.send(oof)
    }
  }

  if (msg.attachments.array().length != 0) {
    msg.channel.send(yn())
  }
})

client.login('Mzc2MjA1NTAyMTAwNTM3MzU2.DN7AMA.QtazoBVFw_iGVqEJLNVKCFCkEKA')
