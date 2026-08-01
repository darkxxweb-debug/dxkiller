const fs = require('fs')

global.owner = "https://whatsapp.com/channel/0029VagJlnG6xCSU2tS1Vz19"
global.footer = "pfft" //footer section
global.status = true //"self/public" section of the bot

global.cicitzyBug = "https://whatsapp.com/channel/0029VagJlnG6xCSU2tS1Vz19"

global.lol = "";
global.mess = {
    owner: "You are not owner 😠"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
