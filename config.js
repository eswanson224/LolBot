const config = {
  "ownerID": "193215265998110720",

  "admins": ["282704602191626241", "300082911510790144"],

  "token": "",

  "prefix": ".",

  permLevels: {
    "User": {
      check: (message) => true
    },
    "Administrator": {
      check: (message) => message.member.hasPermission("ADMINISTRATOR") || config.admins.includes(message.author.id) || message.author.id == config.ownerID
    },
    "Bot Admin": {
      check: (message) => config.admins.includes(message.author.id) || message.author.id == config.ownerID
    },
    "Bot Owner": {
      check: (message) => message.author.id == config.ownerID
    }
  }
}

module.exports = config
