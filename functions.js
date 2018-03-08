module.exports = (client) => {

  client.isInt = function(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10))
  }

  client.getRanWord = function() {
    var fin = ""
    for (i = 0; i < client.amount[msg.guild.id]; i++) {
      fin += client.words[Math.floor(Math.random() * thing.length)] + " "
    }
    return fin
  }

  client.yn = function() {
    let yn = ['yes', 'no']
    return yn[Math.floor(Math.random() * 2)]
  }

  client.s = function(amount) {
    if (amount != 1) return 's'
    else return ''
  }

  client.sort = function(collection) {
    var arr = []
    for (var i in collection) {
      arr.push({'id':i, 'amount':collection[i].amount})
    }
    arr.sort(function(a, b){return b.amount - a.amount})
    return arr
  }

  client.xor = function(data, key) {
    var output = ''
    for (var i = 0; i < data.length; i++) {
      let c = data.charCodeAt(i)
      let k = key.charCodeAt(i%key.length)
      output += String.fromCharCode(c^k)
    }
    return output
  }

}
