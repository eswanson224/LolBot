const Discord = require('discord.js')
const client = new Discord.Client

const req = require('request')
const fs = require('fs')

const amount = JSON.parse(fs.readFileSync("./amount.json", "utf8"))
const requests = JSON.parse(fs.readFileSync("./requests.json", "utf8"))
const payday = JSON.parse(fs.readFileSync("./payday.json", "utf8"))

var words

fs.readFile('words.txt', 'utf8', function(err, data) {
  if (err) throw err
  words = data
})

const ownerID = '193215265998110720'
const kryID = '282704602191626241'

const payCooldown = 300000

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

  if (args[0].toLowerCase() == '.help') {
    msg.channel.send('```.repeat (only for the moist and the long)\n.words\n.payday\n.balance (or .bal)```')
  }

  if (args[0].toLowerCase() == '.repeat' && (msg.author.id == ownerID || msg.author.id == kryID)) {
    args.splice(0, 1)
    let join = args.join(' ')
    msg.channel.send(join)
  }

  if (args[0].toLowerCase() == '.words') {
    if (isInt(args[1])) {
      amount[msg.guild.id] = args[1]

      msg.channel.send("Word amount succesfully set to " + args[1])

      fs.writeFile("./amount.json", JSON.stringify(amount), (err) => {
        if (err) console.error(err)
      })
    }
  }

  if (args[0] == '<@!376205502100537356>' || args[0] == '<@376205502100537356>') {
    if (args[1].toLowerCase() == 'yn') {
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

  if (args[0].toLowerCase() == '.payday'){
    if (!payday[msg.author.id]) {
      payday[msg.author.id] = {
        amount: 100,
        cooldown: Date.now()
      }
      msg.channel.send(`<@${msg.author.id}> 100 credits have been added to your balance`)
    } else if (payday[msg.author.id].cooldown + payCooldown < Date.now()) {
      payday[msg.author.id].amount += 100
      payday[msg.author.id].cooldown = Date.now()
      msg.channel.send(`<@${msg.author.id}> 100 credits have been added to your balance`)
    } else {
      let waitTimeMil = payday[msg.author.id].cooldown + payCooldown - Date.now()
      let waitTimeSec = Math.round(waitTimeMil / 1000)
      let waitTimeMin = Math.floor(waitTimeSec / 60)
      let waitTimeSecLeft = waitTimeSec - waitTimeMin * 60
      if (waitTimeMin == 1) {
        msg.channel.send(`<@${msg.author.id}> please wait ${waitTimeMin} minute and ${waitTimeSecLeft} seconds before collecting your next payday`)
      } else if (waitTimeMin > 0) {
        msg.channel.send(`<@${msg.author.id}> please wait ${waitTimeMin} minutes and ${waitTimeSecLeft} seconds before collecting your next payday`)
      } else if (waitTimeMin == 0 && waitTimeSec == 1) {
        msg.channel.send(`<@${msg.author.id}> please wait ${waitTimeSecLeft} second before collecting your next payday`)
      } else if (waitTimeMin == 0) {
        msg.channel.send(`<@${msg.author.id}> please wait ${waitTimeSecLeft} seconds before collecting your next payday`)
      }

    }

    fs.writeFile("./payday.json", JSON.stringify(payday), (err) => {
      if (err) console.error(err)
    })
  }

  if (args[0].toLowerCase() == '.balance' || args[0].toLowerCase() == '.bal') {
    msg.channel.send(`<@${msg.author.id}> you have ${payday[msg.author.id].amount} credits`)
  }

})


client.login('Mzc2MjA1NTAyMTAwNTM3MzU2.DN7AMA.QtazoBVFw_iGVqEJLNVKCFCkEKA')
