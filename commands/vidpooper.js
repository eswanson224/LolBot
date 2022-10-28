const ffmpeg = require('fluent-ffmpeg');

exports.run = (client, message, args) => {
  var command = ffmpeg();
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
}

exports.help = {
  name: "vidpooper",
  description: "desc",
  usage: "use"
}
