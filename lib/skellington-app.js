'use strict'

require('skellington')({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  port: process.env.PORT,
  plugins: [{init: init}]
})

function init (controller) {
  controller.on('slash_command', (bot, message) => {
    bot.replyPrivate(message, 'WUBALUBDUBDUB')
  })
}
