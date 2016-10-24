const botkit = require('botkit')

const controller = botkit.slackbot({
  debug: false
}).configureSlackApp(
  {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scopes: ['bot']
  }
)

controller.setupWebserver(process.env.PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  controller.createWebhookEndpoints(controller.webserver)

  controller.createOauthEndpoints(controller.webserver, (err, req, res) => {
    if (err) {
      return res.status(500).send('ERROR: ' + err)
    }

    res.send('Success!')
  })
})

controller.on('create_bot', (bot, config) => {
  console.log('bot created!')
  bot.startRTM(function (err) {
    if (err) return console.log(err)
    console.log('bot connected!')
  })
})

controller.hears('hello', 'direct_message', function (bot, message) {
  bot.reply(message, 'Hello!')
})

controller.on('slash_command', function (bot, message) {
  bot.replyPublic(message, '<@' + message.user + '> is cool!')
  bot.replyPrivate(message, '*nudge nudge wink wink*')
})
